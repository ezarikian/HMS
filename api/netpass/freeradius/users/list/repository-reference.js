const implementation = dependencies => input =>
    filterProperty({ data: dependencies.data, property: input.property })
        //.then(profiles => search({ profiles,{ name: input.name }))
        .then(output)

const filterProperty = input =>
    input.data().then(data => data.find(data => data.property.id === input.property.id))


const output = input => input

module.exports = implementation;
