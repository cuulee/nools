'use strict';

const _ = require('lodash');
const leafy = require('leafy');
const FactHashTable = require('./factHashTable');
const EventEmitter = require('events').EventEmitter;

const AVLTree = leafy.AVLTree;

const DEFAULT_AGENDA_GROUP = 'main';

class Agenda extends EventEmitter {
    constructor(flow, conflictResolution) {
        super();
        this.agendaGroups = {};
        this.agendaGroupStack = [DEFAULT_AGENDA_GROUP];
        this.rules = {};
        this.flow = flow;
        this.comparator = conflictResolution;
        this.setFocus(DEFAULT_AGENDA_GROUP).addAgendaGroup(DEFAULT_AGENDA_GROUP);
    }

    addAgendaGroup(groupName) {
        if (!_.has(this.agendaGroups, groupName)) {
            this.agendaGroups[groupName] = new AVLTree({compare: this.comparator});
        }
    }

    getAgendaGroup(groupName) {
        return this.agendaGroups[groupName || DEFAULT_AGENDA_GROUP];
    }

    setFocus(agendaGroup) {
        if (agendaGroup !== this.getFocused() && this.agendaGroups[agendaGroup]) {
            this.agendaGroupStack.push(agendaGroup);
            this.emit('focused', agendaGroup);
        }
        return this;
    }

    getFocused() {
        const ags = this.agendaGroupStack;
        return ags[ags.length - 1];
    }

    getFocusedAgenda() {
        return this.agendaGroups[this.getFocused()];
    }

    register(node) {
        const agendaGroup = node.rule.agendaGroup;
        this.rules[node.name] = {
            tree: new AVLTree({compare: this.comparator}),
            factTable: new FactHashTable(),
        };
        if (agendaGroup) {
            this.addAgendaGroup(agendaGroup);
        }
    }

    isEmpty() {
        const agendaGroupStack = this.agendaGroupStack;
        let changed = false;
        while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
            agendaGroupStack.pop();
            changed = true;
        }
        if (changed) {
            this.emit('focused', this.getFocused());
        }
        return this.getFocusedAgenda().isEmpty();
    }

    fireNext() {
        const agendaGroupStack = this.agendaGroupStack;
        let ret = Promise.resolve(false);
        while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
            agendaGroupStack.pop();
        }
        if (!this.getFocusedAgenda().isEmpty()) {
            const activation = this.pop();
            this.emit('fire', activation.rule.name, activation.match.factHash);
            const fired = activation.rule.fire(this.flow, activation.match);
            if (fired && _.isFunction(fired.then)) {
                ret = fired.then(() => {
                    // return true if an activation fired
                    return true;
                });
            } else {
                ret = Promise.resolve(true);
            }
        }
        // return false if activation not fired
        return ret;
    }

    pop() {
        const tree = this.getFocusedAgenda();
        let root = tree.__root;
        while (root.right) {
            root = root.right;
        }
        const v = root.data;
        tree.remove(v);
        const rule = this.rules[v.name];
        rule.tree.remove(v);
        rule.factTable.remove(v);
        return v;
    }

    peek() {
        const tree = this.getFocusedAgenda();
        let root = tree.__root;
        while (root.right) {
            root = root.right;
        }
        return root.data;
    }

    modify(node, context) {
        this.retract(node, context);
        this.insert(node, context);
    }

    retract(node, retract) {
        const rule = this.rules[node.name];
        retract.rule = node;
        const activation = rule.factTable.remove(retract);
        if (activation) {
            this.getAgendaGroup(node.rule.agendaGroup).remove(activation);
            rule.tree.remove(activation);
        }
    }

    insert(node, insert) {
        const rule = this.rules[node.name];
        const nodeRule = node.rule;
        const agendaGroup = nodeRule.agendaGroup;
        rule.tree.insert(insert);
        this.getAgendaGroup(agendaGroup).insert(insert);
        if (nodeRule.autoFocus) {
            this.setFocus(agendaGroup);
        }

        rule.factTable.insert(insert);
    }

    dispose() {
        Object.keys(this.agendaGroups).forEach(key => this.agendaGroups[key].clear());
        const rules = this.rules;
        Object.keys(rules).forEach((key) => {
            rules[key].tree.clear();
            rules[key].factTable.clear();
        });
        this.rules = {};
    }
}

module.exports = Agenda;
