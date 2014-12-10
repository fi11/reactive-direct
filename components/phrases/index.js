var React = require('react');
var dom = React.DOM;
var App = require('../app');
var Nav = require('../nav-bar');
var PhrasesTable = require('../phrases-table');
var PhrasesFooter = require('../phrases-footer');
var phrasesStore = require('../../app/stores/phrases');
var appStore = require('../../app/stores/app');
var Loading = require('../loading');
var InitMixin = require('react-serve/mixins/init');

require('./index.styl');

module.exports = React.createClass({
    displayName: 'Phrases',
    mixins: [InitMixin],
    getInitialState: function() {
        console.log('Phrases Component Init');
        return {
            phrases: phrasesStore.getAll(),
            isAllChecked: phrasesStore.isAllChecked()
        };
    },

    componentWillReceiveProps: function() {
        console.log('Phrases Component Will Receive Props');
        this.setState({ phrases: phrasesStore.getAll(), isAllChecked: phrasesStore.isAllChecked() });
    },

    render: function() {
        return (
            App({ headerActions: [{ text: 'Новая кампания', url: '/' }] },
                Nav({ currentTab: 'phrases' }),
                PhrasesTable({ phrases: this.state.phrases, isAllChecked: this.state.isAllChecked }),
                PhrasesFooter(),
                Loading()
            )
        );
    },

    statics: {
        storesWillMount: function(data) {
            console.log('Phrases Store Will Mount');
            phrasesStore.init(data.phrases);
            appStore.init(data.phrases);
        }
    }
});
