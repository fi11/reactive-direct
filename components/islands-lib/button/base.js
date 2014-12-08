var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

module.exports = {
    displayName: 'Button',
    getInitialState: function() {
        return {
            checked: !!this.props.checked
        };
    },

    _getButton: function() {
        var block = bevis.block('button', this.viewName);

        return (
            dom.button(
                {
                    className: block.name(),
                    onClick: this._onClick
                },
                dom.span({ className: block.elem('text') }, this.props.text)
            )
        );
    },
    _onClick: function(event) {
        this.props.onClick &&  this.props.onClick(event, this);
    }
};
