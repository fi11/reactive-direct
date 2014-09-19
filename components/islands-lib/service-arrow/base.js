var React = require('react');
var dom = React.DOM;
var bevis = require('../../../lib/bevis');

module.exports = {
    displayName: 'Service arrow',
    _getArrow: function() {
        return (
            dom.div({ className: 'service-arrow' + bevis.view(this._view)  },
                dom.div({ className: 'service-arrow__arrow' }),
                dom.div({ className: 'service-arrow__content' },
                    !!this.props.name && dom.a({ className: 'service-arrow__name', href: '/' }, this.props.name),
                    this.props.children
                )
            )
        );
    }
};
