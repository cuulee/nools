'use strict';

const cp = require('child_process');

function spawnChild(runNo, module, args) {
    console.log(`Executing benchmark ${runNo + 1}: ${module} ${args.join(' ')}`);
    return new Promise((resolve, reject) => {
        const child = cp.fork(module, args);
        child.on('exit', (code) => {
            if (code !== 0) {
                return reject(new Error(`An error occurred while executing ${module} [code=${code}]`));
            }
            return resolve();
        });
    });
}

function runBenchmark(times, durations, module, args) {
    const durationsKey = `${module} ${(args || []).join(' ')}`;
    if (!(durationsKey in durations)) {
        durations[durationsKey] = [];
    }
    const run = (runCount) => {
        const start = new Date();
        return spawnChild(runCount, module, args || []).then(() => {
            durations[durationsKey].push(new Date() - start);
            if (runCount + 1 < times) {
                return run(runCount + 1);
            }
            return runCount;
        });
    };
    return run(0);
}

function printStats(durations) {
    console.log('\n\n====Summary====\n');
    return Object.keys(durations).forEach((module) => {
        console.log(`Benchmark ${module}`);
        const runDurations = durations[module];
        runDurations.forEach((duration, i) => console.log(`Run ${i + 1}: ${duration}ms`));
        const runSum = runDurations.reduce((sum, duration) => sum + duration, 0);
        console.log(`Avg ${runSum / runDurations.length}ms\n`);
    });
}

function runBenchmarks() {
    const durations = {};
    return runBenchmark(3, durations, './manners', ['manners32'])
        .then(() => runBenchmark(3, durations, './waltzdb', ['waltzdb4']))
        .then(() => runBenchmark(3, durations, './simple', [5]))
        .then(() => runBenchmark(3, durations, './sendMoreMoney'))
        .then(() => printStats(durations))
        .catch(err => console.log(err.stack));
}

runBenchmarks();
