var React = require('react');
var dom = React.DOM;

var Base = require('./base');
require('./islands.styl');

module.exports = React.createClass({
    displayName: 'Islands Header',
    mixins: [Base],
    viewName: 'islands',
    render: function() {
        console.log('Render Header Component');
        return this._getHeader()
    }
});
