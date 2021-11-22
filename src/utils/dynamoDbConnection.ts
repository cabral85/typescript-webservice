const aws = require('aws-sdk');
import { Converter } from 'aws-sdk/clients/dynamodb';

aws.config.update({ endpoint: 'http://localhost:8000', region: 'us-east-2' });

const dynamoDb = new aws.DynamoDB.DocumentClient();

export { dynamoDb, Converter };
