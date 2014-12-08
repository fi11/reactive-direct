var React = require('react');
var dom = React.DOM;
var Header = require('../islands-lib/header/islands.js');
var routesAction = require('../../app/actions/routes');
var bevis = require('bevis')();

require('./index.styl');

module.exports = React.createClass({
    displayName: 'App',

    componentDidMount: function() {
        window.React = React;
        window.onpopstate = function() {
            routesAction.loadPage(location.href, true);
        };
    },

    _onArrawClick: function() {
        routesAction.loadMorda();
    },
    render: function() {
        var block = bevis.block('app');

        return (
            dom.div({ className: block.name() },
                Header({ actions: this.props.headerActions, onArrawClick: this._onArrawClick }),
                this.props.children,
                dom.div({ className: 'footer' })
            )
        );
    }
});
