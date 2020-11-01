import products from '../mock/products.json';

const getProductById = async event => {
    console.log(`Lambda invocation - getProductById - id: ${event.pathParameters.productId} - event: `, event);

    try {
        const product = products.find(el => el.id === event.pathParameters.productId);

        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'product not found' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(product)
        };
    } catch (e) {
        console.log(`Lambda invocation error - getProductById - id: ${event.pathParameters.productId} - error: ${e}`);

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    }
};

export default getProductById;
