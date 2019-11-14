module.exports = dependencies =>
  require("./interface-http-hapi")({
    repository: require("./repository-reference")(
      Object.assign({}, dependencies, {
        fetch: require("node-fetch")
      })
    )
  });
