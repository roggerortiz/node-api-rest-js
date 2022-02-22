import User from '../models/User';

export const getUsers = async (req, res) => {
   const users = await User.find();
   res.status(200).json(users);
}

export const getUserById = async (req, res) => {
   const user = await User.findById(req.params.id);
   res.status(200).json(user);
}

export const createUser = async (req, res) => {
   const { name, username, email, password } = req.body;
   const newUser = new User({ name, username, email, password });
   const savedUser = await newUser.save();
   return res.status(201).json(savedUser);
}

export const updateUser = async (req, res) => {
   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json(updatedUser);
}

export const deleteUser = async (req, res) => {
   await User.findByIdAndDelete(req.params.id);
   res.status(204).json();
}