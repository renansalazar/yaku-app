'use strict'
const Cloudant = require('@cloudant/cloudant')

class Repository {

    constructor(serviceSettings) {
        this.serviceSettings = serviceSettings;
    }

    async insert(body) {
        let cloudant = await this.initializationCloudant();
        let db = await cloudant.db.use(this.serviceSettings.db);

        let doc = {
            'tipo': body.tipo,
            'lat': body.lat,
            'lng': body.lng,
            'pais': body.pais,
            'fec': body.fec
        }

        return await db.insert(doc).catch((err) => {
            console.log(err);
        });
    }

    async list() {
        let cloudant = await this.initializationCloudant();
        let db = await cloudant.db.use(this.serviceSettings.db);

        let result = await db.list({ include_docs: true }).catch((err) => {
            console.log(err);
        });

        var resultClean = [];
        result.rows.forEach(element => {
            resultClean.push(element.doc);
        });
        return resultClean;
    }

    async initializationCloudant() {
        try {
            return await Cloudant({ username: this.serviceSettings.username, password: this.serviceSettings.password, url: this.serviceSettings.url });
        } catch (error) {
            console.error(error);
        }
    }

}
module.exports = Repository;