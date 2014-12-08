var React = require('react');
var dom = React.DOM;
var bevis = require('bevis')();

var Checkbox = require('../islands-lib/checkbox/islands');
var Input = require('../islands-lib/input/islands');

var db = require('just-debounce');
var phrasesActions = require('../../app/actions/phrases');

var EditPhrase = require('../phrase-edit-popup/simple.js');
var SpecEditPhrase = require('../phrase-edit-popup/spec.js');


require('./index.styl');

module.exports = React.createClass({
    displayName: 'Phrases table row',
    getInitialState: function() {
        var phrase = this.props.phrase || {};

        return {
            checked: !!this.props.checked,
            price: phrase.price,
            phrase: phrase.phrase,
            state: phrase.state,
            showEditPopup: false
        };
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
            else if (this.state.showEditPopup !== nextState.showEditPopup) isDirty = true;
            else if (this.state.phrase !== nextState.phrase) isDirty = true;
            else if (this.state.price !== nextPhrase.price) isDirty = true;
            else if (this.state.state !== nextPhrase.state) isDirty = true;
        }

        return isDirty;
    },

    render: function() {
        var isHeader = !!this.props.isHeader;
        var data = isHeader ?
            { phrase: 'Фразаы', state: 'Статус', click: 'Клики', ctr: 'CTR%' } :
            this.props.phrase;

        var isSpec = data.type === 'spec';
        var block = bevis.block('phrases-table-row', isHeader ? 'header' : '');

        return (
            dom.div({ className: block.name() },
                dom.div({ className: block.elem('right') },
                    dom.div({ className: block.elem('state') }, data.state),
                    dom.div({ className: block.elem('click') }, data.click),
                    dom.div({ className: block.elem('ctr') }, data.ctr),
                    dom.div({ className: block.elem('price') },
                        isHeader ? 'Цена клика' : Input(
                            { value: this.state.price, small: true, onChange: this._onPriceChange })
                    )
                ),
                dom.div({ className: block.elem('left') },
                    dom.div({ className: block.elem('checkbox') },
                        Checkbox({ checked: this.state.checked, onClick: this._onCheck })
                    ),
                    dom.div({ className: block.elem('phrase' + (isSpec ? '-spec' : '')), onClick: this._onPhraseClick }, data.phrase),
                    this.state.showEditPopup && this._getEditPopup(isSpec)
                )
            )
        );
    },

    _getEditPopup: function(isSpec) {
        return isSpec ?
            SpecEditPhrase({
                onClose: this._onEditClose,
                phraseId: this.props.phrase.id,
                phrase: this.state.phrase
            }) :
            EditPhrase({
                onClose: this._onEditClose,
                phraseId: this.props.phrase.id,
                phrase: this.state.phrase
            });



    },

    _onPriceChange: function(val) {
        phrasesActions.changePrice(this.props.phrase.id, val);
    },

    _onCheck: function(val) {
        this.props.isHeader ?
            phrasesActions.checkAll(val) :
            phrasesActions.check(this.props.phrase.id, val);
    },
    
    _onPhraseClick: function() {
        this.setState({ showEditPopup: true });
    },

    _onEditClose: function() {
        this.setState({ showEditPopup: false });
    }
});
