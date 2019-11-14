const handler = dependencies => (request, h) =>
    dependencies
        .repository(
            Object.assign(
                {},
                request.params.id ? { property: { id: request.params.id } } : {},
                request.query.fromDate && request.query.toDate ? { date: { from: request.query.fromDate, to: request.query.toDate } } : { date: { from: undefined, to: undefined } }
            )
        );

const route = dependencies => ({
    method: "GET",
    path: "/properties/{id}/requests",
    handler: handler(dependencies)
});

module.exports = dependencies => route(dependencies);
