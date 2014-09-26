var React = require('react');
var dom = React.DOM;
var bevis  = require('../../../lib/bevis');

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
        return (
            dom.div(
                {
                    className: 'checkbox' + bevis.view(this._view) + bevis.state('checked', this.state.checked),
                    onClick: this._onClick
                },
                dom.input({ className: 'checkbox__control', type: 'checkbox' }),
               // dom.div({ className: 'checkbox__box' }),
                dom.div({ className: 'checkbox__tip' })
            )
        )
    },

    _onClick: function() {
        var newVal = !this.state.checked;
        this.setState({ checked: newVal });

        this.props.onClick &&  this.props.onClick(newVal);
    }
};
