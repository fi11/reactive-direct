var React = require('react');
var dom = React.DOM;
var toString = React.renderComponentToStaticMarkup;

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
        var staticBundles = this.props.staticBundles || {};
        var body = '';

        var sharedData = "window._sharedData = JSON.parse('" + JSON.stringify(context) + "');";
        //var filePath = path.join(__dirname, '/loader.js');
        //var loader = "window._staticLoader = " + reader(path.resolve(filePath)) + ";";
        var scripts = [
            '/static/' + staticBundles['commons'],
            '/static/' + staticBundles[entrypoint]
        ].map(function(path, idx) {
            return  dom.script({
                dangerouslySetInnerHTML: { __html: "window.staticLoader('" + path + "')" },
                key: idx
            });
        });
//        var scripts = [
//            '/static/' + staticBundles['commons'],
//            '/static/' + staticBundles[entrypoint]
//        ].map(function(path, idx) {
//            return  dom.script({ src: path, key: idx })
//        });

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
                    dom.script({ src: "/static/loader.js" }),
                    dom.script({ dangerouslySetInnerHTML: { __html:  sharedData } }),
                    //dom.script({ dangerouslySetInnerHTML: { __html:  loader } }),
                    scripts

                ),
                dom.body({ className: 'body' },
                    dom.div({ id: 'main', className: 'main', dangerouslySetInnerHTML: { __html: body } })
                )
            )
        );
    }
});
