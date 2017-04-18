'use strict';

const _ = require('lodash');
const parser = require('../../parser');
const Rule = require('../../flow/rule');
const parseAction = require('./parseAction');

function resolveRule(rule, identifiers, conditions, defined, name) {
    const condition = [];
    const definedClass = rule[0];
    const alias = rule[1];
    let constraint = rule[2];
    let refs = rule[3];
    if (_.isPlainObject(constraint)) {
        refs = constraint;
        constraint = null;
    }
    if (definedClass && definedClass in defined) {
        condition.push(defined[definedClass]);
    } else {
        throw new Error(`Invalid class ${rule[0]} for rule ${name}`);
    }
    condition.push(alias, constraint, refs);
    conditions.push(condition);
    identifiers.push(alias);
    if (constraint) {
        const parsed = parser.constraint.parseConstraintSource(constraint);
        parser.constraint.getIdentifiers(parsed).forEach((i) => {
            identifiers.push(i);
        });
    }
    if (_.isObject(refs)) {
        Object.keys(refs).forEach((key) => {
            const ident = refs[key];
            if (identifiers.indexOf(ident) === -1) {
                identifiers.push(ident);
            }
        });
    }
}

function parseRule(rule, conditions, identifiers, defined, name) {
    if (rule.length) {
        const r0 = rule[0];
        if (r0 === 'not' || r0 === 'exists') {
            const temp = [];
            rule.shift();
            resolveRule(rule, identifiers, temp, defined, name);
            const cond = temp[0];
            cond.unshift(r0);
            conditions.push(cond);
        } else if (r0 === 'or') {
            const conds = [r0];
            rule.shift();
            rule.forEach((cond) => {
                parseRule(cond, conds, identifiers, defined, name);
            });
            conditions.push(conds);
        } else {
            resolveRule(rule, identifiers, conditions, defined, name);
        }
    }
}

function createRuleFromObject(obj, defined, scope) {
    const name = obj.name;
    if (_.isEmpty(obj)) {
        throw new Error('Rule is empty');
    }
    const options = obj.options || {};
    options.scope = scope;
    let constraints = obj.constraints || [];
    if (!constraints.length) {
        constraints = ['true'];
    }
    const action = obj.action;
    if (_.isUndefined(action)) {
        throw new Error(`No action was defined for rule ${name}`);
    }
    const conditions = [];
    const identifiers = [];
    constraints.forEach(rule => parseRule(rule, conditions, identifiers, defined, name));
    const parsedAction = parseAction(action, identifiers, defined, scope);
    return Rule.createRules(name, options, conditions, parsedAction);
}

module.exports = createRuleFromObject;
