'use strict';

const extd = require('../extended');
const RuleCondition = require('./ruleCondition');

const MODIFIERS = ['or', 'not', 'exists'];

/**
 * Parses raw rule conditions [MyFact, 'm'] into a pattern
 * @param condition the condition to parse
 * @param scope the scope of the condition
 * @return {Pattern}
 */
function parse(condition, scope) {
    if (typeof condition === 'function') {
        return [condition];
    }
    if (extd.isString(condition[0]) && MODIFIERS.indexOf(condition[0]) !== -1) {
        const modifier = condition[0];
        const normalizedCondition = condition.slice(1);
        if (modifier === 'or') {
            const parsedPatterns = normalizedCondition.map(cond => parse(cond, scope));
            return parsedPatterns.reduce((allPatterns, patterns) => {
                return allPatterns.concat(patterns);
            }, []);
        } else if (modifier === 'not' || modifier === 'exists') {
            const ruleCondition = RuleCondition.fromConditionArray(normalizedCondition, scope);
            return [ruleCondition.toPattern(modifier)];
        }
        throw new Error(`Unknown modifier ${modifier} in rule [condition=${condition}]`);
    }

    return [RuleCondition.fromConditionArray(condition, scope).toPattern()];
}

module.exports = {
    parse,
};
