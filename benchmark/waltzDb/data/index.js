'use strict';

const utils = require('../../utils');


function load(flow) {
    const files = utils.parseDataFiles(__dirname);
    return utils.createFacts(files, /\^/, (type, parts) => {
        const Cls = flow.getDefined(type.replace(/^make\s/, '').trim());
        const args = {};
        parts.forEach((p) => {
            const prop = p.trim().replace(/\)$/, '').split(/\s+/);
            const name = prop[0].trim();
            const value = prop[1].trim();
            if (name.match(/p1|p2/) !== null) {
                args[name] = parseInt(value, 10);
            } else {
                args[name] = value;
            }
        });
        return new Cls(args);
    });
}


module.exports = {
    load,
};
