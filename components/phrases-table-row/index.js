var React = require('react');
var dom = React.DOM;
var bevis = require('../../lib/bevis');
var Checkbox = require('../islands-lib/checkbox/islands');
var Input = require('../islands-lib/input/islands');

var db = require('just-debounce');
var phrasesActions = require('../../app/actions/phrases');

requireStatic('./index.styl');

module.exports = React.createClass({
    displayName: 'Phrases table row',
    getInitialState: function() {
        var phrase = this.props.phrase || {};

        return { checked: !!this.props.checked, price: phrase.price, state: phrase.state };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({ checked: !!newProps.checked });
        this.props.isHeader || this.setState({ price: newProps.phrase.price, state: newProps.phrase.state });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var isDirty = false;
        var nextPhrase = nextProps.phrase;

        if (this.props.isHeader) {
            if (this.state.checked !== nextProps.checked) isDirty = true;
        } else {
            if (this.state.checked !== nextProps.checked) isDirty = true;
            else if (this.state.price !== nextPhrase.price) isDirty = true;
            else if (this.state.state !== nextPhrase.state) isDirty = true;
        }

        return isDirty;
    },

    componentDidMount: function() {
        //console.log(this.getDOMNode().offsetHeight);
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
                        isHeader ? 'Цена клика' : Input(
                            { value: this.state.price, small: true, onChange: this._onPriceChange })
                    )
                ),
                dom.div({ className: 'phrases-table-row__left' },
                    dom.div({ className: 'phrases-table-row__checkbox'},
                        Checkbox({ checked: this.state.checked, onClick: this._onCheck })
                    ),
                    dom.div({ className: 'phrases-table-row__phrase'}, data.phrase)
                )
            )
        );
    },
    
    _onPriceChange: db(function(val) {
        phrasesActions.changePrice(this.props.phrase.id, val);
    }, 100),

    _onCheck: function(val) {
        this.props.isHeader ?
            phrasesActions.checkAll(val) :
            phrasesActions.check(this.props.phrase.id, val);
    }
});
