import User from "../models/User";

const getUser = async ({ id, username, email }) => {
   if (!id)
      return await User.findOne().or([
         { username }, { email }
      ])

   return await User.findOne().and([
         { _id: { $nin: [id] } },
         { $or: [{ username }, { email }] }
      ])
}

const validateUser = async (req, res, next) => {
   try {

      const { id } = req.params;
      const { username, email } = req.body;
      const user = await getUser({ id, username, email })

      if (user && user.username === username)
         return res.status(400).json({ message: "Username alredy exists" });

      if (user && user.email === email)
         return res.status(400).json({ message: "Email alredy exists" });

      return next();

   } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Bad Request" });
   }
}

export default validateUser;