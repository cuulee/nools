'use strict';

const Flow = require('./flow');

const flows = {};

function getFlow(name) {
    return flows[name];
}

function hasFlow(name) {
    return name in flows;
}

function deleteFlow(name) {
    const flowName = name instanceof Flow ? name.name : name;
    delete flows[flowName];
}

function deleteFlows() {
    Object.keys(flows).forEach(name => delete flows[name]);
}

function create(name, cb) {
    if (hasFlow(name)) {
        throw new Error(`Flow with ${name} already defined`);
    }
    const flow = new Flow(name, cb);
    flows[name] = flow;
    return flow;
}

module.exports = {
    getFlow,
    hasFlow,
    deleteFlow,
    deleteFlows,
    create,
};
module.exports.Flow = Flow;
