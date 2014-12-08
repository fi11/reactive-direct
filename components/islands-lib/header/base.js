var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

var Arrow = require('../service-arrow/islands');

module.exports = {
    displayName: 'Header',
    _getHeader: function() {
        var block = bevis.block('header', this.viewName);
        var actions = this._getActions(block);

        return (
            dom.div({ className: block.name() },
                dom.div({ className: block.elem('right') }),
                dom.div({ className: block.elem('left') },
                    dom.a({ className: block.elem('logo'), href: '//yandex.ru', target: '_blank' }),
                    Arrow({ name: 'Директ', onClick: this.props.onArrawClick }),
                    actions && dom.div({ className: block.elem('actions') }, actions)
                )
            )
        );
    },

    _getActions: function(block) {
        var actions = this.props.actions || [];

        return actions.length ?
            actions.map(function(item, idx) {
                return  dom.a({ className: block.elem('action'), href: item.url, key: idx }, item.text);
            }) :
            false;
    }
};
