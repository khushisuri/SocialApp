import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    let actualToken;
    if (!token){
      return res.status(401).json({ message: "access denied" });
    }
    if (token.startsWith("Bearer ")) {
      const splitArray = token.split(" ");
      actualToken = splitArray[1];
    }
    const verified = jwt.verify(actualToken, process.env.JWT_SECRET)
    req.user = verified;
    
    next();
  } catch (err){
    res.status(404).json({ message: err.message });
  }
}
