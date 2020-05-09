import express, { NextFunction, Request, Response } from "express";
import http from "http";
import morgan from "morgan";
import { GenericError } from "./models/error";
import { BucketRouter } from "./routes/bucketsRouter";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(BucketRouter.PREFIX, BucketRouter.getRoutes());

// Error Handling
app.use((err: any, req: Request, resp: Response, next: NextFunction) => {
    let error: GenericError = null;

    if ('title' in err) {
        // is a GenericError
        error = err;
    } else {
        console.log("Unexpected error: " + JSON.stringify(err));
        error = new GenericError();
        error.title = "Someting goes wrong";
    }

    resp.status(error.statusCode).send(error)
})

const port = process.env.PORT || 8080;
const server = http.createServer(app)
server.listen(port, () => console.log("Listening..."))
