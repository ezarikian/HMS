module.exports = dependencies =>
  require("./interface-http-hapi")({
    repository: require("./repository-reference")(
      Object.assign({}, dependencies, {
        fetch: require("node-fetch"),
        dates: {
          startOfYear: require("date-fns")
            .startOfYear(new Date())
            .toUTCString(),

          today: require("date-fns")
            .endOfDay(new Date())
            .toUTCString()
        }
      })
    )
  });
