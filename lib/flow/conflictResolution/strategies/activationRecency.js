'use strict';

function activationRecency(a, b) {
    return a.recency - b.recency;
}

module.exports = activationRecency;
