const implementation = dependencies => input =>
  fetchFromGuesthub(dependencies)(input)
    .then(mapToResponse)
    .then(output);

const fetchFromGuesthub = dependencies => input =>
  dependencies
    .fetch(
      `${dependencies.guesthub.app.api.url}/requests/process${
      input.date.from && input.date.to
        ? encodeURIComponent(
          `?fromDate=${input.date.from}&toDate=${input.date.to}&state=all`
        )
        : `?fromDate=${encodeURIComponent(dependencies.dates.startOfYear)}&toDate=${encodeURIComponent(dependencies.dates.today)}` +
        "&state=all"
      }`,
      {
        method: "GET",
        headers: {
          "guesthub-context": JSON.stringify({
            properties: [input.property.id],
            user: 167
          })
        }
      }
    )
    .then(response => response.json());

const mapToResponse = requests =>
  requests.map(request => ({
    issue: request.process.Subcategory ? request.process.Subcategory.issue : null,
    creationDate: request.creation ? request.creation.date : null,
    property: request.process.Subcategory ? request.process.Subcategory.propertyId : null,
    subcategoryName:
      request.process.Subcategory && request.process.Subcategory.names &&
        request.process.Subcategory.names.length > 0
        ? request.process.Subcategory.names[0].name
        : null,
    categoryName:
      request.process.Subcategory && request.process.Subcategory.category &&
        request.process.Subcategory.category.names &&
        request.process.Subcategory.category.names.length > 0
        ? request.process.Subcategory.category.names[0].name
        : null,
    departmentName:
      request.process.Subcategory && request.process.Subcategory.category &&
        request.process.Subcategory.category.department.names &&
        request.process.Subcategory.category.department.names.length > 0
        ? request.process.Subcategory.category.department.names[0].name
        : null,
    execution: request.process.time.execution,
    followUp: request.process.time.followUp,
    guestName: request.location.guestName,
    roomNumber: request.location.roomNumber,
    publicArea: request.location.publicArea,
    type: request.type,
    ticketId: request.ticket.id,
    asigneeFirstName: request.assignee.firstName,
    asigneeLastName: request.assignee.lastName,
    priorityName: request.priority.name,
    statusName: request.status.name,
    codeName: request.status.codename,
    nextFinisgedExecutionTime: request.nextFinishedExecutionTime,
    completionExec: request.exec,
    completionDueTime: request.dueTime
  }));

const output = input => input;

module.exports = implementation;
