import { Router } from "express";
import { BucketController } from '../controllers/bucketsController';

export class BucketRouter {

    public static PREFIX = "/buckets";

    public static getRoutes(): Router {

        const cntrl = new BucketController();

        const router = Router();
        router.get('/', (req, resp, next) => cntrl.getAll(req, resp, next));
        router.get('/:bucketName', (req, resp, next) => cntrl.getFilesInBucket(req, resp, next));

        return router;
    }

}
