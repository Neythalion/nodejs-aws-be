import middy from '@middy/core';
import cors from '@middy/http-cors';

import { CLIENT_ORIGIN_SCHEME } from '../constants/cors-schemes';
import getProducts from './getProducts';
import getProductById from './getProductById';
import addProduct from './addProduct';
import { logger, validator } from '../middlewares';

import productSchema from '../schemes/productSchema.json';

const commonCorsConfig = {
    origin: CLIENT_ORIGIN_SCHEME
};

const getProductsHandler = middy(getProducts)
    .use(cors(commonCorsConfig))
    .use(logger({ handlerName: 'getProducts' }));
const getProductByIdHandler = middy(getProductById)
    .use(cors(commonCorsConfig))
    .use(logger({ handlerName: 'getProductById' }));
const addProductHandler = middy(addProduct)
    .use(cors(commonCorsConfig))
    .use(logger({ handlerName: 'addProduct' }))
    .use(validator(productSchema));

export {
    getProductsHandler,
    getProductByIdHandler,
    addProductHandler
};
