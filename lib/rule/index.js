'use strict';

const extd = require('../extended');
const PatternTree = require('./patternTree');

class Rule {
    constructor(name, options, pattern, cb) {
        this.name = name;
        this.pattern = pattern;
        this.cb = cb;
        if (options.agendaGroup) {
            this.agendaGroup = options.agendaGroup;
            this.autoFocus = extd.isBoolean(options.autoFocus) ? options.autoFocus : false;
        }
        this.priority = options.priority || options.salience || 0;
    }

    fire(flow, match) {
        return new Promise((resolve, reject) => {
            const cb = this.cb;
            try {
                if (cb.length === 3) {
                    cb(match.factHash, flow, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results);
                    });
                } else {
                    const result = cb(match.factHash, flow);
                    if (result && result.then) {
                        return result.then(resolve, reject);
                    }
                    return resolve(result);
                }
            } catch (e) {
                reject(e);
            }
            return null;
        });
    }

    static createRules(name, options, conditions, cb) {
        let ruleOptions = options;
        let ruleConditions = conditions;
        let ruleCb = cb;
        if (Array.isArray(ruleOptions)) {
            ruleCb = ruleConditions;
            ruleConditions = ruleOptions;
        } else {
            ruleOptions = ruleOptions || {};
        }
        const scope = ruleOptions.scope || {};
        if (!ruleConditions.every(cond => Array.isArray(cond))) {
            ruleConditions = [ruleConditions];
        }
        return PatternTree.fromRuleConditions(ruleConditions, scope).toCompositePatterns()
            .map((pattern) => {
                return new Rule(name, ruleOptions, pattern, ruleCb);
            });
    }
}

module.exports = Rule;
