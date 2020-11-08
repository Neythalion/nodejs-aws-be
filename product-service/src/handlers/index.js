import middy from 'middy';
import { cors } from 'middy/middlewares';

import { CLIENT_ORIGIN_SCHEME } from '../constants/cors-schemes';
import getProducts from './getProducts';
import getProductById from './getProductById';

const commonCorsConfig = {
    origin: CLIENT_ORIGIN_SCHEME
};

const getProductsHandler = middy(getProducts).use(cors(commonCorsConfig));
const getProductByIdHandler = middy(getProductById).use(cors(commonCorsConfig));

export {
    getProductsHandler,
    getProductByIdHandler
};
