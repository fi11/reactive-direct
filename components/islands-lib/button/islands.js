var React = require('react');
var dom = React.DOM;

var Base = require('./base.js');
require('./islands.styl');

module.exports = React.createClass({
    displayName: 'Islands button',
    mixins: [Base],
    viewName: 'islands',
    render: function() {
        return (this._getButton())
    }
});
