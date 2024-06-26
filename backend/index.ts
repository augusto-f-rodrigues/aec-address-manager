import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import loginRoutes from "./routes/login.routes";
import signInRoutes from "./routes/sign-in.routes";
import { tokenValidated } from "./middleware/tokenValidated.middleware";

dotenv.config();

const app: Express = express();

const port = process.env.PORT;
export const secretKey = process.env.JWT_SECRET;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use("/api", signInRoutes);
app.use("/api", loginRoutes);

app.use('*', tokenValidated);

app.use("/api", userRoutes);
app.use("/api", addressRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
