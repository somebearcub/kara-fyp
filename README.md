# Kara App Development

Kara is an app designed for perinatal depression patients and doctors alike. It includes a user-based account system with a ‘chatbot’ presentation method of displaying questions and deliverance of e-Consultations. This method of displaying questions has also been made to be more engaging yet quick with many variations of displaying questions available. 

Additionally, a breathing exercise feature has been implemented to provide users with a platform to relieve stress and anxiety that follows a 4-7-8 (inhale-hold-exhale) second method for a total of 5 counts.
This app serves as a basis and prototype for further creation and work to be done on the application in the future.

(Kara is a Final Year Project done in partial fulfilment of the Requirements for the Degree of Bachelor of Engineering (Computer Science))


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This project was tested and developed in Android only. 
Feel free to approach me on more details on how to setup the project if you are unable to.

### Prerequisites

**Hardware Used for Developing this Application:** 
* Windows 10 Operating System with 16GB RAM and i7-6560U CPU @ 2.20GHZ was used to develop and test the application.
* Physical testing of the application was done on a Samsung Galaxy Note9 with Hardware Version MP 0.700

**Software Used:**
[JetBrains Webstorm IDE Version 2018.1.5](https://www.jetbrains.com/webstorm/download/previous.html) - Scroll down to Version 2018.1 > More Updates > 2018.1.5 
[JetBrains DataGrip IDE Version 2018.3](https://confluence.jetbrains.com/display/DBE/DataGrip+previous+releases) - Scroll down to Version 2018.3 > Windows
[Android Studio Version 3.1.4](https://developer.android.com/studio/archive) - Scroll down to Android Studio 3.1 Beta 4 (23 Feb 2018) > Windows 64-bit 
[React Native Version 0.57.1](https://facebook.github.io/react-native/docs/getting-started) - Follow instructions on page
[Feathersjs Version 2018.1.5](https://docs.feathersjs.com/guides/basics/starting.html) - Follow instructions on page to get Feathersjs running
[Expo Version 31.0.0](https://github.com/expo/xde/releases) - Already installed into application
[NodeJS v10.9.0](https://nodejs.org/en/download/releases/) - Scroll down to Version 10.9.0 > Downloads 
[npm Version 6.2.0](https://nodejs.org/en/download/releases/) - NPM is installed with NodeJS
[Yarn Version 1.7.0](https://yarnpkg.com/en/docs/install#windows-stable) - Please check for other versions.
[Postman Version 7.0.9](https://yarnpkg.com/en/docs/install#windows-stable) - Please check for other versions.
[PostgreSQL](https://www.postgresql.org/download/) 
[ngrok](https://ngrok.com/download) - Sign up for an account.


### Installing

A step by step series of examples that tell you how to get a development env running. Make sure all the Software prerequsitites are downloaded and the Hardware prerequsitites are at least met. 


**Setting up Webstorm to run/test project**
```
- Open project
- Edit Configurations > Add > NPM > Name: Start Server > package.json: ~\Documents\Kara\KaraServer\package.json > Command: run > Scripts: dev 
- Edit Configurations > Add > NPM > Name: Start ngrok > package.json: ~\Documents\Kara\KaraServer\package.json > Command: run > Scripts: ngrok
- Edit Configurations > Add > NPM > Name: Start App > package.json: ~\Documents\Kara\KaraServer\package.json > Command: run > Scripts: android
- Edit Configurations > Add > Compound > Name: Start Server > Add > Start Server, Start ngrok
- Start Server before starting App
```

**Setting up Android Emulator**
Please find full documentation on how to create the Emulator in Report (With guided pictures)
```
- Open Android Studio
- Android Virtual Device Manager (Small icon on top right with AVD icon) 
- Device Defintion: Create New Virtual Device > New Hardware Profile > Category: Phone > New Device, 5.0", 1080x1920, xxhdpi > Next
- System Image: Recommended > Download Oreo API 27, ABI x86, Android 8.1. > Next
(Do download if it cannot be seen)
- AVD Name: [Name this anything you wish - E.g. Kara Test Emulator]
```

**Setting up Phone for Emulation**
```
- Go to Play Store (Android) or App Store (iOS)
- Search for Expo
- Download and go to Projects > Scan QR Code 
- QR code will be available for scanning at http://localhost:19002/
```

**Setting up Postman for posting to the Database**
```
** New e-Consultation **
- POST > http://localhost:3030/consultation> Headers > Key: Content-Type | Value: multipart/form-data, 
- POST > http://localhost:3030/consultation> Body > Form-Data > 
* Key: picture (hover over corner of box, drop down list and select File. | Value: Select Files
* Key: cTitle | Value: Getting to Know You
* Key: cDescription | Value: E-Consultation 1
* Key: pushNotification | Value: true/false

(You can also post pictures to the server via this request and using dummy data before removing it.)

** New Question **
- POST > http://localhost:3030/question > Body
- { 
	"qName": "Question 1.", 
	"qDescription": "This is a free text question.",
	"questionComponent": "MCQQuestion",
	"question_details": {{"options":[{"value":"1","name":"1"},{"value":"2","name":"2"},{"value":"3","name":"3"},{"value":"4","name":"4"}]}},
	"consultationId": 1, 
	"questionCategory": "Close Relationship Scale-Short Form (ECR-S)"
	}
- Depending on the questionComponent type, the question_details must be adjusted accordingly:
* MCQQuestion = {{"options":[{"value":"1","name":"1"},{"value":"2","name":"2"},{"value":"3","name":"3"},{"value":"4","name":"4"}]}} (Depends on the number of options)
* FreeTextQuestion = {}
* NumericQuestion = {"options":{"min": 1, "max": 30, "step":1}}
* DateQuestion = {} 
* EmojiQuestion = {"options": [{"value": "Sad","name": "😢"},{"value": "Neutral","name": "😐"},{"value": "Happy","name": "😀"}]} 
(Depends on the number of emojis, please use default keyboard provided ones alternatively you may find emojis online.)
```

**Setting up DataGrip**
```
- + > DataSource > PostgreSQL > Name: karaserver@localhost > Host: localhost, Port: 5432 > Database: karaserver > User: postgres > Password: P@ssword123 URL: jdbc:postgresql://localhost:5432/karaserver
(Do test for connection first, might need to recheck password.)
- Database should be able to be seen. 
```

**To Start Testing/Developing**
Usually I open up WebStorm, ngrok, Android emulator (Or physical device with Expo) and DataGrip together so it's easier to check everything. 
```
- WebStorm: Compound Run Server (First) + Run App (Second)
- Open Browser: http://localhost:19002/
- Open Browser: https://dashboard.ngrok.com/status - Check for the address URL and copy paste that to replace a portion in KaraApp > store.js: Line 8: export const APP_URL = "http://7fd2ea51.ap.ngrok.io";
```

**Setting up ngrok for tunneling**
```
- Create an account
- Make sure ngrok is installed 
- Proceed to https://dashboard.ngrok.com/status and check that server is up and running.
```


## Deployment

At this stage, no deployment has been fully used, please refer to ngrok for more tunnel hosting instead.


## Authors

* **Cherilynn** - *Initial work* - [somebearcub](https://github.com/somebearcub)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## Acknowledgments

* NTU School of Computer Science & Engineering
* Lee Kong Chian School of Medicine Population Health Science Team
* Lionell Yip - For technical guidance [frusdelion](https://github.com/frusdelion)


