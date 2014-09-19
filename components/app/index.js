var React = require('react');
var dom = React.DOM;
var Header = require('../islands-lib/header/islands.js');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'App',

    render: function(ctx) {
        ctx = ctx || {};

        return (
            dom.div({ className: 'application' },
                Header({ actions: this.props.headerActions }),
                this.props.children,
                dom.div({ className: 'footer' })
            )
        );
    }
});
