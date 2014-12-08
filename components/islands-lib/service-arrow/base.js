var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

module.exports = {
    displayName: 'Service arrow',
    _getArrow: function() {
        var block = bevis.block('service-arrow', this.viewName);

        return (
            dom.div({ className: block.name()  },
                dom.div({ className: block.elem('arrow') }),
                dom.div({ className: block.elem('content') },
                    !!this.props.name && dom.a(
                        {
                            className: block.elem('name'), onClick: this.props.onClick
                        },
                        this.props.name),
                    this.props.children
                )
            )
        );
    }
};
