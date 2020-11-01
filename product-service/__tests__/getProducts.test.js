import getProducts from '../src/handlers/getProducts';

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

describe('getProducts', () => {
    it('should get all products', async () => {
        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify([
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
            ])
        };

        expect(await getProducts()).toEqual(expectedResult);
    });
});
