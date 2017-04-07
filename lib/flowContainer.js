"use strict";
var extd = require("./extended"),
    instanceOf = extd.instanceOf,
    forEach = extd.forEach,
    declare = extd.declare,
    InitialFact = require("./patterns").InitialFact,
    conflictResolution = require("./conflictResolution"),
    Rule = require("./rule"),
    Flow = require("./flow");

const conflictResolutionStrategy = conflictResolution.createStrategy(["salience", "activationRecency"]);

var flows = {};
var FlowContainer = declare({

    instance: {

        constructor: function (name, cb) {
            this.name = name;
            this.cb = cb;
            this.__rules = [];
            this.__defined = {};
            this.conflictResolutionStrategy = conflictResolutionStrategy;
            if (cb) {
                cb.call(this, this);
            }
            if (!flows.hasOwnProperty(name)) {
                flows[name] = this;
            } else {
                throw new Error("Flow with " + name + " already defined");
            }
        },

        conflictResolution: function (strategies) {
            this.conflictResolutionStrategy = conflictResolution.createStrategy(strategies);
            return this;
        },

        getDefined: function (name) {
            var ret = this.__defined[name.toLowerCase()];
            if (!ret) {
                throw new Error(name + " flow class is not defined");
            }
            return ret;
        },

        addDefined: function (name, cls) {
            //normalize
            this.__defined[name.toLowerCase()] = cls;
            return cls;
        },

        rule: function (name, options, conditions, cb) {
            this.__rules = this.__rules.concat(Rule.createRules(name, options, conditions, cb));
            return this;
        },

        getSession: function () {
            var flow = new Flow(this.name, this.conflictResolutionStrategy);
            forEach(this.__rules, function (rule) {
                flow.rule(rule);
            });
            flow.assert(new InitialFact());
            for (var i = 0, l = arguments.length; i < l; i++) {
                flow.assert(arguments[i]);
            }
            return flow;
        },

        containsRule: function (name) {
            return extd.some(this.__rules, function (rule) {
                return rule.name === name;
            });
        }

    },

    "static": {
        getFlow: function (name) {
            return flows[name];
        },

        hasFlow: function (name) {
            return extd.has(flows, name);
        },

        deleteFlow: function (name) {
            if (instanceOf(name, FlowContainer)) {
                name = name.name;
            }
            delete flows[name];
            return FlowContainer;
        },

        deleteFlows: function () {
            for (var name in flows) {
                if (name in flows) {
                    delete flows[name];
                }
            }
            return FlowContainer;
        },

        create: function (name, cb) {
            return new FlowContainer(name, cb);
        }
    }

}).as(module);