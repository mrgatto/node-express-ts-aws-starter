import { NextFunction, Request, Response } from 'express';
import { BucketsService } from './bucketService';

export class BucketController {

    constructor(
        private bucketsService: BucketsService
    ) {

    }

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const buckets = await this.bucketsService.listAllBuckets();
            resp.send(buckets);
        } catch (err) {
            next(err);
        }
    }

    async getFilesInBucket(req: Request, resp: Response, next: NextFunction) {
        console.log('Bucket Name Requested: ' + req.params.bucketName);

        try {
            const bucket = await this.bucketsService.listFilesInBucket(req.params.bucketName);
            resp.send(bucket);
        } catch (err) {
            next(err);
        }
    }

}