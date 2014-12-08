var React = require('react');
var dom = React.DOM;

var Base = require('./base');
require('./islands.styl');

module.exports = React.createClass({
    displayName: 'Service arrow islands',

    mixins: [Base],

    viewName: 'islands',

    render: function() {
        return this._getArrow();
    }
});
