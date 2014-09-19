var Model = require('modelx').Model;
var Manager = require('./manager');


module.exports = Model.create('PhraseModel', {
    __managers: { json: Manager },

    getDetail: function *(id) {
        var phrase = this.query('json').getById(id);

        phrase.id = id;

        return phrase;
    },

    getIndex: function *(limit) {
        var data = yield this.query('json').getAll(limit);

        return data;
    }

});
