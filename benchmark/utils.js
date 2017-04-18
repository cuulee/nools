'use strict';

const fs = require('fs');
const path = require('path');

const FILE_REG = /(.*)\.dat$/;

function createFacts(files, lineSplit, factFactory) {
    const ret = {};
    Object.keys(files).forEach((dataName) => {
        const data = files[dataName];
        const arr = [];
        ret[dataName] = arr;
        data.split('\n').map((line) => {
            return line.replace(/^\(|\)$/g, '');
        }).forEach((line) => {
            if (line) {
                const parts = line.split(lineSplit);
                const type = parts.shift();
                if (type) {
                    arr.push(factFactory(type, parts));
                }
            }
        });
    });
    return ret;
}

function getSessionFacts(facts, type) {
    if (!type) {
        console.error('Benchmark type required!');
        console.error(`Expected [\n\t${Object.keys(facts).join(',\n\t')}\n]`);
        process.exit(1);
    }
    if (!(type in facts)) {
        console.error(`Unknown benchmark type [type=${type}]`);
        console.error(`Expected [\n\t${Object.keys(facts).join(',\n\t')}\n]`);
        process.exit(1);
    }
    return facts[type];
}

function parseDataFiles(dataDir) {
    const files = {};
    fs.readdirSync(dataDir)
        .filter(file => FILE_REG.test(file))
        .forEach((f) => {
            const name = f.match(FILE_REG)[1];
            files[name] = fs.readFileSync(path.resolve(dataDir, f), 'utf8');
        });
    return files;
}

function runBenchmark(sessionFactory) {
    console.log('Starting benchmark...');
    const start = new Date();
    const session = sessionFactory(...process.argv.slice(2));
    return session.match()
        .then(() => {
            console.log('Duration %dms', new Date() - start);
            session.dispose();
        })
        .catch(err => console.log(err.stack));
}


module.exports = {
    createFacts,
    getSessionFacts,
    parseDataFiles,
    runBenchmark,
};
