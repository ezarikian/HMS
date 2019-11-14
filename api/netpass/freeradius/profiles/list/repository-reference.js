const implementation = dependencies => input =>
    filterProperty({ data: dependencies.data, property: input.property })
        //.then(profiles => search({ profiles,{ name: input.name }))
        .then(output)

const filterProperty = input =>
    input.data().then(profiles => profiles.reduce((profiles, data) => {
        data.property.id === input.property.id ?
            profiles = data.profiles :
            undefined
        return profiles
    }, []))


const output = input => input

module.exports = implementation;
