import { Client } from 'pg';

import dbConfig from '../constants/db-config';

const getProducts = async event => {
    const client = new Client(dbConfig);

    await client.connect();

    try {
        const result = await client.query(`
            select * from product_list inner join product_stock using (id)
        `);

        return {
            statusCode: 200,
            body: JSON.stringify(result.rows)
        };
    } catch (e) {
        console.log(`Lambda invocation error - getProducts - error: `, e);

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    } finally {
        client.end();
    }
};

export default getProducts;
