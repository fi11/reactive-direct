var React = require('react');
var dom = React.DOM;
var Tabs = require('../islands-lib/tabs/islands');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'Nav bar',
    render: function() {
        return (
            dom.div({ className: 'nav-bar' },
                Tabs({
                         tabs: [
                             { name: 'campaigns', text: 'Кампании' },
                             { name: 'phrases', text: 'Фразы' }
                         ],
                         current: this.props.currentTab || 'campaigns'
                     })
            )
        );
    }
});
