var React = require('react');
var dom = React.DOM;
var bevis  = require('../../../lib/bevis');

var Arrow = require('../service-arrow/islands');

module.exports = {
    displayName: 'Header',
    _getHeader: function() {
        var actions = this._getActions();
        return (
            dom.div({ className: 'header' + bevis.view(this._view) },
                dom.div({ className: 'header__right' }),
                dom.div({ className: 'header__left' },
                    dom.a({ className: 'header__logo', href: '//yandex.ru', target: '_blank' }),
                    Arrow({ name: 'Директ' }),
                    actions && dom.div({ className: 'header__actions' }, actions)
                )
            )
        );
    },

    _getActions: function() {
        var actions = this.props.actions || [];

        return actions.length ?
            actions.map(function(item, idx) {
                return  dom.a({ className: 'header__action', href: item.url, key: idx }, item.text);
            }) :
            false;

    }
};
