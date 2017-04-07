'use strict';

const Match = require('./match');
const extd = require('../../../../extended');

class Context {
    constructor(fact, paths, mr) {
        this.fact = fact;
        const match = mr || new Match().addFact(fact)
        this.match = match;
        this.factHash = match.factHash;
        this.aliases = match.aliases;
        this.hashCode = match.hashCode;
        if (paths) {
            this.paths = paths;
            this.pathsHash = Context.createContextHash(paths, this.hashCode);
        } else {
            this.paths = null;
            this.pathsHash = this.hashCode;
        }
    }

    set(key, value) {
        this.factHash[key] = value;
        this.aliases.push(key);
        return this;
    }

    isMatch(isMatch) {
        if (extd.isBoolean(isMatch)) {
            this.match.isMatch = isMatch;
        } else {
            return this.match.isMatch;
        }
        return this;
    }

    mergeMatch(matchToMerge) {
        const match = this.match.merge(matchToMerge);
        this.match = match;
        this.factHash = match.factHash;
        this.hashCode = match.hashCode;
        this.aliases = match.aliases;
        return this;
    }

    clone(fact, paths, match) {
        return new Context(fact || this.fact, paths, match || this.match);
    }

    static createContextHash(paths, hashCode) {
        const ids = paths.map(path => path.id);
        ids.push(hashCode);
        return ids.join(':');
    }
}

module.exports = Context;

