import AWS from 'aws-sdk';

import { addProduct } from '../dal/product.service';

const { SNS_ARN } = process.env;

const productsBatchProcess = async event => {
    const sns = new AWS.SNS({ region: 'eu-west-1' });
    const products = event.Records.map(record => JSON.parse(record.body));

    try {
        for (const product of products) {
            await addProduct(product);

            sns.publish({
                Subject: 'Products are created!',
                Message: JSON.stringify(product),
                TopicArn: SNS_ARN,
                MessageAttributes: {
                    count: {
                        DataType: 'Number',
                        StringValue: product.count
                    }
                }
            }, err => {
                if (err) {
                    console.log('Error: ', err);
                } else {
                    console.log('Email sent with ', JSON.stringify(products));
                }
            });
        }
    } catch (e) {
        console.log(`Lambda invocation error - productsBatchProcess - error: `, e);
    }
};

export default productsBatchProcess;
