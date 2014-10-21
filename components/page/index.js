var React = require('react');
var dom = React.DOM;
var toString = React.renderComponentToStaticMarkup;

var fs = require('fs');
var path = require('path');
var loader = fs.readFileSync(path.resolve(path.join('lib', 'bucket.min.js'))).toString();
//var reader = require('fs').readFileSync;
//var path = require('path');

var components = {
    morda: require('../morda'),
    phrases: require('../phrases')
};

module.exports = React.createClass({
    displayName: 'Page',
    render: function() {
        var context = this.props.context || {};
        var entrypoint = this.props.entrypoint || 'morda';
        var body = '';

        var sharedData = "window._sharedData = JSON.parse('" + JSON.stringify(context) + "');";

        var preparedBundles = [];

        this.props.bundles.forEach(function(bundle) {
            bundle.js && preparedBundles.push(bundle.js);
            bundle.css && preparedBundles.push(bundle.css);
        });

        var scripts = preparedBundles.map(function(bundle, idx) {
            return dom.script({
                dangerouslySetInnerHTML: {
                    __html: "bucket.require('" +
                        bundle.path + "', { key: '" + bundle.key + "', version: '" + bundle.version + "'});"
                },
                key: idx
            });
        });

        try {
            body = React.renderComponentToString(components[entrypoint]({ context: context }));
        } catch (err) {
            console.log('BODY RENDER ERROR:', err);
        }

        return (
            dom.html(null,
                dom.head(null,
                    dom.meta({ charSet: 'UTF-8' }),
                    dom.title(null, this.props.title ),
                    dom.meta({
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0, user-scalable=yes'
                    }),

                    //dom.link({ rel: 'stylesheet', type:'text/css', href: '/static/main.css' })
                    // dom.script({ src: "/static/loadkit.js" }),
                    dom.script({ dangerouslySetInnerHTML: { __html:  loader } }),
                    dom.script({ dangerouslySetInnerHTML: { __html:  sharedData } }),
                    scripts

                ),
                dom.body({ className: 'body', dangerouslySetInnerHTML: { __html: body } })
            )
        );
    }
});
