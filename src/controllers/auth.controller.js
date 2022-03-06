import User from '../models/User';
import { messageError, internalError, notFound, success } from '../utils/responses';

export const signUp = async (req, res) => {
   try {

      const { name, username, email, password } = req.body;
      const encryptedPassword = await User.encryptPassword(password);

      const newUser = new User({ name, username, email, password: encryptedPassword });
      const savedUser = await newUser.save();

      const result = jwtSign(savedUser);
      return res.status(200).json(success(result));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const signIn = async (req, res) => {
   try {

      const { email, password } = req.body;
      const foundUser = await User.findOne({ email });

      if (!foundUser)
         return res.status(404).json(notFound('User'));

      const isMatchedPassword = await User.comparePassword(password, foundUser.password);

      if (!isMatchedPassword)
         return res.status(401).json(messageError("Invalid password"));

      const result = jwtSign(foundUser);
      return res.status(200).json(success(result));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const refreshToken = async (req, res) => {
   try {

      if (req.user.refreshToken !== req.body.refreshToken)
         return res.status(401).json(messageError("Invalid refresh token"));

      const foundUser = await User.findById(req.user.subs, { password: 0 });

      if (!foundUser)
         return res.status(404).json(notFound('User'));

      const result = jwtSign(foundUser);
      return res.status(200).json(success(result));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}