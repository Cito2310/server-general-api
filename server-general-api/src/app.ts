import express from "express";
import cors from "cors";
import helmet from "helmet";
import healthRouter from "./routes/health";
import userRouter from "./users/user.routes";
import authRouter from "./auth/auth.routes";
import mapRouter from "./maps/map.routes";
import marketManagerRouter from "./market-manager-backend/index";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", healthRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/maps", mapRouter);
app.use("/api/market-manager", marketManagerRouter);

export default app;
