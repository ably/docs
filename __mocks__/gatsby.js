const gatsby = jest.requireActual('gatsby');
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
  navigate: jest.fn(),
};
