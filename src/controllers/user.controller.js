import User from '../models/User';

const messageNotFound = { message: 'User was not found' };
const messageErrror = { message: 'Internal error' };

export const getUsers = async (req, res) => {
   // #swagger.tags = ['User']
   try {

      const users = await User.find();
      return res.status(200).json(users);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const getUserById = async (req, res) => {
   // #swagger.tags = ['User']
   try {

      const foundUser = await User.findById(req.params.id);
      if (!foundUser)
         return res.status(404).json(messageNotFound);

      return res.status(200).json(foundUser);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const createUser = async (req, res) => {
   // #swagger.tags = ['User']
   try {

      const { name, username, email, password } = req.body;

      const newUser = new User({ name, username, email, password });
      const savedUser = await newUser.save();

      return res.status(201).json(savedUser);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const updateUser = async (req, res) => {
   // #swagger.tags = ['User']
   try {

      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedUser)
         return res.status(404).json(messageNotFound);

      return res.status(200).json(updatedUser);

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}

export const deleteUser = async (req, res) => {
   // #swagger.tags = ['User']
   try {

      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser)
         return res.status(404).json(messageNotFound);

      return res.status(204).json();

   } catch (error) {

      console.log({ url: req.url, error });
      return res.status(500).json(messageErrror);

   }
}