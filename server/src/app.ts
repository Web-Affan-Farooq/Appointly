import express, { Application } from "express"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth"

import cors from "cors"
import helmet from "helmet"

import { errorHandler } from "./middlewares/error.middleware"

import { ServicesRouter } from "./routes"


export const app: Application = express();

// ______ Security middleware ...
app.use(helmet())
app.use(
    cors({
        origin: [process.env.CLIENT_URL as string],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// _____ Body parsing ...
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// _____ Routes...
app.use("/api", ServicesRouter)

app.get("/health", (req, res) => {
    console.log(`Incoming request from : ${req.url}`)
    res.status(200).json({ status: "ok" })
})

app.use(errorHandler)