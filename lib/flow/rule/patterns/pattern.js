'use strict';

let id = 0;
class Pattern {
    constructor() {
        this.id = id;
        id += 1;
    }

    static fromRuleCondition() {
        throw new Error(`fromRuleCondition not implemented for ${this.name}`);
    }
}

module.exports = Pattern;
