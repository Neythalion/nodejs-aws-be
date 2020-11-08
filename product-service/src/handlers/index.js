import middy from 'middy';
import { cors, validator } from 'middy/middlewares';

import { CLIENT_ORIGIN_SCHEME } from '../constants/cors-schemes';
import getProducts from './getProducts';
import getProductById from './getProductById';
import addProduct from './addProduct';

import productSchema from '../schemes/productSchema.json';

const commonCorsConfig = {
    origin: CLIENT_ORIGIN_SCHEME
};

const getProductsHandler = middy(getProducts).use(cors(commonCorsConfig));
const getProductByIdHandler = middy(getProductById).use(cors(commonCorsConfig));
const addProductHandler = middy(addProduct)
    .use(cors(commonCorsConfig))
    .use(validator(productSchema));

export {
    getProductsHandler,
    getProductByIdHandler,
    addProductHandler
};
