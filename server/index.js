//"type":"module" in pkg.json for import
//express for framework for api's
import express from "express";
//bodyParser for parsing our data coming in
import bodyParser from "body-parser";
//mongoose for managing mongodb
import mongoose from "mongoose";
//cors for cross origin resource sharing
import cors from "cors";
//dotenv for env variables
import dotenv from "dotenv";
//helmet for protecting our api's
import helmet from "helmet";
//morgan for logging our api's call
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//nodemon for live server reload

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config(); //setup env variable
const app = express();
app.use(express.json()); //to invoke express
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //allows cross origin sharing request
app.use(morgan("common")); //api calls from another server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));

    // ONLY ADD DATA ONE TIME
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
  })
  .catch((err) => console.log(err));
