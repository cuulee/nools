'use strict';

const extd = require('../../extended');
const constraintMatcher = require('../../constraintMatcher');
const parser = require('../../parser');

function parseConstraintModifier(constraint) {
    if (constraint.length && extd.isString(constraint[0])) {
        const modifierMatch = constraint[0].match(' *(from)');
        if (modifierMatch) {
            const modifier = modifierMatch[0];
            if (modifier === 'from') {
                return `, "${constraint.shift()}"`;
            }
            throw new Error(`Unrecognized modifier ${modifier}`);
        }
    }
    return '';
}

function parseConstraintHash(constraint, identifiers) {
    if (!(constraint.length && extd.isHash(constraint[0]))) {
        return '';
    }
    const refs = constraint.shift();
    extd(refs).values().forEach((ident) => {
        if (identifiers.indexOf(ident) === -1) {
            identifiers.push(ident);
        }
    });
    return `,${JSON.stringify(refs)}`;
}
function formatConstraint(constraint, identifiers) {
    const ret = [];
    if (constraint[0] === 'not' || constraint[0] === 'exists') {
        ret.push(`"${constraint.shift()}", `);
    }
    identifiers.push(constraint[1]);
    ret.push(`${constraint[0]}, "${constraint[1].replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
    constraint.splice(0, 2);
    if (constraint.length) {
        // constraint
        const c = constraint.shift();
        if (extd.isString(c) && c) {
            ret.push(`,"${c.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
            constraintMatcher.getIdentifiers(parser.parseConstraint(c))
                .forEach(i => identifiers.push(i));
        } else {
            ret.push(',"true"');
            constraint.unshift(c);
        }
    }
    ret.push(parseConstraintModifier(constraint));
    ret.push(parseConstraintHash(constraint, identifiers));
    return `[${ret.join('')}]`;
}

function constraintsToJs(constraints, identifiers) {
    const constraint = constraints.slice(0);
    if (constraint[0] === 'or') {
        const prefix = constraint.shift();
        const innerConstraints = constraint.map(c => constraintsToJs(c, identifiers)).join(',');
        // return early since we parsed all inner constraints.
        return `["${prefix}", ${innerConstraints}]`;
    }
    return formatConstraint(constraint, identifiers);
}

module.exports = constraintsToJs;
