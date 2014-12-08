var React = require('react');
var dom = React.DOM;
var bevis = require('bevis')();

var Row = require('../phrases-table-row');

var phrasesStore = require('../../app/stores/phrases');
var appStore = require('../../app/stores/app');
var phrasesAction = require('../../app/actions/phrases');

require('./index.styl');

module.exports = React.createClass({
    displayName: 'Phrases table',
    getInitialState: function() {
        return { phrases: this.props.phrases };
    },

    componentWillMount: function() {
        phrasesStore.addChangeListener(this._onPhrasesChange, this);
    },

    componentWillUnmount: function() {
        phrasesStore.removeChangeListener(this._onPhrasesChange);
    },
    
    componentWillReceiveProps: function(props) {
        this.setState({ phrases: props.phrases });
    },

    componentDidUpdate: function() {
        phrasesAction.endUpdate();
    },

    render: function() {
        console.log('Render Phrases Table');

        var block = bevis.block('phrases-table');

        console.time('Build phrases rows');

        var phrases = (this.state.phrases || []).map(function(item, idx) {
            return Row({ phrase: item, key: idx, checked: !!item.checked });
        });

        console.timeEnd('Build phrases rows');

        return (
            dom.div({ className: block.name() },
                Row({ isHeader: true, checked: phrasesStore.isAllChecked()}),
                phrases
            )
        );
    },

    _onPhrasesChange: function() {
        this.setState({ phrases: phrasesStore.getAll() });
    }
});
