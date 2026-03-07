import { Router, Request, Response } from "express";

const ServiceRouter = Router();

ServiceRouter.get("/services", (req: Request, res: Response) => {
    console.log("Service router ...");
    res.send()
})