import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import cors from '../middlewares/cors';
import jwt from '../middlewares/jwt';
import swaggerOpt from '../../swagger.json';
import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors);
app.use(jwt);

//routes
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerOpt));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

export default () => {
   app.listen({ port: process.env.PORT }, () => {
      console.log(`>> Server listen on http://localhost:${process.env.PORT}/api/docs`);
   });
}