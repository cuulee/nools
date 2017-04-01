'use strict';

function factRecency(a, b) {
    let i = 0;
    const aMatchRecency = a.match.recency;
    const bMatchRecency = b.match.recency;
    const aLength = aMatchRecency.length - 1;
    const bLength = bMatchRecency.length - 1;
    while (i < aLength && i < bLength) {
        if (aMatchRecency[i] !== bMatchRecency[i]) {
            break;
        }
        i += 1;
    }
    let ret = aMatchRecency[i] - bMatchRecency[i];
    if (!ret) {
        ret = aLength - bLength;
    }
    return ret;
}

module.exports = factRecency;
