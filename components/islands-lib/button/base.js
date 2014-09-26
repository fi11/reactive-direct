var React = require('react');
var dom = React.DOM;
var bevis  = require('../../../lib/bevis');

module.exports = {
    displayName: 'Button',
    getInitialState: function() {
        return {
            checked: !!this.props.checked
        };
    },

    _getButton: function() {
        return (
            dom.button(
                {
                    className: 'button' + bevis.view(this._view),
                    onClick: this._onClick
                },
                dom.span({ className: 'button__text' }, this.props.text)
            )
        );
    },
    _onClick: function(event) {
        this.props.onClick &&  this.props.onClick(event, this);
    }
};
