import { generatePolicy } from '../utils/policy';

const basicAuthorizer = (event, ctx, cb) => {
    console.log(`Lambda invocation - basicAuthorizer - event: `, event);

    if (event.type !== 'TOKEN') {
        cb('Unauthorized');
    }

    try {
        const authToken = event.authorizationToken;
        const buff = Buffer.from(authToken, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const [login, password] = plainCreds;

        console.log(`Authorization - login: ${login}; password: ${password}`);

        const storedPassword = process.env[login];
        const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';
        const policy = generatePolicy(authToken, event.methodArn, effect);

        cb(null, policy);
    } catch (e) {
        cb('Unauthorized', e.message);
    }
};

export default basicAuthorizer;
