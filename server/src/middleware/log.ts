import { type NextFunction } from "express"

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    next()
}
