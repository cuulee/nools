'use strict';

const matcher = require('./matcher');

module.exports = {
    get fromConstraints() {
        /* eslint global-require: 0 */
        // this is lazy to prevent recursive requires
        return require('./fromConstraints');
    },
    createMatcher: matcher.createMatcher,
    createSourceMatcher: matcher.createSourceMatcher,
    createMatcherFunction: matcher.createMatcherFunction,
};
