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

const addProduct = async event => {
    console.log(`Lambda invocation - addProduct - product: ${event.body} - event: `, event);

    const client = new Client(dbConfig);

    await client.connect();

    try {
        const newProduct = await client.query(`
            begin
            insert into product_list (title, genre, price)
            values (${event.body.title}, ${event.body.genre}, ${event.body.price})
            returning *;
        `);

        await client.query(`
            insert into product_stock (id, count)
            values (${newProduct.id}, ${event.body.count});
            commit;
        `);

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...newProduct,
                count: event.body.count
            })
        };
    } catch (e) {
        console.log(`Lambda invocation error - addProduct - product: ${event.body} - error: ${e}`);

        await client.query('rollback');

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    } finally {
        client.end();
    }
};

export default addProduct;
