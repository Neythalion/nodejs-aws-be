import { Client } from 'pg';

import dbConfig from '../constants/db-config';

const getProductById = async event => {
    const client = new Client(dbConfig);

    await client.connect();

    try {
        const result = await client.query(`
            select * from product_list inner join product_stock using (id) where id = '${event.pathParameters.productId}'
        `);

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'product not found' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.rows[0])
        };
    } catch (e) {
        console.log(`Lambda invocation error - getProductById - error: `, e);

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    } finally {
        client.end();
    }
};

export default getProductById;
