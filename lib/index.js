/**
 *
 * @projectName nools
 * @github https://github.com/C2FO/nools
 * @includeDoc [Examples] ../docs-md/examples.md
 * @includeDoc [Change Log] ../history.md
 * @header [../readme.md]
 */

'use strict';

const extd = require('./extended');
const fs = require('fs');
const path = require('path');
const compiler = require('./compile');
const parser = require('./parser');
const flow = require('./flow');

function isNoolsFile(file) {
    return (/\.nools$/).test(file);
}

function parse(source) {
    if (isNoolsFile(source)) {
        return parser.parseRuleSet(fs.readFileSync(source, 'utf8'), source);
    }
    return parser.parseRuleSet(source);
}

function deleteFlow(name) {
    flow.deleteFlow(name);
    return this;
}

function deleteFlows() {
    flow.deleteFlows();
    return this;
}

function compile(file, options, cb) {
    let opts = options;
    let compileCb = cb;
    if (extd.isFunction(opts)) {
        compileCb = opts;
        opts = {};
    } else {
        opts = options || {};
    }
    let parsed = file;
    if (extd.isString(file)) {
        if (!('name' in opts) || isNoolsFile(file)) {
            opts.name = path.basename(file, path.extname(file));
        }
        parsed = parse(file);
    }
    if (!opts.name) {
        throw new Error('Name required when compiling nools source');
    }
    return compiler.compile(parsed, opts, compileCb, flow.Flow);
}

function transpile(file, options) {
    const opts = options || {};
    let parsed = file;
    if (extd.isString(file)) {
        if (!('name' in opts) || isNoolsFile(file)) {
            opts.name = path.basename(file, path.extname(file));
        }
        parsed = parse(file);
    }
    return compiler.transpile(parsed, opts);
}

module.exports = {
    deleteFlow,
    deleteFlows,
    compile,
    transpile,
    parse,
    flow: flow.create,
    getFlow: flow.getFlow,
    hasFlow: flow.hasFlow,
    Flow: flow.Flow,
};
