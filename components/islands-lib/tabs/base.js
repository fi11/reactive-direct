var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

module.exports = {
    displayName: 'Tabs',
    getInitialState: function() {
        return {
            current: this.props.current || ''
        };
    },

    _getTabs: function() {
        var block = bevis.block('tabs', this.viewName);

        var current = this.state.current;
        var tabs = (this.props.tabs || []).map(function(item, idx) {
            var isCurrent = item.name && item.name === current;

            return dom.li(
                {
                    className: block.elem('item', isCurrent ? 'selected' : ''),
                    onClick: this._onSelect.bind(this, item.name),
                    key: idx
                },
                dom.div({ className: block.elem('text') }, item.text))
        }, this);

        return dom.ul({ className: block.name()  }, tabs);
    },

    render: function() {
        return (this._getTabs())
    },

    _onSelect: function(name) {
        this.setState({ current: name });
        this.props.onSelect && this.props.onSelect(name);
    }
};
