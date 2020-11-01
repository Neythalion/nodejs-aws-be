import getProductById from '../src/handlers/getProductById';

jest.mock('../src/mock/products.json', () => ([
    {
        "genre": "Fighting",
        "id": "9195882d-a421-4ae8-8992-478aae476cc0",
        "price": 1199,
        "title": "Product 1"
    },
    {
        "genre": "Fighting",
        "id": "9195882d-a421-4ae8-8992-478aae476cc1",
        "price": 699,
        "title": "Product 2"
    },
    {
        "genre": "Fighting",
        "id": "9195882d-a421-4ae8-8992-478aae476cc2",
        "price": 1035,
        "title": "Product 3"
    },
]));

describe('getProductById', () => {
    it('should return product with correct id', async () => {
        const mockedEvent = {
            pathParameters: {
                productId: '9195882d-a421-4ae8-8992-478aae476cc1'
            }
        };
        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify({
                genre: 'Fighting',
                id: '9195882d-a421-4ae8-8992-478aae476cc1',
                price: 699,
                title: 'Product 2'
            })
        };

        expect( await getProductById(mockedEvent)).toEqual(expectedResult);
    });

    it('should return product not found error', async () => {
        const mockedEvent = {
            pathParameters: {
                productId: 'not valid id'
            }
        };
        const expectedResult = {
            statusCode: 404,
            body: JSON.stringify({
                message: 'product not found'
            })
        };

        expect(await getProductById(mockedEvent)).toEqual(expectedResult);
    });
});
