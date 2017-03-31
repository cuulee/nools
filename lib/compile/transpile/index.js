'use strict';

const definedToJs = require('./definedToJs');
const ruleToJs = require('./ruleToJs');
const scopeToJs = require('./scopeToJs');

const DEFAULT_DEFINED = {Array, String, Number, Boolean, RegExp, Date, Object};

function transpile(flowObj, options) {
    const opts = options || {};
    const defined = Object.assign({}, DEFAULT_DEFINED, opts.define || {});
    if (typeof Buffer !== 'undefined') {
        defined.Buffer = Buffer;
    }
    const scope = Object.assign({console}, opts.scope);
    const definedFragment = (flowObj.define || []).map(def => definedToJs(def, defined)).join('\n');
    const scopeFragment = (flowObj.scope || []).map(s => scopeToJs(s, scope)).join('\n');
    const rulesFragment = (flowObj.rules || []).map(r => ruleToJs(r, defined, scope)).join('');
    return `(function(){
        return function(options){
            options = options || {};
            function bind(scope, fn){
                return function(){
                    return fn.apply(scope, arguments);
                };
            };
            var defined = {
                Array: Array, 
                String: String, 
                Number: Number, 
                Boolean: Boolean, 
                RegExp: RegExp, 
                Date: Date, 
                Object: Object
            };
            var scope = options.scope || {};
            var optDefined = options.defined || {}; 
            for(var i in optDefined){
                defined[i] = optDefined[i];
            }
            return nools.flow('${opts.name}', function(builder){
                ${definedFragment}
                ${scopeFragment}
                scope.console = console;
                ${rulesFragment}
            });
        };
    }());`;
}

module.exports = transpile;
