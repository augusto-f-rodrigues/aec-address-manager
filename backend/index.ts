import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import loginRoutes from "./routes/login.routes";
import signInRoutes from "./routes/sign-in.routes";
import { tokenValited } from "./middleware/tokenValited.middleware";

dotenv.config();

const app: Express = express();

const port = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use("/api", signInRoutes);
app.use("/api", loginRoutes);

app.use('*', tokenValited);

app.use("/api", userRoutes);
app.use("/api", addressRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
