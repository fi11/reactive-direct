var React = require('react');
var dom = React.DOM;
var bevis  = require('../../../lib/bevis');

module.exports = {
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    _getInput: function() {
        return dom.input({
            className: 'input' + bevis.view(this._view) + (this.props.small ? '-small' : ''),
            value: this.state.value,
            onChange: this._onChange
        });
    },
    
    _onChange: function(event) {
        var handler = this.props.onChange;
        var value = event.target.value;

        this.setState({ value: value });
        handler && handler(value);
    }
};
