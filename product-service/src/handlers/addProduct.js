import { Client } from 'pg';

import dbConfig from '../constants/db-config';

const addProduct = async event => {
    if (event.response) {
        return event.response;
    }

    const client = new Client(dbConfig);

    await client.connect();

    try {
        const requestBody = JSON.parse(event.body);

        await client.query('begin');

        const { rows: [newProduct] } = await client.query(`
            insert into product_list(title, genre, price)
            values('${requestBody.title}', '${requestBody.genre}', ${requestBody.price})
            returning *;
        `);

        await client.query(`
            insert into product_stock(id, count)
            values('${newProduct.id}', ${requestBody.count});
        `);

        await client.query('commit');

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...newProduct,
                count: event.body.count
            })
        };
    } catch (e) {
        await client.query('rollback');

        console.log(`Lambda invocation error - addProduct - error: `, e);

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    } finally {
        client.end();
    }
};

export default addProduct;
