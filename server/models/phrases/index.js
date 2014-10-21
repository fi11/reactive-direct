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
    },

    updateMany: function *(items) {
        var data = yield this.query('json').getData();

        (items || []).forEach(function(newItem) {
            ['phrase', 'click', 'decr', 'ctr', 'price', 'state', 'type'].forEach(function(key) {
                if (newItem[key] || newItem[key] === null) data[newItem.id][key] = newItem[key];
            });
        });

        yield this.query('json').saveData(data);
    }

});
