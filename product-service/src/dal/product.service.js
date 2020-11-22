import { Client } from 'pg';

import dbConfig from '../constants/db-config';

export const addProduct = async product => {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        await client.query('begin');

        const { rows: [newProduct] } = await client.query(`
            insert into product_list(title, genre, price)
            values('${product.title}', '${product.genre}', ${+product.price})
            returning *;`
        );

        await client.query(
            `insert into product_stock(id, count) values('${newProduct.id}', ${+product.count});`
        );

        await client.query('commit');
    } catch (e) {
        await client.query('rollback');

        throw e;
    } finally {
        client.end();
    }
};
