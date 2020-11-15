export const logger = (config = {}) =>
    ({
        before: (handler, next) => {
            console.log(`Lambda invocation - ${config.handlerName} - event: `, handler.event);

            next();
        }
    });
