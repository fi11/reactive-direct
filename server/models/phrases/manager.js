var Manager = require('../json-manager');

module.exports = Manager.create('PhrasesManager', {
    getById: function *(id) {
        var data = yield this.getData();

        return data[id] || null;
    },

    getAll: function *(limit) {
        var data = yield this.getData();
        var result = [];

        var keys = Object.keys(data);

        for (var i=0; i < (limit|| 3000) + 1; i++) {
            var id = keys[i];
            var ph = data[id];

            ph.id = id;
            result.push(ph);
        }

        return result;
    }
});
