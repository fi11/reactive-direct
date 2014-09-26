var PhrasesModel = require('../../models/phrases');

exports.index = function *() {
    console.log(this.query);
    var isAll = this.query.limit === 'all';

    var model = new PhrasesModel(this);
    var phrases = yield model.getIndex(isAll ? 3000 : 15);

    this.body = { phrases: phrases };
};
