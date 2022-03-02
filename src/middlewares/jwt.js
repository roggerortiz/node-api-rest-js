import jwt from 'jsonwebtoken';

const excludePaths = [
   '/docs',
   '/api/auth/signup',
   '/api/auth/signin'
]

const validateJWT = async (req, res, next) => {
   try {

      if (req.url === '/' || excludePaths.find(path => req.url.includes(path)))
         return next();

      const { authorization } = req.headers;

      if (!authorization)
         return res.status(403).json({ message: "No token provided" });

      const [label, accessToken] = authorization.split(' ');

      if (label !== 'Bearer' || !accessToken)
         return res.status(401).json({ message: "Unauthorized" });

      const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.user = payload;

      return next();

   } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
   }
}

export default validateJWT;