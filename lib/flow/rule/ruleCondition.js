'use strict';

const _ = require('lodash');
const parser = require('../../parser');
const patterns = require('../rule/patterns');

const TYPE_MAP = {
    string: String,
    date: Date,
    array: Array,
    boolean: Boolean,
    regexp: RegExp,
    number: Number,
    object: Object,
    hash: Object,
};
const FROM_REGEXP = /^from +/;

function lookupParamType(type) {
    const normalizedType = type.toLowerCase();
    if (normalizedType in TYPE_MAP) {
        return TYPE_MAP[normalizedType];
    }
    throw new Error(`Unknown param type '${type}' expected ${JSON.stringify(Object.keys(TYPE_MAP))}`);
}

function isExtra(extra) {
    return _.isString(extra) && FROM_REGEXP.test(extra);
}

function parseExtra(extra) {
    if (!extra) {
        return null;
    }
    if (FROM_REGEXP.test(extra)) {
        return {from: extra.replace(FROM_REGEXP, '').trim()};
    }
    throw new Error(`invalid rule constraint option ${extra}`);
}

/**
 * Parses the param type from a type
 * @param {String|Function|[]} type the type to parse
 * @param scope the scope to look up the type in
 * @return {Function} the constructor of the type.
 */
function parseParamType(type, scope) {
    const normalizeScope = scope || {};
    if (_.isString(type)) {
        return normalizeScope[type] || lookupParamType(type);
    } else if (_.isFunction(type)) {
        return type;
    } else if (Array.isArray(type) && type.length === 0) {
        return Array;
    }
    throw new Error(`invalid param type ${type}`);
}

class RuleCondition {

    /**
     * Container class for describing rule conditions. This class is the result
     * of parsing the arrays passed into a rule.
     *
     * @param {Object|String|Function} type the fact type.
     * @param {String} alias the alias of the fact used in the cosntraint
     * @param {String} constraint the constraint defaults to 'true'
     * @param {Object} store the store used to store variables in later RuleConditions
     * @param {Object|null} from the from constraint describing where this fact type comes from.
     * @param {Object} scope the scope fo this rule condition to the constraint can reference
     * defined types and externally defined functions or variables.
     */
    constructor(type, alias, constraint, store, from, scope) {
        this.type = parseParamType(type, scope);
        this.alias = alias;
        this.constraint = constraint || 'true';
        this.store = store || {};
        this.from = from || {};
        this.parsedFromConstraint = null;
        this.scope = scope;
        this.parsedConstraint = parser.constraint.parseConstraintSource(this.constraint);
        if (this.from.from) {
            this.parsedFromConstraint = parser.constraint.parseConstraintSource(this.from.from);
        }
    }

    /**
     * @return {boolean} true if this RuleCondition is constains a from clause.
     */
    get isFromCondition() {
        return !!this.parsedFromConstraint;
    }

    toPattern(modifier) {
        if (this.isFromCondition) {
            if (modifier === 'not') {
                return patterns.FromNotPattern.fromRuleCondition(this);
            } else if (modifier === 'exists') {
                return patterns.FromExistsPattern.fromRuleCondition(this);
            }
            return patterns.FromPattern.fromRuleCondition(this);
        }
        if (modifier === 'not') {
            return patterns.NotPattern.fromRuleCondition(this);
        } else if (modifier === 'exists') {
            return patterns.ExistsPattern.fromRuleCondition(this);
        }
        return patterns.ObjectPattern.fromRuleCondition(this);
    }

    /**
     * Creates a RuleCondition from an array.
     *
     * @param {Array} condition the condition to convert to a RuleCondition
     * @param {Object} scope the scope for the rule condition
     * @return {RuleCondition}
     */
    static fromConditionArray(condition, scope) {
        const length = condition.length;
        if (length === 1 || length > 5) {
            throw new Error(`invalid rule condition ${JSON.stringify(condition)}`);
        }
        const type = condition[0];
        const alias = condition[1];
        let constraint = condition[2] || 'true';
        let store = condition[3];
        let from = condition[4];
        // handle case where c[2] is a hash rather than a condition string
        if (isExtra(constraint)) {
            // if extra is a string and it starts with 'from ' then add true as a default
            from = parseExtra(constraint);
            constraint = 'true';
        } else if (_.isPlainObject(constraint)) {
            from = store;
            store = constraint;
            constraint = 'true';
            if (isExtra(from)) {
                from = parseExtra(from);
            }
        } else if (isExtra(store)) {
            from = parseExtra(store);
            store = null;
        } else if (isExtra(from)) {
            from = parseExtra(from);
        } else if (from) {
            throw new Error(`Invalid condition expected a from clause found [${from}] [condition=${JSON.stringify(condition)}]`);
        }
        return new RuleCondition(type, alias, constraint, store, from, scope);
    }

}

module.exports = RuleCondition;
