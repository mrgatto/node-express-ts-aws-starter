import { BucketController } from "./bucketController";
import { BucketsService } from "./bucketService";
import { BucketRouter } from "./bucketRouter";

const bucketService = new BucketsService();
const bucketController = new BucketController(bucketService);
const bucketRouter = new BucketRouter(bucketController);

export { bucketRouter }

