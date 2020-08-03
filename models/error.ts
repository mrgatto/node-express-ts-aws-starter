import { AWSError } from 'aws-sdk';

export class GenericError {

    statusCode = 500;
    title: string;
    message: string;

    public static fromAWSError(awsError: AWSError) {
        const error = new GenericError();
        error.title = awsError.code;
        error.message = awsError.message;
        error.statusCode = awsError.statusCode

        return error;
    }
}