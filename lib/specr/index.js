var invariant = require('../inv');
var toStr = Object.prototype.toString;

var SpecPolice = {
    'DEFINE_ONCE': function(protoProp, specProp, hasKey, key) {
        invariant(!hasKey, 'You are attempting to define %s on your object more than once', key);

        return specProp;
    },

    'DEFINE_MANY': function(protoProp, specProp, hasKey, key) {
        var isUndefined = protoProp === undefined;

        invariant(
            typeof protoProp === 'function' || isUndefined,
            'Prototype property %s conflict with spec police, it`s must be a function',
            key);

        invariant(
            typeof specProp ==='function',
            'You are attempting to define %s as not function',
            key);

        return isUndefined ? specProp : createChainedFunction(protoProp, specProp, key);
    },

    'DEFINE_MANY_MERGED': function(protoProp, specProp, hasKey, key) {
        var isUndefined = protoProp === undefined;

        invariant(
            typeof protoProp === 'function' || isUndefined,
            'Prototype property %s conflict with police, it`s must be a function',
            key);

        invariant(
            typeof specProp ==='function',
            'You are attempting to define %s as not function',
            key);

        return isUndefined ? specProp : createMergedResultFunction(protoProp, specProp, hasKey, key);
    },

    'OVERRIDE': function(_, specProp) {
        return specProp;
    }
};

function createChainedFunction(one, two, name) {
    return (new Function('one', 'two', 'return function ' + (name || '') +
        '(){ one && one.apply(this, arguments); two.apply(this, arguments); };'))(one, two);
}

function createMergedResultFunction(one, two, name) {
    function mergeResults(a, b) {
        a = a || {};

        Object.keys(b || {}).forEach(function(key) {
            a[key] = b[key]
        });

        return a;
    }

    return (new Function('one', 'two', 'merge', 'return function ' + (name || '') +
        '(){ return merge(one.apply(this, arguments), two.apply(this, arguments)); };'))(one, two, mergeResults);
}

function extendProtoBySpec(proto, spec, specPolice) {
    specPolice = specPolice || {};

    var mixins = spec.mixins;

    if (mixins) {
        invariant(toStr.call(mixins) === '[object Array]', 'mixins property of spec must be an array');

        mixins.forEach(function(mixSpec) {
            extendProtoBySpec(proto, mixSpec, specPolice);
        });
    }

    Object.keys(spec || {}).forEach(function(key) {
        if (key !== 'mixins') {
            var police = SpecPolice[specPolice[key] || 'DEFINE_ONCE'];

            invariant(
                police,
                'You are attempting to define wrong %s police',
                specPolice[key]);

            proto[key] = police(proto[key], spec[key], proto.hasOwnProperty(key), key);
        }
    }, this);
}

function createObjectBySpec(spec, specPolice) {
    var proto = {};

    extendProtoBySpec(proto, spec, specPolice);

    var Obj = (new Function('return function ' + (proto.displayName || '') + '(){};'))();

    Obj.prototype = Object.create(proto);

    return Obj;
}

exports.extend = extendProtoBySpec;
exports.create = createObjectBySpec;
