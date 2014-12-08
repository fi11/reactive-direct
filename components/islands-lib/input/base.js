var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

var db = require('just-debounce');

module.exports = {
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    _getInput: function() {
        var block = bevis.block('input', this.viewName && this.viewName + (this.props.small ? '-small' : ''));

        return dom.input({
            className: block.name(),
            value: this.state.value,
            type: this.props.type,
            onChange: this._onChange
        });
    },

    _onChange: function(event) {
        var handler = this.props.onChange && db(this.props.onChange, 500);
        var value = event.target.value;

        this.setState({ value: value });
        handler && handler(value);
    }
};
