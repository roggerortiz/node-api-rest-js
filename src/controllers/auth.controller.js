import User from '../models/User';
import { jwtSign } from '../utils';

const messageNotFound = { message: 'User was not found' };
const messageErrror = { message: 'Internal error' };

export const signUp = async (req, res) => {
   try {

      const { name, username, email, password } = req.body;
      const encryptedPassword = await User.encryptPassword(password);

      const newUser = new User({ name, username, email, password: encryptedPassword });
      const savedUser = await newUser.save();

      const result = jwtSign(savedUser);
      return res.status(200).json(result);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const signIn = async (req, res) => {
   try {

      const { email, password } = req.body;
      const foundUser = await User.findOne({ email });

      if (!foundUser)
         return res.status(404).json(messageNotFound);

      const isMatchedPassword = await User.comparePassword(password, foundUser.password);

      if (!isMatchedPassword)
         return res.status(401).json({ message: "Invalid password" });

      const result = jwtSign(foundUser);
      return res.status(200).json(result);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const refreshToken = async (req, res) => {
   try {

      if (req.user.refreshToken !== req.body.refreshToken)
         return res.status(401).json({ message: "Invalid refresh token" });

      const foundUser = await User.findById(req.user.subs, { password: 0 });

      if (!foundUser)
         return res.status(404).json(messageNotFound);

      const result = jwtSign(foundUser);
      return res.status(200).json(result);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}