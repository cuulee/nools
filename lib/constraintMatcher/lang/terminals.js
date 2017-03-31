'use strict';

function terminals() {
    return {
        string(lhs) {
            return `'${lhs}'`;
        },

        number(lhs) {
            return lhs;
        },

        boolean(lhs) {
            return lhs;
        },

        regexp(lhs) {
            return lhs;
        },

        identifier(lhs) {
            return lhs;
        },

        null() {
            return 'null';
        },
    };
}

module.exports = terminals;
