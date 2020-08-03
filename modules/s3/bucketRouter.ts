import { Router } from "express";
import { BucketController } from './bucketController';

export class BucketRouter {

    public PREFIX = "/buckets";

    constructor(
        private bucketController: BucketController
    ) {

    }

    public getRouter(): Router {
        const router = Router();

        router.get('/', (req, resp, next) => {
            this.bucketController.getAll(req, resp, next);
        });

        router.get('/:bucketName', (req, resp, next) => {
            this.bucketController.getFilesInBucket(req, resp, next);
        });

        return router;
    }

}
