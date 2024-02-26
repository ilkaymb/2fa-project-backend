const jwt = require("jsonwebtoken");
const { keys } = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  var exp = "";
  if (!token) {
    return res.status(403).send("Token sağlanmalı.");
  }

  let decoded;
  try {
    decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new Error("Token decode edilemedi");
    }
  } catch (err) {
    return res.status(401).send("Token geçersiz.");
  }

  const secretKey =
    decoded.payload.type === "STEP1-TOKEN" ? keys.step1_key : keys.step2_key;

  jwt.verify(token, secretKey, (err, verifiedDecoded) => {
    if (err) {
      return res
        .status(400)
        .send(
          err.name === "TokenExpiredError"
            ? "Token süresi doldu."
            : "Token doğrulanamadı."
        );
    }

    req.user = verifiedDecoded;

    next();
  });
};

module.exports = verifyToken;
