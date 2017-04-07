'use strict';

const patternParser = require('./patternParser');
const CompositePattern = require('../patterns').CompositePattern;

class PatternTree {
    constructor() {
        this.branches = [];
    }

    addPattern(pattern, branchNumber) {
        this.initializeBranch(branchNumber);
        this.branches.slice(branchNumber).forEach(branch => branch.push(pattern));
    }

    addPatterns(patterns) {
        patterns.forEach((pattern, branchNumber) => this.addPattern(pattern, branchNumber));
        return this;
    }

    initializeBranch(branchNumber) {
        let branch = this.branches[branchNumber];
        if (!branch) {
            if (branchNumber === 0) {
                branch = [];
                this.branches[branchNumber] = branch;
            } else {
                branch = this.branches[branchNumber - 1].slice(0, -1);
                this.branches[branchNumber] = branch;
            }
        }
    }

    toCompositePatterns() {
        return this.branches.map(branch => CompositePattern.fromPatterns(branch));
    }

    static fromRuleConditions(conditions, scope) {
        return conditions
            .map(condition => patternParser.parse(condition, scope))
            .reduce((patternTree, patterns) => patternTree.addPatterns(patterns), new this());
    }
}

module.exports = PatternTree;
