var Manager = require('modelx').Manager;
var fs = require('fs');

function JsonBaseManager(name, ctx) {
    this._read = function () {
        return function(cb){
            fs.readFile(ctx.jsonPath, 'utf8', cb);
        }
    };

    this._write = function(data) {
        return function(cb){
            fs.writeFile(ctx.jsonPath, data, cb);
        }
    };
}

module.exports = Manager.create(JsonBaseManager, {
    getData: function *() {
        console.time('Read json data');
        var data = yield this._read();

        try {
            data = JSON.parse(data);
        } catch (err) {
            new Error('Bad phrase data');
        }

        console.timeEnd('Read json data');
        return data;
    },

    saveData: function *(data) {
        try {
            data = JSON.stringify(data);
        } catch (err) {
            new Error('Can`t serialize data');
        }

        yield this._write(data);
    }
});
