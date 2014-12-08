var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

require('./index.styl');

module.exports = React.createClass({
    displayName: 'Link',
    render: function() {
        var block = bevis('link', this.viewName);

        var attrs = { className: block.name() };
        var props = this.props;

        Object.keys(props).forEach(function(key) {
            attrs[key] = props[key];
        });

        return (
            dom.a(attrs, this.props.children)
        );
    }
});
