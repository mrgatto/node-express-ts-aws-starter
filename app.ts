import express, { NextFunction, Request, Response } from "express";
import http from "http";
import morgan from "morgan";
import { GenericError } from "./models/error";
import { bucketRouter } from "./modules/s3";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(bucketRouter.PREFIX, bucketRouter.getRouter());

// Error Handling
app.use((err: any, req: Request, resp: Response, next: NextFunction) => {
    const error: GenericError = {
        statusCode: err.statusCode || '500',
        title: err.title || '',
        message: err.message || 'Someting goes wrong',

    }

    resp.status(error.statusCode).send(error)
})

const port = process.env.PORT || 8080;
const server = http.createServer(app)
server.listen(port, () => console.log("Listening..."))
