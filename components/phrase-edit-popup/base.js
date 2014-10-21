var React = require('react');
var dom = React.DOM;
var phrasesActions = require('../../app/actions/phrases');

var Popup = require('../islands-lib/popup/base');

module.exports =  {
    mixins: [Popup],
    _onChange: function(val) {
        phrasesActions.changePhrase(this.props.phraseId, val);
    },
    getDefaultProps: function() {
        return {
            isAutocloseable: true,
            blockName: 'phrase-edit-popup'
        };
    }
};
