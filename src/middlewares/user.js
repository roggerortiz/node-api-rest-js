import User from "../models/User";

export default async (req, res, next) => {
   const { username, email } = req.body;

   const user = await User.findOne().or([{ username }, { email }]);

   if(user?.username === username)
      return res.status(400).json({message: "Username alredy exists"});

   if(user?.email === email)
      return res.status(400).json({message: "Email alredy exists"});

   return next();
}