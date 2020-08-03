import { BucketController } from "./bucketsController";
import { BucketsService } from "./bucketsService";
import { BucketRouter } from "./bucketsRouter";

const bucketService = new BucketsService();
const bucketController = new BucketController(bucketService);
const bucketRouter = new BucketRouter(bucketController);

export { bucketRouter }

