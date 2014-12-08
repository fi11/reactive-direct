var React = require('react');
var dom = React.DOM;
var phrasesActions = require('../../app/actions/phrases');
var phrasesStore = require('../../app/stores/phrases');

var Base = require('./base.js');
var Input = require('../islands-lib/input/islands');
var Text = require('../islands-lib/textarea/islands');

require('./index.styl');

module.exports = React.createClass({
    displayName: 'Edit phrase',
    mixins: [Base],
    _onChangeDescr: function(val) {
        phrasesActions.changePhraseDescr(this.props.phraseId, val);
    },

    _getContent: function() {
        return [
            Input({ value: this.props.phrase, onChange: this._onChange }),
            dom.br(null),
            Text({
                value: phrasesStore.getDescr(this.props.phraseId),
                type: 'textarea',
                onChange: this._onChangeDescr
            })
        ];
    },

    render: function() {
        return this._getPopup(this._getContent());
    }
});
