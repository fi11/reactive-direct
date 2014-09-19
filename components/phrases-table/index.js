var React = require('react');
var dom = React.DOM;

var Row = require('../phrases-table-row');

module.exports = React.createClass({
    displayName: 'Phrases table',
    render: function() {
        var phrases = (this.props.phrases || []).map(function(item, idx) {
            return Row({ phrase: item, key: idx });
        });

        return (
            dom.div({ className: 'phrases-table' },
                Row({ isHeader: true }),
                phrases
            )
        );
    }
});
