const linkType = (env) => {
  switch (env) {
    case "development":
      return "http://localhost:3001";
    case "production":
      return "https://api-kapusta.herokuapp.com";
    default:
      return "http://localhost:3002";
  }
};

module.exports = linkType;
