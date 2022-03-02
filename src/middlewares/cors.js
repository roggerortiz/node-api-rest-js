import cors from "cors";

const whiteList = [
   process.env.CORS_ORIGIN_WEB_URI
];

const options = {
   origin: (origin, callback) => {
      const isDevelopment = (process.env.NODE_ENV === 'development');

      if (!isDevelopment && whiteList.indexOf(origin) === -1)
         callback(new Error("Not allowed by CORS"));

      callback(null, true);
   },
   optionsSuccessStatus: 200,
};

export default cors(options);