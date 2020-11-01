import products from '../mock/products.json';

const getProducts = async event => {
    console.log(`Lambda invocation - getProducts - event: `, event);

    try {
        return {
            statusCode: 200,
            body: JSON.stringify(products)
        };
    } catch (e) {
        console.log(`Lambda invocation error - getProducts - error: ${e}`);
    }
};

export default getProducts;
