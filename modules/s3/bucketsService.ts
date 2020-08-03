import { S3, AWSError } from "aws-sdk";
import { ListBucketsOutput, ListObjectsV2Request, ListObjectsV2Output } from "aws-sdk/clients/s3";
import { Bucket } from "../../models/bucket";
import { GenericError } from "../../models/error";

export class BucketsService {

    private s3: S3;

    constructor() {
        this.s3 = new S3(
            {
                logger: console
            }
        );
    }

    async listAllBuckets(): Promise<Bucket[]> {
        let buckets: Bucket[] = [];
        await this.s3.listBuckets().promise()
            .then((data: ListBucketsOutput) => {
                buckets = data.Buckets.map((s3Bucket: S3.Bucket) => {
                    const bucket = new Bucket();
                    bucket.name = s3Bucket.Name;
                    return bucket;
                });
            }).catch((err: AWSError) => {
                throw GenericError.fromAWSError(err);
            })

        return buckets;
    }

    async listFilesInBucket(bucketName: string): Promise<Bucket> {
        const s3Request: ListObjectsV2Request = {
            Bucket: bucketName,
            MaxKeys: 15
        }

        let bucket: Bucket = null;
        await this.s3.listObjectsV2(s3Request).promise()
            .then((data: ListObjectsV2Output) => {
                bucket = new Bucket();
                bucket.name = data.Name;

                data.Contents.forEach((object: S3.Object) => {
                    bucket.files.push(object.Key);
                });
            }).catch((err: AWSError) => {
                throw GenericError.fromAWSError(err);
            })

        return bucket;
    }

}