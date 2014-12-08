var PhrasesModel = require('../../models/phrases');

exports.index = function *() {
    var show = this.params.show;
    var isAll;

    if (show) {
        isAll = (show === 'all') || this.send(404);
    }

    var model = new PhrasesModel(this);
    var phrases = yield model.getIndex(isAll ? 3000 : 15);

    this.renderPage('phrases', { phrases: phrases });
};
