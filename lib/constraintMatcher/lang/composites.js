'use strict';

function composites(parser) {
    return {
        composite(lhs) {
            return parser(lhs);
        },

        and(lhs, rhs) {
            return ['(', parser(lhs), '&&', parser(rhs), ')'].join(' ');
        },

        or(lhs, rhs) {
            return ['(', parser(lhs), '||', parser(rhs), ')'].join(' ');
        },
    };
}

module.exports = composites;