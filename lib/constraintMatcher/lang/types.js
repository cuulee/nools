'use strict';

function types(parser) {
    return {
        arguments(lhs, rhs) {
            const ret = [];
            if (lhs) {
                ret.push(parser(lhs));
            }
            if (rhs) {
                ret.push(parser(rhs));
            }
            return ret.join(',');
        },

        array(lhs) {
            let args = [];
            if (lhs) {
                args = parser(lhs);
                if (Array.isArray(args)) {
                    return args;
                }
                return ['[', args, ']'].join('');
            }
            return ['[', args.join(','), ']'].join('');
        },

        function(lhs, rhs) {
            const args = parser(rhs);
            return [parser(lhs), '(', args, ')'].join('');
        },
    };
}

module.exports = types;
