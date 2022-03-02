import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../swagger';
import cors from '../middlewares/cors';
import jwt from '../middlewares/jwt';
import authRouter from '../routes/auth.routes';
import homeRouter from '../routes/home.routes';
import userRouter from '../routes/user.routes';

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors);
app.use(jwt);

//routes
app.use('/', homeRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const startServer = () => {
   app.listen({ port: process.env.PORT }, () => {
      console.log(`>> Server listen on http://localhost:${process.env.PORT}`);
   });
}

export default startServer;