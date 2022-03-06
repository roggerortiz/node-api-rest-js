import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const uuid = () => uuidv4().replace(/-/g, '');

export const capitalize = (str) => {
   return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export const jwtSign = (user) => {
   const refreshToken = uuid();
   const { _id, name, username, email } = user;

   const payload = { subs: _id, name, username, email, refreshToken };
   const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });

   return { ...payload, accessToken };
}