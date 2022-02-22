import jwt from 'jsonwebtoken';

const publicPaths = [
   '/api/auth/signup',
   '/api/auth/signin'
]

export default async (req, res, next) => {
   if (publicPaths.indexOf(req.url) !== -1)
      return next();

   const { authorization } = req.headers;

   if (!authorization)
      return res.status(403).json({ message: "No token provided" });

   const [label, accessToken] = authorization.split(' ');
   
   if (label !== 'Bearer' || !accessToken)
      return res.status(401).json({ message: "Unauthorized" });

   try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      req.user = payload;
   } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
   }

   return next();
}
