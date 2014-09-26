var React = require('react');
var dom = React.DOM;
var Header = require('../islands-lib/header/islands.js');

var routesAction = require('../../app/actions/routes');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'App',
    componentDidMount: function() {
        window.onpopstate = function() {
            routesAction.loadPage(location.href);
        };

    },
    render: function(ctx) {
        ctx = ctx || {};

        return (
            //dom.div({ className: 'main', id: 'main', onScroll: this.onScroll },
            dom.div({ className: 'main', id: 'main' },
                Header({ actions: this.props.headerActions }),
                this.props.children,
                dom.div({ className: 'footer' })
            )
        );
    },
    onScroll: function(e) {
        console.log(this.getDOMNode().scrollTop);
    }
});
