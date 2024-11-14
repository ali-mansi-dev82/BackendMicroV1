const messages = require("../../swap_mart/messages");
const { verifyToken } = require("../../swap_mart/auth/auth.utils");
const supabase = require("../../config/supbase.config");

const Authorization = async (req, res, next) => {
  try {
    const authorization =
      req?.cookies?.access_token || req?.headers?.authorization;
    if (
      !authorization ||
      authorization === undefined ||
      authorization.length < 1
    ) {
      return res.status(401).send({
        statusCode: 401,
        message: messages.Auth.Unauthorization,
      });
    }

    const splitedAuth = await authorization?.split(" ");
    const token = splitedAuth.length === 1 ? splitedAuth[0] : splitedAuth[1];

    if (!token || token === undefined || token.length < 1) {
      return res.status(401).send({
        statusCode: 401,
        message: "unauthorization",
      });
    }

    const data = verifyToken(token);
    if (typeof data === "object" && "id" in data) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", data?.id);

      if (!data) {
        return res.send({
          statusCode: 404,
          message: messages.User.NotFound,
        });
      }
      if (!user.accessToken.includes(token)) {
        return res.send({
          statusCode: 401,
          message: "your token not valid!",
        });
      }
      res.user = user;
      return next();
    }
    return res.status(401).send({
      statusCode: 400,
      message: messages.Auth.TokenNotValid,
    });
  } catch (error) {}
};
module.exports = Authorization;
