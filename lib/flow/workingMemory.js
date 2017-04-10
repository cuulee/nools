'use strict';

const LinkedList = require('../util').LinkedList;
const InitialFact = require('./rule/patterns').InitialFact;

let id = 0;

class Fact {
    constructor(obj) {
        this.object = obj;
        this.recency = 0;
        this.id = id;
        id += 1;
    }

    equals(fact) {
        return fact === this.object;
    }

    hashCode() {
        return this.id;
    }
}

class WorkingMemory {

    constructor() {
        this.recency = 0;
        this.facts = new LinkedList();
    }

    dispose() {
        this.facts.clear();
    }

    getFacts() {
        const ret = [];
        let i = 0;
        this.facts.forEach((data) => {
            const val = data.object;
            if (!(val instanceof InitialFact)) {
                ret[i] = val;
                i += 1;
            }
        });
        return ret;
    }

    getFactsByType(Type) {
        return this.getFacts().filter(fact => fact instanceof Type || fact.constructor === Type);
    }

    getFact(o) {
        let head = this.facts.head;
        while (head) {
            const existingFact = head.data;
            if (existingFact.equals(o)) {
                return existingFact;
            }
            head = head.next;
        }
        return null;
    }

    getFactHandle(o) {
        const existingFact = this.getFact(o);
        if (existingFact) {
            return existingFact;
        }
        return this.setFactRecency(new Fact(o));
    }

    modifyFact(fact) {
        const existingFact = this.getFact(fact);
        if (existingFact) {
            return this.setFactRecency(existingFact);
        }
        // if we made it here we did not find the fact
        throw new Error('the fact to modify does not exist');
    }

    assertFact(o) {
        const fact = this.setFactRecency(new Fact(o));
        this.facts.push(fact);
        return fact;
    }

    setFactRecency(fact) {
        fact.recency = this.recency;
        this.recency += 1;
        return fact;
    }

    retractFact(fact) {
        let head = this.facts.head;
        while (head) {
            const existingFact = head.data;
            if (existingFact.equals(fact)) {
                this.facts.remove(head);
                return existingFact;
            }
            head = head.next;
        }
        // if we made it here we did not find the fact
        throw new Error('the fact to remove does not exist');
    }
}

module.exports = WorkingMemory;
