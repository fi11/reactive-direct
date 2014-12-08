var React = require('react');
var dom = React.DOM;
var Button = require('../islands-lib/button/islands');

var phrasesAction = require('../../app/actions/phrases');
var routesAction = require('../../app/actions/routes');

module.exports = React.createClass({
    displayName: 'Phrases footer',
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            dom.div({ className: 'phrases-footer' },
                Button({ text: 'Вкл.', onClick: this._phraseOn }),
                Button({ text: 'Выкл.', onClick: this._phraseOff }),
                Button({ text: 'Загрузить все', onClick: this._loadAllPhrases }),
                Button({ text: 'Сохранить', onClick: this._saveAllPhrases })
            )
        );
    },

    _loadAllPhrases: function() {
        //routesAction.loadAllPhrases();
        phrasesAction.loadAll();
    },

    _saveAllPhrases: function() {
        phrasesAction.saveAllPhrases();
    },

    _phraseOn: function() {
        phrasesAction.setState(true);
    },

    _phraseOff: function() {
        phrasesAction.setState(false);
    }
});
