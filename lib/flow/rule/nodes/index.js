'use strict';

const extd = require('../../../extended');
const patterns = require('../patterns');
const AliasNode = require('./aliasNode');
const EqualityNode = require('./equalityNode');
const JoinNode = require('./joinNode');
const BetaNode = require('./betaNode');
const NotNode = require('./notNode');
const FromNode = require('./fromNode');
const FromNotNode = require('./fromNotNode');
const ExistsNode = require('./existsNode');
const ExistsFromNode = require('./existsFromNode');
const LeftAdapterNode = require('./leftAdapterNode');
const RightAdapterNode = require('./rightAdapterNode');
const TypeNode = require('./typeNode');
const TerminalNode = require('./terminalNode');
const PropertyNode = require('./propertyNode');

const atoms = patterns.atoms;

function hasReferenceAtoms(pattern) {
    return pattern.constraints || [].some(c => c instanceof atoms.ReferenceAtom);
}

class RootNode {
    constructor(wm, agendaTree) {
        this.terminalNodes = [];
        this.joinNodes = [];
        this.nodes = [];
        this.constraints = [];
        this.typeNodes = [];
        this.__ruleCount = 0;
        this.bucket = {
            counter: 0,
            recency: 0,
        };
        this.agendaTree = agendaTree;
        this.workingMemory = wm;
    }

    assertRule(rule) {
        const terminalNode = new TerminalNode(this.bucket, this.__ruleCount++, rule, this.agendaTree); // eslint-disable-line
        this.__addToNetwork(rule, rule.pattern, terminalNode);
        this.__mergeJoinNodes();
        this.terminalNodes.push(terminalNode);
    }

    resetCounter() {
        this.bucket.counter = 0;
    }

    incrementCounter() {
        this.bucket.counter += 1;
    }

    assertFact(fact) {
        const typeNodes = this.typeNodes;
        for (let i = typeNodes.length - 1; i >= 0; i--) {
            typeNodes[i].assert(fact);
        }
    }

    retractFact(fact) {
        const typeNodes = this.typeNodes;
        for (let i = typeNodes.length - 1; i >= 0; i--) {
            typeNodes[i].retract(fact);
        }
    }

    modifyFact(fact) {
        const typeNodes = this.typeNodes;
        for (let i = typeNodes.length - 1; i >= 0; i--) {
            typeNodes[i].modify(fact);
        }
    }


    containsRule(name) {
        return this.terminalNodes.some(n => n.rule.name === name);
    }

    dispose() {
        const typeNodes = this.typeNodes;
        for (let i = typeNodes.length - 1; i >= 0; i--) {
            typeNodes[i].dispose();
        }
    }

    __mergeJoinNodes() {
        const joinNodes = this.joinNodes;
        for (let i = 0; i < joinNodes.length; i++) {
            const j1 = joinNodes[i];
            const j2 = joinNodes[i + 1];
            if (j1 && j2 && (j1.constraint && j2.constraint)) {
                if (j1.constraint.equal(j2.constraint)) {
                    j1.merge(j2);
                    joinNodes.splice(i + 1, 1);
                }
            }
        }
    }

    __checkEqual(node) {
        const thisConstraints = this.constraints;
        for (let i = thisConstraints.length - 1; i >= 0; i--) {
            const n = thisConstraints[i];
            if (node.equal(n)) {
                return n;
            }
        }
        thisConstraints.push(node);
        return node;
    }

    __createTypeNode(rule, pattern) {
        const ret = new TypeNode(pattern.constraints[0]);
        const typeNodes = this.typeNodes;
        for (let i = typeNodes.length - 1; i >= 0; i--) {
            const n = typeNodes[i];
            if (ret.equal(n)) {
                return n;
            }
        }
        typeNodes.push(ret);
        return ret;
    }

    __createEqualityNode(rule, constraint) {
        return this.__checkEqual(new EqualityNode(constraint)).addRule(rule);
    }

    __createPropertyNode(rule, constraint) {
        return this.__checkEqual(new PropertyNode(constraint)).addRule(rule);
    }

    __createAliasNode(rule, pattern) {
        return this.__checkEqual(new AliasNode(pattern)).addRule(rule);
    }

    __createAdapterNode(rule, side) {
        return (side === 'left' ? new LeftAdapterNode() : new RightAdapterNode()).addRule(rule);
    }

    __createJoinNode(rule, pattern, outNode, side) {
        let joinNode;
        if (pattern.rightPattern instanceof patterns.NotPattern) {
            joinNode = new NotNode();
        } else if (pattern.rightPattern instanceof patterns.FromExistsPattern) {
            joinNode = new ExistsFromNode(pattern.rightPattern, this.workingMemory);
        } else if (pattern.rightPattern instanceof patterns.ExistsPattern) {
            joinNode = new ExistsNode();
        } else if (pattern.rightPattern instanceof patterns.FromNotPattern) {
            joinNode = new FromNotNode(pattern.rightPattern, this.workingMemory);
        } else if (pattern.rightPattern instanceof patterns.FromPattern) {
            joinNode = new FromNode(pattern.rightPattern, this.workingMemory);
        } else if (pattern instanceof patterns.CompositePattern
            && !hasReferenceAtoms(pattern.leftPattern)
            && !hasReferenceAtoms(pattern.rightPattern)) {
            joinNode = new BetaNode();
            this.joinNodes.push(joinNode);
        } else {
            joinNode = new JoinNode();
            this.joinNodes.push(joinNode);
        }
        joinNode.__rule__ = rule;
        let parentNode = joinNode;
        if (outNode instanceof BetaNode) {
            const adapterNode = this.__createAdapterNode(rule, side);
            parentNode.addOutNode(adapterNode, pattern);
            parentNode = adapterNode;
        }
        parentNode.addOutNode(outNode, pattern);
        return joinNode.addRule(rule);
    }

    __addToNetwork(rule, pattern, outNode, side) {
        if (pattern instanceof patterns.ObjectPattern) {
            if (!(pattern instanceof patterns.InitialFactPattern) && (!side || side === 'left')) {
                const compositePattern = new patterns.CompositePattern(
                    new patterns.InitialFactPattern(),
                    pattern);
                this.__createBetaNode(rule, compositePattern, outNode, side);
            } else {
                this.__createAlphaNode(rule, pattern, outNode, side);
            }
        } else if (pattern instanceof patterns.CompositePattern) {
            this.__createBetaNode(rule, pattern, outNode, side);
        }
    }

    __createBetaNode(rule, pattern, outNode, side) {
        const joinNode = this.__createJoinNode(rule, pattern, outNode, side);
        this.__addToNetwork(rule, pattern.rightPattern, joinNode, 'right');
        this.__addToNetwork(rule, pattern.leftPattern, joinNode, 'left');
        outNode.addParentNode(joinNode);
        return joinNode;
    }


    __createAlphaNode(rule, pattern, outNode, side) {
        if (!(pattern instanceof patterns.FromPattern)) {
            const patternConstraints = pattern.constraints;
            const typeNode = this.__createTypeNode(rule, pattern);
            const aliasNode = this.__createAliasNode(rule, pattern);
            typeNode.addOutNode(aliasNode, pattern);
            aliasNode.addParentNode(typeNode);
            let parentNode = aliasNode;
            for (let i = patternConstraints.length - 1; i > 0; i--) {
                const constraint = patternConstraints[i];
                let node = null;
                if (constraint instanceof atoms.HashAtom) {
                    node = this.__createPropertyNode(rule, constraint);
                } else if (constraint instanceof atoms.ReferenceAtom) {
                    outNode.constraint.addConstraint(constraint);
                    continue; // eslint-disable-line
                } else {
                    node = this.__createEqualityNode(rule, constraint);
                }
                parentNode.addOutNode(node, pattern);
                node.addParentNode(parentNode);
                parentNode = node;
            }

            if (outNode instanceof BetaNode) {
                const adapterNode = this.__createAdapterNode(rule, side);
                adapterNode.addParentNode(parentNode);
                parentNode.addOutNode(adapterNode, pattern);
                parentNode = adapterNode;
            }
            outNode.addParentNode(parentNode);
            parentNode.addOutNode(outNode, pattern);
            return typeNode;
        }
        return null;
    }

    print() {
        this.terminalNodes.forEach(t => t.print('    '));
    }
}

exports.RootNode = RootNode;
