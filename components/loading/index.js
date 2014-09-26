var React = require('react');
var dom = React.DOM;
var bevis  = require('../../lib/bevis');

var Spinner = require('../islands-lib/spinner/islands.js');
var appStore = require('../../app/stores/app');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'Loading',
    getInitialState: function() {
        return { show: false };
    },
    componentWillMount: function() {
        appStore.addChangeListener(this._onPageStateChange, this);
    },
    componentWillUMount: function() {
        appStore.removeChangeListener(this._onPageStateChange);
    },
    render: function() {
        return (
            dom.div({ className: 'loading' + bevis.state('show', this.state.show) },
                Spinner()
            )
        );
    },
    _onPageStateChange: function() {
        this.setState({ show: appStore.isLoading() });
    }
});

