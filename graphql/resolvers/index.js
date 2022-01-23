const artistQueries = require("./artists/queries");
const artistMutations = require("./artists/mutations");
const authenticationsQueries = require("./authentications/queries");
const authenticationsMutations = require("./authentications/mutations");

module.exports = {
  ...artistQueries,
  ...artistMutations,
  ...authenticationsQueries,
  ...authenticationsMutations
};
