var React = require('react');
var dom = React.DOM;
var App = require('../app');
var Nav = require('../nav-bar');
var PhrasesTable = require('../phrases-table');

module.exports = React.createClass({
    displayName: 'Phrases',
    
    componentDidMount: function() {
    },

    render: function() {
        var ctx = this.props.context || {};

        return (
            App({ headerActions: [{ text: 'Новая кампания', url: '/' }] },
                Nav({ currentTab: 'phrases' }),
                PhrasesTable({ phrases: ctx.phrases })
            )
        );
    }
});
