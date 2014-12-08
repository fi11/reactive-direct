var React = require('react');
var dom = React.DOM;

var PageMixin = require('react-serve/mixins/page');

module.exports = React.createClass({
    displayName: 'Page',
    mixins: [PageMixin],
    render: function() {
        return (
            dom.html(null,
                dom.head(null,
                    dom.meta({ charSet: 'UTF-8' }),
                    dom.title(null, this.props.title ),
                    dom.meta({
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0, user-scalable=yes'
                    }),
                    this.generateScriptsComponent(this.props.headScripts)

                ),
                this.generateBodyComponent(this.props.bodyScripts)
            )
        );
    }
});


