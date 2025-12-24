import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "yaaaaajjjjj");
    req.user = decoded; // now req.user.id and req.user.email are available
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


