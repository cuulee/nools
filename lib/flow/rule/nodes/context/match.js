'use strict';

const pPush = Array.prototype.push;


class Match {
    constructor() {
        this.isMatch = true;
        this.hashCode = '';
        this.facts = [];
        this.factIds = [];
        this.factHash = {};
        this.recency = [];
        this.aliases = [];
    }

    addFact(assertable) {
        pPush.call(this.facts, assertable);
        pPush.call(this.recency, assertable.recency);
        pPush.call(this.factIds, assertable.id);
        this.hashCode = this.factIds.join(':');
        return this;
    }

    merge(mr) {
        const ret = new Match();
        ret.isMatch = mr.isMatch;
        pPush.apply(ret.facts, this.facts);
        pPush.apply(ret.facts, mr.facts);
        pPush.apply(ret.aliases, this.aliases);
        pPush.apply(ret.aliases, mr.aliases);
        ret.hashCode = `${this.hashCode}:${mr.hashCode}`;
        Match.mergeWithAliases(ret.factHash, this.factHash, this.aliases);
        Match.mergeWithAliases(ret.factHash, mr.factHash, mr.aliases);
        Match.unionRecency(ret.recency, this.recency, mr.recency);
        return ret;
    }

    static unionRecency(arr, arr1, arr2) {
        pPush.apply(arr, arr1);
        let i = 0;
        let j = arr.length;
        const l = arr2.length;
        while (i < l) {
            const val = arr2[i];
            if (arr.indexOf(val) === -1) {
                arr[j] = val;
                j += 1;
            }
            i += 1;
        }
    }

    static mergeWithAliases(h1, h2, aliases) {
        const l = aliases.length;
        let i = 0;
        while (i < l) {
            const alias = aliases[i];
            h1[alias] = h2[alias];
            i += 1;
        }
    }
}

module.exports = Match;
