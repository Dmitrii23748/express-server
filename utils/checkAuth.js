import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  // console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, 'asad2313h13bj1h3b1j3b1jh3b13');

      req.userId = decoded.id;

      next();
    } catch (error) {
      return res.json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.json({
      message: "Нет доступа!!!!!!!!",
    });
  }
};
