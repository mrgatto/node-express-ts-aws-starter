import { AWSError, S3 } from 'aws-sdk';
import { ListBucketsOutput, ListObjectsV2Output, ListObjectsV2Request } from 'aws-sdk/clients/s3';
import { Request, Response, NextFunction } from "express";
import { Bucket } from "../models/bucket";
import { GenericError } from '../models/error';

export class BucketController {

    private s3: S3;

    constructor() {
        this.s3 = new S3(
            {
                logger: console
            }
        );
    }

    public getAll(req: Request, resp: Response, next: NextFunction) {
        this.s3.listBuckets().promise()
            .then((data: ListBucketsOutput) => {
                const ret = data.Buckets.map((s3Bucket: S3.Bucket) => {
                    const bucket = new Bucket();
                    bucket.name = s3Bucket.Name;
                    return bucket;
                });

                resp.send(ret);
            })
            .catch((err: AWSError) => {
                next(GenericError.fromAWSError(err))
            })
    }

    public getFilesInBucket(req: Request, resp: Response, next: NextFunction) {
        console.log(req.params.bucketName);

        const s3Request: ListObjectsV2Request = {
            Bucket: req.params.bucketName,
            MaxKeys: 15
        }

        this.s3.listObjectsV2(s3Request).promise()
            .then((data: ListObjectsV2Output) => {
                const bucket = new Bucket();
                bucket.name = data.Name;

                data.Contents.forEach((object: S3.Object) => {
                    bucket.files.push(object.Key);
                });

                resp.send(bucket);
            })
            .catch((err: AWSError) => {
                next(GenericError.fromAWSError(err))
            })
    }

}