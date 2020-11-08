import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbConfig = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};

const getProducts = async event => {
    console.log(`Lambda invocation - getProducts - event: `, event);

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
        console.log(`Lambda invocation error - getProducts - error: ${e}`);
    } finally {
        client.end();
    }
};

export default getProducts;
