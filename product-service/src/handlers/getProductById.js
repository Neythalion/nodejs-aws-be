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

const getProductById = async event => {
    console.log(`Lambda invocation - getProductById - id: ${event.pathParameters.productId} - event: `, event);

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
        console.log(`Lambda invocation error - getProductById - id: ${event.pathParameters.productId} - error: ${e}`);

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    } finally {
        client.end();
    }
};

export default getProductById;
