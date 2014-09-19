var React = require('react');
var dom = React.DOM;

var Base = require('./base');
requireStatic('./islands.styl');

module.exports = React.createClass({
    displayName: 'Islands Header',
    mixins: [Base],
    _view: 'islands',
    render: function() { return this._getHeader() }
});
