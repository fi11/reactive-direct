var React = require('react');
var dom = React.DOM;

require('./islands.styl');

module.exports = React.createClass({
    displayName: 'Islands spinner',
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            dom.div({ className: 'spinner_islands' })
        );
    }
});
