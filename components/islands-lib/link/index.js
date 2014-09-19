var React = require('react');
var dom = React.DOM;

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'Link',
    render: function() {
        var attrs = { className: 'link' };
        var props = this.props;

        Object.keys(props).forEach(function(key) {
            attrs[key] = props[key];
        });

        return (
            dom.a(attrs, this.props.children)
        );
    }
});
