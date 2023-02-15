"use strict";
// Entrypoint
exports.__esModule = true;
exports.LinkedList = void 0;
var closedSymbol = Symbol('closed');
var itemsSymbol = Symbol('items');
var lengthSymbol = Symbol('length');
/**
 * @class This is a linked list class.
 */
var LinkedList = /** @class */ (function () {
    function LinkedList(iter) {
        this[itemsSymbol] = [];
        this[closedSymbol] = false;
        this[lengthSymbol] = 0;
        var _push = function _push(item) {
            var listItem = {
                value: item,
                previous: this[itemsSymbol][this[itemsSymbol].length - 1] || null
            };
            this[itemsSymbol].push(listItem);
        }.bind(this);
        for (var _i = 0, _a = iter || []; _i < _a.length; _i++) {
            var item = _a[_i];
            _push(item);
        }
    }
    /**
     * Pushes one or more items to the list.
     *
     * @param items The item(s) you want to push.
     * @returns `this` object for chaining.
     */
    LinkedList.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (this[closedSymbol])
            throw new TypeError('This linked list has been closed.');
        var _push = function _push(item) {
            var listItem = {
                value: item,
                previous: this[itemsSymbol][this[itemsSymbol].length - 1] || null
            };
            this[itemsSymbol].push(Object.freeze(listItem));
        }.bind(this);
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            _push(item);
        }
        this[lengthSymbol] += items.length;
        return this;
    };
    /**
     * Pops the last item out of the list.
     *
     * @returns The last item in the list.
     */
    LinkedList.prototype.pop = function () {
        if (this[closedSymbol])
            throw new TypeError('This linked list has been closed.');
        var item = this[itemsSymbol].pop() || null;
        if (item !== null)
            this[lengthSymbol]--;
        return item;
    };
    /**
     * Closes the list so it can't be modified.
     *
     * @returns `this` object for chaining.
     */
    LinkedList.prototype.close = function () {
        this[closedSymbol] = true;
        return this;
    };
    /**
     * Retrieves the length of the list.
     *
     * @returns The length of the list.
     */
    LinkedList.prototype.getLength = function () {
        return this[lengthSymbol];
    };
    /**
     * Returns `true` in case the list has been closed (with `LinkedList.prototype.close()`).
     * @returns Whether or not the list is closed.
     */
    LinkedList.prototype.isClosed = function () {
        return this[closedSymbol];
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
