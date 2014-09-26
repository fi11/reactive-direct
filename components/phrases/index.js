
var React = require('react');
var dom = React.DOM;
var App = require('../app');
var Nav = require('../nav-bar');
var PhrasesTable = require('../phrases-table');
var PhrasesFooter = require('../phrases-footer');
var phrasesStore = require('../../app/stores/phrases');

var appStore = require('../../app/stores/app');

var Loading = require('../loading');

requireStatic('./index.styl');

var Phrases = module.exports = React.createClass({
    displayName: 'Phrases',
    getInitialState: function() {
        return {
            phrases: this.props.context.phrases,
            isAllChecked: false
        };
    },

    componentDidMount: function() {
        appStore.addInitListener(this._onInitData, this);
    },

    componentWillUnmount: function() {
        appStore.removeInitListener();
    },
    
    componentWillReceiveProps: function() {
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

    _onInitData: function() {
        Phrases.init(appStore.getInitData());
    },

    statics: {
        init: function(context) {
            phrasesStore.init(context.phrases);

            if (context.title) document.title = context.title;

            React.renderComponent(Phrases({ context: context }), document.body);
        }
    }
});
