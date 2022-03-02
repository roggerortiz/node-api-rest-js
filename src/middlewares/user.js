import User from "../models/User";

const validateUser = async (req, res, next) => {
   try {

      const { username, email } = req.body;

      const user = await User.findOne().or([{ username }, { email }]);

      if (user && user.username === username)
         return res.status(400).json({ message: "Username alredy exists" });

      if (user && user.email === email)
         return res.status(400).json({ message: "Email alredy exists" });

      return next();

   } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
   }
}

export default validateUser;