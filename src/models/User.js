import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
   name: String,
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   password: String
}, {
   timestamps: true,
   versionKey: false
});

userSchema.statics.encryptPassword = async (password) =>{
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, hashedPassword) =>{
   return await bcrypt.compare(password, hashedPassword);
}

export default model('User', userSchema);