import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import {AsyncStorage} from 'react-native';
import EventEmitter from 'events';

export const APP_URL = "http://7fd2ea51.ap.ngrok.io";
export default class Store {
    isConnected = false;
    user = null;
    isAuthenticated = false;

    /**
     *
     * @type {Application}
     */
    app = null;

    authEvent = new EventEmitter();

    constructor() {
        this.app = feathers()
            .configure(socketio(io(APP_URL, {
                pingTimeout: 1000,
                pingInterval: 5000,
                timeout: 5000,
                reconnection: true,
                reconnectionDelay: 50,
                reconnectionDelayMax: 1000,
                autoConnect: true,
            })))
            .configure(authentication({
                storage: AsyncStorage,
            }))
    }

    connect() {
        this.isConnected = false;
        this.isAuthenticated = false;
        console.log('not connected');
        this.app.io.on('connect', () => {
            console.log('connecting');
            this.isConnected = true;

            const that = this;
            return this.authenticate()
                .then(async payload => {
                    console.log('socketIo authenticated after reconnection');
                    await that.registerForPushNotificationsAsync();

                    that.user = payload;
                    that.isAuthenticated = true;
                    that.triggerChangeCallback();
                })
                .catch(e => {
                    console.log('socketIo errored authentication after reconnection')
                    that.isAuthenticated = false;

                    that.triggerFailedCallback();
                })
        })

        this.app.io.on('disconnect', () => {
            this.isConnected = false;
            console.log('disconnected');
        })
    }

    async logout() {
        this.isAuthenticated = false;
        this.user = null; // When you logout, the user property becomes null again, because not logged in.
        await this.app.logout();
    }

    authenticate(options) {
        const that = this; // You do the that=this, because this can mean different things inside functions. Especially => (arrow) functions.
        return this.app.authenticate(options)
            .then(async response => await this.app.passport.verifyJWT(response.accessToken)) // Checks the JWT (if its stored)
            .then(async payload => await this.app.service('users').get(payload.userId)) // Then it will get the user ah i see why doesn't show hahahahahaaha
            // lets say i want rename user, you right click and refactor -> rename or shift f6 i think yeah
            .then(payload => that.user = payload) // Stores the user object in the store **most important line of code**
            .catch(e => Promise.reject(e));
    }

    triggerChangeCallback() {
        this.authEvent.emit('changeAuthenticatedStack');
    }

    triggerFailedCallback() {
        this.authEvent.emit('changeUnauthenticatedStack');
    }

    setChangeCallback(callback) {
        this.authEvent.addListener('changeAuthenticatedStack', callback);
    }

    setFailedCallback(callback) {
        this.authEvent.addListener('changeUnauthenticatedStack', callback);
    }

    unmountStore() {
        this.authEvent.removeAllListeners('changeAuthenticatedStack');
        this.authEvent.removeAllListeners('changeUnauthenticatedStack');
    }

    registerForPushNotificationsAsync() {
//
    }

    async login(email, password) {
        try {
            // Basically this calls the authenticate method of _this_ class, which does the following:
            const authenticate = await this.authenticate({
                'strategy': 'local',
                'email': email,
                'password': password,
            });
            console.log('Authenticated successfully');
        } catch (e) {
            console.log('Authenticated failed');

            throw e;
        }
    }
}