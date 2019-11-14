module.exports = dependencies =>
    require('./interface-http-hapi')({
        repository: require('./repository-reference')(
            Object.assign({}, dependencies, { data: require('../data') })
        )
    })