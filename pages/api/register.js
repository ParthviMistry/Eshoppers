import NextCors from "nextjs-cors";
import { setCookie } from "cookies-next";
import { authorizeUser, registerUser } from "./_utils/auth";
var jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case "POST": {
      const body =
        typeof req.body === "object" ? req.body : JSON.parse(req.body);
      const ip = req?.socket?.remoteAddress;
      const headerIp = req?.headers?.["x-forwarded-for"];

      const {
        username,
        password,
        email,
        firstName,
        lastName,
        business,
        location,
      } = body;

      const data = await registerUser(
        username,
        password,
        email,
        firstName,
        lastName,
        business,
        location,
        ip,
        headerIp
      );

      const newBody =
        typeof req.body === "object" ? req.body : JSON.parse(req.body);
      let user = await authorizeUser(newBody.username, newBody.password);

      if (user?.id) {
        const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "10d" });

        setCookie("cookie", token, {
          req,
          res,
          maxAge: 60 * 60 * 240,
        });

        return res.status(200).json({
          success: true,
          token,
          user,
        });
      } else if (data?.error_message) {
        return res.status(500).json({
          success: false,
          error: data?.error_message,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "There was a problem creating the account. Please try again",
        });
      }
    }
  }
}
