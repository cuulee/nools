'use strict';

const pPush = Array.prototype.push;

const EMPTY_ARRAY = [];

let NOT_POSSIBLES_HASH = {};
let POSSIBLES_HASH = {};
let NOT_POSSIBLE_LENGTH = 0;
let POSSIBLE_LENGTH = 0;

function mergePossibleTuples(ret, a, l) {
    if (POSSIBLE_LENGTH < l) {
        let j = 0;
        let i = 0;
        while (POSSIBLE_LENGTH && i < l) {
            const val = a[i];
            if (POSSIBLES_HASH[val.hashCode]) {
                ret[j] = val;
                j += 1;
                POSSIBLE_LENGTH -= 1;
            }
            i += 1;
        }
    } else {
        pPush.apply(ret, a);
    }
    POSSIBLE_LENGTH = 0;
    POSSIBLES_HASH = {};
}


function mergeNotPossibleTuples(ret, a, l) {
    if (NOT_POSSIBLE_LENGTH < l) {
        let j = 0;
        let i = 0;
        while (i < l) {
            const val = a[i];
            if (!NOT_POSSIBLE_LENGTH) {
                ret[j] = val;
                j += 1;
            } else if (!NOT_POSSIBLES_HASH[val.hashCode]) {
                ret[j] = val;
                j += 1;
            } else {
                NOT_POSSIBLE_LENGTH -= 1;
            }
            i += 1;
        }
    }
    NOT_POSSIBLE_LENGTH = 0;
    NOT_POSSIBLES_HASH = {};
}

function mergeNotPossibles(tuples, tl) {
    if (tl) {
        let i = 0;
        while (i < tl) {
            const hashCode = tuples[i].hashCode;
            if (!NOT_POSSIBLES_HASH[hashCode]) {
                NOT_POSSIBLES_HASH[hashCode] = true;
                NOT_POSSIBLE_LENGTH += 1;
            }
            i += 1;
        }
    }
}

function mergeBothTuples(ret, a, l) {
    if (POSSIBLE_LENGTH === l) {
        mergeNotPossibles(ret, a, l);
    } else if (NOT_POSSIBLE_LENGTH < l) {
        let i = 0;
        let j = 0;
        while (i < l) {
            const val = a[i];
            const hashCode = val.hashCode;
            if (!NOT_POSSIBLES_HASH[hashCode] && POSSIBLES_HASH[hashCode]) {
                ret[j] = val;
                j += 1;
            }
            i += 1;
        }
    }
    NOT_POSSIBLE_LENGTH = 0;
    NOT_POSSIBLES_HASH = {};
    POSSIBLE_LENGTH = 0;
    POSSIBLES_HASH = {};
}

function mergePossiblesAndNotPossibles(a, l) {
    let ret = EMPTY_ARRAY;
    if (l) {
        if (NOT_POSSIBLE_LENGTH || POSSIBLE_LENGTH) {
            ret = [];
            if (!NOT_POSSIBLE_LENGTH) {
                mergePossibleTuples(ret, a, l);
            } else if (!POSSIBLE_LENGTH) {
                mergeNotPossibleTuples(ret, a, l);
            } else {
                mergeBothTuples(ret, a, l);
            }
        } else {
            ret = a;
        }
    }
    return ret;
}

function getRangeTuples(op, currEntry, val) {
    let ret;
    if (op === 'gt') {
        ret = currEntry.findGT(val);
    } else if (op === 'gte') {
        ret = currEntry.findGTE(val);
    } else if (op === 'lt') {
        ret = currEntry.findLT(val);
    } else if (op === 'lte') {
        ret = currEntry.findLTE(val);
    }
    return ret;
}


function mergePossibles(tuples, tl) {
    if (tl) {
        let i = 0;
        while (i < tl) {
            const hashCode = tuples[i].hashCode;
            if (!POSSIBLES_HASH[hashCode]) {
                POSSIBLES_HASH[hashCode] = true;
                POSSIBLE_LENGTH += 1;
            }
            i += 1;
        }
    }
}

function getMemory(entry, factHash, indexes) {
    const l = indexes.length;


    let ret = entry.tuples;
    let rl = ret.length;
    let tables = entry.tables;
    let intersected = false;
    let i = 0;
    while (i < l && rl) {
        const index = indexes[i];
        const val = index[3](factHash);
        const op = index[4];
        const currEntry = tables[index[0]];
        if (op === 'eq' || op === 'seq') {
            const nextEntry = currEntry.get(val);
            if (nextEntry) {
                ret = nextEntry.tuples;
                rl = ret.length;
                tables = nextEntry.tables;
            } else {
                ret = EMPTY_ARRAY;
                rl = ret.length;
            }
        } else if (op === 'neq' || op === 'sneq') {
            const nextEntry = currEntry.get(val);
            if (nextEntry) {
                const tuples = nextEntry.tuples;
                const tl = tuples.length;
                mergeNotPossibles(tuples, tl);
            }
        } else if (!intersected) {
            rl = (ret = getRangeTuples(op, currEntry, val)).length;
            intersected = true;
        } else {
            const tuples = getRangeTuples(op, currEntry, val);
            const tl = tuples.length;
            if (tl) {
                mergePossibles(tuples, tl);
            } else {
                ret = tuples;
                rl = tl;
            }
        }
        i += 1;
    }
    return mergePossiblesAndNotPossibles(ret, rl);
}

module.exports = {
    getMemory,
};
