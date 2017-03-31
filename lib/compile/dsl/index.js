'use strict';

const extd = require('../../extended');
const common = require('../common');
const parseRule = require('./parseRule');

const DEFAULT_DEFINED = {Array, String, Number, Boolean, RegExp, Date, Object};

function createDefined(flow, flowDefinition, options, scope) {
    const defined = Object.assign({}, DEFAULT_DEFINED, options.define || {});
    if (typeof Buffer !== 'undefined') {
        defined.Buffer = Buffer;
    }
    // add any defined classes in the parsed flowObj to defined
    flowDefinition.define.forEach((d) => {
        defined[d.name] = common.createDefined(d, defined, scope);
    });
    // expose any defined classes to the flow.
    Object.keys(defined).forEach(name => flow.addDefined(name, defined[name]));
    return defined;
}

function assignScopeNames(flowObj, options) {
    const scope = Object.assign({console}, options.scope);
    // add the anything added to the scope as a property
    flowObj.scope.forEach((s) => {
        scope[s.name] = true;
    });
    return scope;
}


function compile(flowDefinition, options, cb, Container) {
    let opts = options;
    let callback = cb;
    if (extd.isFunction(opts)) {
        callback = opts;
        opts = {};
    } else {
        opts = options || {};
    }
    const name = flowDefinition.name || opts.name;
    // if !name throw an error
    if (!name) {
        throw new Error('Name must be present in JSON or options');
    }
    const flow = new Container(name);
    const scope = assignScopeNames(flowDefinition, opts);
    const defined = createDefined(flow, flowDefinition, opts, scope);
    const scopeNames = extd(flowDefinition.scope).pluck('name').union(extd(scope).keys().value()).value();
    const definedNames = Object.keys(defined);
    flowDefinition.scope.forEach((s) => {
        scope[s.name] = common.createFunction(s.body, defined, scope, scopeNames, definedNames);
    });
    flowDefinition.rules.forEach((rule) => {
        flow.__rules = flow.__rules.concat(parseRule(rule, defined, scope));
    });
    if (callback) {
        callback(flow);
    }
    return flow;
}

module.exports = compile;
