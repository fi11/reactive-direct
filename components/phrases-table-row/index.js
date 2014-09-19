var React = require('react');
var dom = React.DOM;
var bevis = require('../../lib/bevis');
var Checkbox = require('../islands-lib/checkbox/islands');
var Input = require('../islands-lib/input/islands');
//{"phrase":"бесплатная музыка","click":7308,"ctr":22,"price":"1.92","state":"on","type":"spec"}

requireStatic('./index.styl');
module.exports = React.createClass({
    displayName: 'Phrases table row',
    getInitialState: function() {
        return {};
    },
    render: function() {
        var isHeader = !!this.props.isHeader;
        var data = isHeader ?
            { phrase: 'Фразаы', state: 'Статус', click: 'Клики', ctr: 'CTR%' } :
            this.props.phrase;

        return (
            dom.div({ className: 'phrases-table-row' + bevis.view(isHeader && 'header') },
                dom.div({ className: 'phrases-table-row__right' },
                    dom.div({ className: 'phrases-table-row__state' }, data.state),
                    dom.div({ className: 'phrases-table-row__click' }, data.click),
                    dom.div({ className: 'phrases-table-row__ctr' }, data.ctr),
                    dom.div({ className: 'phrases-table-row__price' },
                        isHeader ? 'Цена клика' : Input({ value: data.price, small: true })
                    )
                ),
                dom.div({ className: 'phrases-table-row__left' },
                    dom.div({ className: 'phrases-table-row__checkbox'},
                        Checkbox({ checked: false })
                    ),
                    dom.div({ className: 'phrases-table-row__phrase'}, data.phrase)
                )
            )
        );
    }
});
