var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

module.exports = {
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    _getTextarea: function() {
        var block = bevis.block('textarea', this.viewName);

        return dom.textarea({
            className: block.name() + (this.props.small ? '-small' : ''),
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
