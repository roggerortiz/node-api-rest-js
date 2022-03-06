import User from "../models/User";

const validateUser = async (req, res, next) => {
   try {

      const userId = req.params.id;
      const { username, email } = req.body;

      const user = await User.findOne().or([{ username }, { email }]);
      const userIdBD = user._id.toString()

      if (user && userIdBD !== userId && user.username === username)
         return res.status(400).json({ message: "Username alredy exists" });

      if (user && userIdBD !== userId && user.email === email)
         return res.status(400).json({ message: "Email alredy exists" });

      return next();

   } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
   }
}

export default validateUser;