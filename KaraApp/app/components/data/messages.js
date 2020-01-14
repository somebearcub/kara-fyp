module.exports = [
    {
        _id: Math.round(Math.random() * 1000000),
        //TODO GET USER NAME
        text: "Hi" + "!" + "\n\n" +
        "I'm Kara, your virtual pregnancy assistant. " +
        "I help deliver e-consultations straight from the doctors to you. " +
        "\n\nWhenever you're ready, just hit the start button so we can begin!",
        user: {
            _id: 2,
            name: 'Kara',
            avatar: require("../img/KaraAvatar.png")
        },
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "You have started an e-consultation.",
        system: true,
    },
];