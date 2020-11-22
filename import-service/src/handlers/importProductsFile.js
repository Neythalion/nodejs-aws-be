import AWS from 'aws-sdk';

import { BUCKET } from '../constants/bucket-name';

const importProductsFile = async event => {
    const fileName = event.queryStringParameters.name;
    const filePath = `uploaded/${fileName}`;
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const params = {
        Bucket: BUCKET,
        Key: filePath,
        Expires: 60,
        ContentType: 'text/csv'
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) return reject(err);

            resolve({
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: url
            });
        });
    });
};

export default importProductsFile;
