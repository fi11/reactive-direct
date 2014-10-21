var PhrasesModel = require('../../models/phrases');

var parse = require('co-body');

exports.index = function *() {
    var isAll = this.query.limit === 'all';

    var model = new PhrasesModel(this);
    var phrases = yield model.getIndex(isAll ? 3000 : 15);

    this.body = { phrases: phrases };
};

exports.save = function *() {
    var model = new PhrasesModel(this);

    var data = yield parse(this);
    yield model.updateMany(data);

    this.body = { ok: true };
};
