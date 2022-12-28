const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "d917f98b-ab20-44dd-9916-7f35b0765b6f";

module.exports = {
  generateTokenForUser: function (user) {
    return jwt.sign(
      {
        profId: user.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  },
};
