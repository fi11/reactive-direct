var React = require('react');
var dom = React.DOM;
var bevis  = require('bevis')();

var Spinner = require('../islands-lib/spinner/islands.js');
var appStore = require('../../app/stores/app');

require('./index.styl');

module.exports = React.createClass({
    displayName: 'Loading',
    getInitialState: function() {
        return { show: false };
    },
    componentWillMount: function() {
        appStore.addChangeListener(this._onPageStateChange, this);
    },
    componentWillUnmount: function() {
        appStore.removeChangeListener(this._onPageStateChange);
    },
    render: function() {
        var block = bevis.block('loading');

        return (
            dom.div({ className: block.name(this.state.show ? 'show' : '') },
                Spinner()
            )
        );
    },
    _onPageStateChange: function() {
        this.setState({ show: appStore.isLoading() });
    }
});

