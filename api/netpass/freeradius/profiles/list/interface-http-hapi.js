const handler = dependencies => (request, h) =>
    dependencies
        .repository(
            Object.assign(
                {},
                request.params.id ? { property: { id: request.params.id } } : {}
            )
        );

const route = dependencies => ({
    method: "GET",
    path: "/properties/{id}/wifi/freeradius/profiles",
    handler: handler(dependencies)
});

module.exports = dependencies => route(dependencies);
