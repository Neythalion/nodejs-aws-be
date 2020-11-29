import AWSMock from 'aws-sdk-mock';

import productsBatchProcess from '../src/handlers/productsBatchProcess';
import { addProduct } from '../src/dal/product.service';

jest.mock('../src/dal/product.service', () => ({
    addProduct: jest.fn()
}));

describe('productsBatchProcess', () => {
    afterEach(() => {
        jest.clearAllMocks();
        AWSMock.restore();
    });

    it('should add products', async () => {
        AWSMock.mock('SNS','publish', Promise.resolve());

        const mockedEvent = {
            Records: [
                {
                    body: JSON.stringify({
                        title: 'Product 1',
                        genre: 'RPG',
                        price: '11.99',
                        count: '8'
                    })
                }
            ]
        };

        await productsBatchProcess(mockedEvent);

        expect(addProduct).toBeCalledTimes(1);
        expect(addProduct).toBeCalledWith({
            title: 'Product 1',
            genre: 'RPG',
            price: '11.99',
            count: '8'
        });
    });
});
