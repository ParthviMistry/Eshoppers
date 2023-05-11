import NextCors from "nextjs-cors";
import { setCookie } from "cookies-next";
import { authorizeUser } from "./_utils/auth";

var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case "GET": {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
          success: true,
          user: decoded?.user,
        });
      } catch (err) {
        return res.status(401).json({
          success: false,
          error: err?.message,
        });
      }
    }
    case "POST": {
      const body =
        typeof req.body === "object" ? req.body : JSON.parse(req.body);
      let user = await authorizeUser(body.username, body.password);

      if (user?.id) {
        const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "10d" });
        setCookie("cookie", token, {
          req,
          res,
          maxAge: 60 * 60 * 240,
        });
        setCookie("userId", user.id, { req, res });

        return res.status(200).json({
          success: true,
          token,
          user,
        });
      } else {
        return res.status(401).json({
          success: false,
          error: user?.error_message,
        });
      }
    }
  }
}
