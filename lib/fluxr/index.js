var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('eventemitter3');
var createObject = require('../specr').create;
var invariant = require('../inv');

var GlobalDispatcher = new Dispatcher();

exports.StoreInterface = function StoreInterface(spec) {
    spec = spec || {};

    var isInited = false;
    var handlers = {};
    var chan = new EventEmitter();

    var dispatchToken = GlobalDispatcher.register(function(payload) {
        var fn = handlers[payload.actionType];

        fn && fn(payload);
    });

    var proto = {
        dispatchToken: dispatchToken,

        addChangeListener: function addChangeListener(fn, ctx) {
            chan.on('change', fn, ctx);

            return this.removeChangeListener.bind(fn);
        },

        removeChangeListener: function removeChangeListener(fn) {
            chan.off('change', fn);
        },

        emitChange: function emitChange() {
            chan.emit('change');
        },

        init: function init() {
            !isInited &&
                this.addListeners &&
                this.addListeners.call(
                    this,
                    function(actionType, handler) { handlers[actionType] = handler.bind(this); }.bind(this),
                    GlobalDispatcher.waitFor.bind(GlobalDispatcher));

            isInited = true;
        },

        destruct: function destruct() {
            GlobalDispatcher.unregister(this.dispatchToken);
            isInited = false;
        }
    };

    spec.mixins = [proto].concat(spec.mixins || []);

    return new (createObject(spec, { init: 'DEFINE_MANY', destruct: 'DEFINE_MANY' }));
};

exports.actionInterface = function actionInterface(spec) {
    var proto = {

        getOptions: function() {
            return {
                maxRetries: 10,
                timeout: 0
            };
        },

        dispatch: function dispatch(actionType, payload, loopGuard) {
            invariant(
                this.displayName,
                'You are attempting to dispatch %s from action without displayName',
                actionType);

            var options = this.getOptions();

            payload = payload || {};

            loopGuard = loopGuard || 0;

            payload.actionType = actionType;
            payload.source = this.displayName;

            if (GlobalDispatcher.isDispatching()) {
                if (loopGuard > options.maxRetries)
                    throw new Error('Can`t dispatch %s action from %s', actionType, this.displayName);

                setTimeout(function() {
                    dispatch.call(this, actionType, payload, ++loopGuard);
                }.bind(this), options.timeout);

            } else {
                GlobalDispatcher.dispatch(payload);
            }
        }
    };

    spec.mixins = [proto].concat(spec.mixins || []);

    return new (createObject(spec, { getOptions: 'DEFINE_MANY_MERGED' }));
};
