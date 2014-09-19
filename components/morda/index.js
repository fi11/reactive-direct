var React = require('react');
var dom = React.DOM;
var App = require('../app');

module.exports = React.createClass({
    displayName: 'Morda',

    render: function(ctx) {
        ctx = ctx || {};
        return (
            App({},
                dom.img({ src: requireStatic('./morda.png') })
            )
        );
    }
});
