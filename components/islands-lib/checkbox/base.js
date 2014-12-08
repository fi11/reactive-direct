var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

module.exports = {
    displayName: 'Checkbox',
    getInitialState: function() {
        return {
            checked: !!this.props.checked
        };
    },

    componentWillReceiveProps: function(props) {
        this.setState({ checked: props.checked });
    },

    _getCheckbox: function() {
        var block = bevis.block('checkbox', this.viewName);

        return (
            dom.div(
                {
                    className: block.name(this.state.checked ? 'checked': ''),
                    onClick: this._onClick
                },
                dom.input({ className: block.elem('control'), type: 'checkbox' }),
                dom.div({ className: block.elem('tip') })
            )
        )
    },

    _onClick: function() {
        var newVal = !this.state.checked;
        this.setState({ checked: newVal });

        this.props.onClick &&  this.props.onClick(newVal);
    }
};
