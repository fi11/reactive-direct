var React = require('react');
var dom = React.DOM;
var bevis  = require('../../../lib/bevis');

module.exports = {
    displayName: 'Tabs',
    getInitialState: function() {
        return {
            current: this.props.current || ''
        };
    },

    _getTabs: function() {
        var current = this.state.current;
        var tabs = (this.props.tabs || []).map(function(item, idx) {
            var isCurrent = item.name && item.name === current;

            return dom.li(
                {
                    className: 'tabs__item' +  bevis.state('selected', isCurrent),
                    onClick: this._onSelect.bind(this, item.name),
                    key: idx
                },
                dom.div({ className: 'tabs__text' }, item.text))
        }, this);

        return dom.ul({ className: 'tabs' + bevis.view(this._view)  }, tabs);
    },

    render: function() {
        return (this._getTabs())
    },

    _onSelect: function(name) {
        this.setState({ current: name });
        this.props.onSelect && this.props.onSelect(name);
    }
};
