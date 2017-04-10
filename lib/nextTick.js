'use strict';

/* global setImmediate, window, MessageChannel*/

let nextTick;
if (typeof setImmediate === 'function') {
    // In IE10, or use https://github.com/NobleJS/setImmediate
    if (typeof window !== 'undefined') {
        nextTick = setImmediate.bind(window);
    } else {
        nextTick = setImmediate;
    }
} else if (typeof process !== 'undefined') {
    // node
    nextTick = process.nextTick;
} else if (typeof MessageChannel !== 'undefined') {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    const channel = new MessageChannel();
    // linked list of tasks (single, with head node)
    let head = {};
    let tail = head;
    channel.port1.onmessage = () => {
        head = head.next;
        const task = head.task;
        delete head.task;
        task();
    };
    nextTick = (task) => {
        tail = {task};
        tail.next = tail;
        channel.port2.postMessage(0);
    };
} else {
    // old browsers
    nextTick = task => setTimeout(task, 0);
}

module.exports = nextTick;
