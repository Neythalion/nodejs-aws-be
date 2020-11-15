import AWS from 'aws-sdk';
import csv from 'csv-parser';

import { BUCKET } from '../constants/bucket-name';

const importFileParser = async event => {
    const s3 = new AWS.S3({ region: 'eu-west-1' });

    event.Records.forEach(record => {
        s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key
        }).createReadStream()
            .pipe(csv())
            .on('data', data => {
                console.log(data);
            })
            .on('end', async () => {
                console.log('Copy from ', BUCKET, '/', record.s3.object.key);

                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: BUCKET + '/' + record.s3.object.key,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                await s3.deleteObject({
                    Bucket: BUCKET,
                    Key: record.s3.object.key
                }).promise();

                console.log('Copied into ', BUCKET, '/', record.s3.object.key.replace('uploaded', 'parsed'));
            });
    });
};

export default importFileParser;
