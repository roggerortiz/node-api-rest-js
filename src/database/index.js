import mongoose from 'mongoose';

export default async () => {
   try {

      await mongoose.connect(process.env.MONGODB_URI);
      console.log('>> DB is connected!');

   } catch (error) {
      console.log('>> Failed connection to DB => ', error);
   }
}