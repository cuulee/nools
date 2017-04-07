'use strict';

const strategies = require('./strategies');

function createStrategy(strategyNames) {
    const strategiesToUse = strategyNames.map((s) => {
        return strategies[s];
    });
    const strategiesToUseLength = strategiesToUse.length;

    return (a, b) => {
        let i = 0;
        let ret = 0;
        const equal = (a === b) || (a.name === b.name && a.hashCode === b.hashCode);
        if (!equal) {
            while (i < strategiesToUseLength && !ret) {
                ret = strategiesToUse[i](a, b);
                i += 1;
            }
            ret = ret > 0 ? 1 : -1;
        }
        return ret;
    };
}

exports.createStrategy = createStrategy;
exports.strategies = strategies;
