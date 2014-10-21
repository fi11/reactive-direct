var React = require('react');
var dom = React.DOM;

var Base = require('./base.js');
var Input = require('../islands-lib/input/islands');
var Button = require('../islands-lib/button/islands');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'Edit phrase',
    mixins: [Base],

    _getContent: function() {
        return [
            Input({ value: this.props.phrase, onChange: this._onChange }),
            Button({ text: 'improved' })
        ];
    },

    render: function() {
        return this._getPopup(this._getContent());
    }
});
