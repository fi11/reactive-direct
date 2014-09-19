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
        return dom.button({
            className: 'button' + bevis.view(this._view),
            onClick: this._onClick
        });
    },

    _onClick: function() {
        //this.setState({ checked: !this.state.checked });
        this.props.onClick &&  this.props.onClick();
    }
};
