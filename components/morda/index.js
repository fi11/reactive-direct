var React = require('react');
var dom = React.DOM;
var App = require('../app');

var InitMixin = require('react-serve/mixins/init');

module.exports = React.createClass({
    displayName: 'Morda',
    mixins: [InitMixin],
    render: function() {
        return (
            App({},
                dom.img({ src: require('./morda.png') })
            )
        );
    }
});
