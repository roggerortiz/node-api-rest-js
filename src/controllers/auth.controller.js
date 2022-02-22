import User from '../models/User';
import { jwtSign } from '../utils';

export const signUp = async (req, res) => {
   const { name, username, email, password } = req.body;
   const encryptedPassword = await User.encryptPassword(password);

   const newUser = new User({ name, username, email, password: encryptedPassword });
   const savedUser = await newUser.save();

   const result = jwtSign(savedUser);
   res.status(200).json(result);
}

export const signIn = async (req, res) => {
   const { email, password } = req.body;
   const foundUser = await User.findOne({ email });

   if (!foundUser)
      return res.status(400).json({ message: "User not found" });

   const isMatchedPassword = await User.comparePassword(password, foundUser.password);

   if (!isMatchedPassword)
      return res.status(401).json({ message: "Invalid password" });

   const result = jwtSign(foundUser);
   res.status(200).json(result);
}

export const refreshToken = async (req, res) => {
   if (req.user.refreshToken !== req.body.refreshToken)
      return res.status(401).json({ message: "Invalid refresh token" });

   const foundUser = await User.findById(req.user.subs, { password: 0 });

   const result = jwtSign(foundUser);
   res.status(200).json(result);
}