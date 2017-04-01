'use strict';

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = null;
    }

    push(data) {
        const tail = this.tail;
        const node = {data, prev: tail, next: null};
        if (tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
        this.length += 1;
        return node;
    }

    remove(node) {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        // node.data = node.prev = node.next = null;
        this.length -= 1;
    }

    forEach(cb) {
        if (!this.head) {
            return;
        }
        let head = this.head;
        while (head.next) {
            head = head.next;
            cb(head.data);
        }
    }

    toArray() {
        const ret = [];
        if (!this.head) {
            return ret;
        }
        let head = this.head;
        while (head.next) {
            head = head.next;
            ret.push(head);
        }
        return ret;
    }

    removeByData(data) {
        if (!this.head) {
            return;
        }
        let head = this.head;
        while (head.next) {
            head = head.next;
            if (head.data === data) {
                this.remove(head);
                return;
            }
        }
    }

    getByData(data) {
        if (!this.head) {
            return null;
        }
        let head = this.head;
        while (head) {
            head = head.next;
            if (head.data === data) {
                return head;
            }
        }
        return null;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

module.exports = LinkedList;
