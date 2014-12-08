var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();
var listen = require('react/lib/EventListener').listen;

module.exports = {
    componentWillMount: function() {
        this._documentClickHandler = listen(document, 'click', this._onDocumentClick);
    },

    componentWillUnmount: function() {
        this._documentClickHandler.remove();
    },

    _onDocumentClick: function(e) {
        if (!this.getDOMNode().contains(e.target)) this._onOutsideClick();
    },

    _onOutsideClick: function() {
        this.props.isAutocloseable && this._close();
    },

    _close: function() {
        this.props.onClose && this.props.onClose();
    },

    blockName: 'popup',

    _getPopup: function(content) {
        var block = bevis.block(this.props.blockName || 'popup', this.viewName);

        return dom.div({ className: block.name() },
            dom.div({ className: block.elem('content') },
                content || this.props.children
            )
        );
    }
};
