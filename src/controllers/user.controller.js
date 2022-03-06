import User from '../models/User';
import { internalError, notFound, success } from '../utils/responses';

export const getUsers = async (req, res) => {
   try {

      const users = await User.find();
      return res.status(200).json(success(users));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const getUserById = async (req, res) => {
   try {

      const foundUser = await User.findById(req.params.id);
      if (!foundUser)
         return res.status(404).json(notFound('User'));

      return res.status(200).json(success(foundUser));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const createUser = async (req, res) => {
   try {

      const { name, username, email, password } = req.body;

      const newUser = new User({ name, username, email, password });
      const savedUser = await newUser.save();

      return res.status(201).json(success(savedUser));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const updateUser = async (req, res) => {
   try {

      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedUser)
         return res.status(404).json(notFound('User'));

      return res.status(200).json(success(updatedUser));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}

export const deleteUser = async (req, res) => {
   try {

      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser)
         return res.status(404).json(notFound('User'));

      return res.status(200).json(success(true));

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(internalError());

   }
}