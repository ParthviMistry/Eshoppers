const { getCookie } = require("cookies-next");
var jwt = require("jsonwebtoken");

export default function protectedPage(ctx) {
  const cookie = getCookie("cookie", {
    req: ctx.req,
    res: ctx.res,
  });
  let user = false;
  try {
    user = jwt.verify(cookie, process.env.JWT_SECRET);
    return user?.user;
  } catch (err) {
    return false;
  }
}
