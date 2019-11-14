

const data = [{
    property: { id: "1" },
    users: [{
        login: "",
        password: "",
        register_date: Date.now(),
        profile: {

        },
        status: 'active'
    }]
}]

module.exports = () => Promise.resolve(data)