const jwt = require("jsonwebtoken")

module.exports.generatedToken = async (data) => {
  try {
    // generate access token
    const access_token = jwt.sign(
      { data },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    )

    return access_token
  } catch (err) {
    console.log(err)
  }
}
