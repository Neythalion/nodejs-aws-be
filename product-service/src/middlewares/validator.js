import Ajv from 'ajv';

var ajv = new Ajv();

export const validator = schema =>
    ({
        before: (handler, next) => {
            const requestBody = JSON.parse(handler.event.body);
            const valid = ajv.validate(schema, requestBody);

            if (!valid) {
                try {
                    const responseBody = {};

                    ajv.errors.map(err => {
                        responseBody[err.dataPath.replace('.', '')] = err.message;
                    });

                    handler.event.response = {
                        statusCode: 400,
                        body: JSON.stringify(responseBody)
                    };
                } catch (e) {
                    console.log(e);
                }
            }

            next();
        }
    });
