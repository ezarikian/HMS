const implementation = dependencies => input =>
    fetchFromGuesthub(dependencies)(input).then(output)

const fetchFromGuesthub = dependencies =>
    input =>
        dependencies.fetch(`${dependencies.guesthub.app.api.url}/integrations/opera/history${input.date.from && input.date.to
            ? `?fromDate=${input.date.from}&toDate=${input.date.to}`
            : ""}`, {
            method: "GET",
            headers: {
                "guesthub-context": JSON.stringify({
                    properties: [input.property.id]
                })
            }
        }).then(response => response.json())

const output = input => input

module.exports = implementation;
