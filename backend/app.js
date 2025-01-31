// import express from "express";
// import cors from "cors";
// import { connectDB } from "./DB/Database.js";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
// import transactionRoutes from "./Routers/Transactions.js";
// import userRoutes from "./Routers/userRouter.js";
// import path from "path";

// dotenv.config();
// const app = express();

// const port = process.env.PORT;

// connectDB();

// const allowedOrigins = [
//   "https://main.d1sj7cd70hlter.amplifyapp.com",
//   "https://expense-tracker-app-three-beryl.vercel.app",
//   "http://localhost:3000",
//   // add more origins as needed
// ];

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Router
// app.use("/api/v1", transactionRoutes);
// app.use("/api/auth", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on http://localhost:${port}`);
// });


import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

dotenv.config();
const app = express();

const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "http://localhost:3000",
  // add more origins as needed
];

// CORS Configuration
app.use(express.json());

// Configure CORS before other middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});