const moment = require('moment');

const VALIDITY_MINUTES = 2;

class Cache {
    constructor(url, data) {
        this.data = data;
        this.url = url;

        this.validUntil = moment().add(VALIDITY_MINUTES, 'minutes');
    }

    isValid() {
        return moment().diff(this.validUntil, 'minutes') <= 0;
    }
}

class CacheService {
    constructor() {
        this.caches = {};
    }

    addCache(url, data) {
        this.caches[url] = new Cache(url, data);
    }

    findDataByUrl(url) {
        const cache = this.caches[url];

        return this.isCacheValid(url) ? cache.data : undefined;
    }

    isCacheValid(url) {
        const cache = this.caches[url];

        return cache && cache.isValid();
    }

}

module.exports = new CacheService();
