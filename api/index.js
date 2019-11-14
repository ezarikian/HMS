
const guesthub = {
  app: {
    api: {
      url: process.env.GUESTHUB_APP_API_URL || 'https://backend.guesthub.io'
    }
  }
}

const configuration = {
  http: {
    server: {
      port: process.env.WEBSITES_PORT || 8080
    }
  }
}

const routes = dependencies => [
  require("./analytics/requests")(dependencies),
  require("./analytics/rooms")(dependencies),
  require("./analytics/history")(dependencies),
  require("./analytics/reservations")(dependencies),
  require("./netpass/freeradius/profiles/list")(dependencies),
  require("./netpass/freeradius/users/list")(dependencies)
];

const addRoutes = dependencies => dependencies.routes(dependencies).forEach(route => dependencies.server.route(route));

const init = dependencies => {
  const server = require("@hapi/hapi").server(dependencies.configuration.http.server);
  addRoutes(Object.assign({}, dependencies, { server }))
  return server.start().then(() => server);
};

const configureErrorHandling = process => process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

!module.parent ? init({ configuration, guesthub, routes })
  .then(server => console.log("\n Triops HMS Api Server running on %s", server.info.uri))
  .then(() => configureErrorHandling(process)) :
  module.exports = {
    execute: () => init({ configuration, guesthub, routes })
      .then(server => console.log("\n Triops HMS Api Server running on %s", server.info.uri))
      .then(() => configureErrorHandling(process))
  };
