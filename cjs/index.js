"use strict";
// Entrypoint
exports.__esModule = true;
exports.LinkedList = void 0;
/**
 * @class This is a linked list class.
 */
var LinkedList = /** @class */ (function () {
    /**
     * Creates a new linked list.
     *
     * @param iter An optional array to initialize the list with.
     */
    function LinkedList(iter) {
        if (iter === void 0) { iter = []; }
        var _a, _b, _c;
        if (!(iter instanceof Array))
            throw new TypeError("\"iter\" must be an Array. Got \"".concat(iter, "\" of type \"").concat(typeof iter, "\"."));
        this.__items = [];
        this.__closed = false;
        this.__length = 0;
        function _push(item) {
            var listItem = {
                value: item,
                previous: this.__items[this.__items.length - 1] || null
            };
            this.__items.push(listItem);
        }
        for (var _i = 0, iter_1 = iter; _i < iter_1.length; _i++) {
            var item = iter_1[_i];
            _push.bind(this)(item);
        }
        this.__length += iter.length;
        var DEF_PROPS_OPTIONS = {
            enumerable: false,
            configurable: false,
            writable: true
        };
        (_a = Object === null || Object === void 0 ? void 0 : Object.defineProperty) === null || _a === void 0 ? void 0 : _a.call(Object, this, '__items', DEF_PROPS_OPTIONS);
        (_b = Object === null || Object === void 0 ? void 0 : Object.defineProperty) === null || _b === void 0 ? void 0 : _b.call(Object, this, '__closed', DEF_PROPS_OPTIONS);
        (_c = Object === null || Object === void 0 ? void 0 : Object.defineProperty) === null || _c === void 0 ? void 0 : _c.call(Object, this, '__length', DEF_PROPS_OPTIONS);
    }
    /**
     * Pushes one or more items to the list.
     *
     * @param items The item(s) you want to add to the list.
     * @returns `this` object for chaining.
     */
    LinkedList.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (this.__closed)
            throw new Error('This linked list has been closed.');
        function _push(item) {
            var listItem = {
                value: item,
                previous: this.__items[this.__items.length - 1] || null
            };
            this.__items.push(listItem);
        }
        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
            var item = items_1[_a];
            _push.bind(this)(item);
        }
        this.__length += items.length;
        return this;
    };
    /**
     * Pops the last item out of the list.
     *
     * @returns The last item in the list.
     */
    LinkedList.prototype.pop = function () {
        if (this.__closed)
            throw new Error('This linked list has been closed.');
        var item = this.__items.pop() || null;
        if (item !== null)
            this.__length--;
        return item;
    };
    /**
     * Closes the list so it can't be modified.
     *
     * @returns `this` object for chaining.
     */
    LinkedList.prototype.close = function () {
        if (this.__closed)
            throw new Error('This linked list has already been closed.');
        this.__closed = true;
        return this;
    };
    /**
     * Retrieves the length of the list.
     *
     * @returns The length of the list.
     */
    LinkedList.prototype.getLength = function () {
        return this.__length;
    };
    /**
     * Returns `true` in case the list has been closed (with `LinkedList.prototype.close()`).
     * @returns Whether or not the list is closed.
     */
    LinkedList.prototype.isClosed = function () {
        return this.__closed;
    };
    /**
     * Reverses the order of the items in the linked list in-place.
     *
     * @throws `Error` if the linked list has been closed.
     * @returns Returns the modified linked list instance.
     *
     * @since 0.0.2
     */
    LinkedList.prototype.reverse = function () {
        if (this.__closed)
            throw new Error('This linked list has been closed.');
        this.__items.reverse();
        return this;
    };
    /**
     * Returns an array containing the values of each item in the
     * linked list in the order they appear.
     *
     * @returns Returns an array of values.
     * @since 0.0.2
     */
    LinkedList.prototype.toArray = function () {
        return __map(this.__items, function (item) { return item.value; });
    };
    /**
     * Returns a JSON representation of the linked list items.
     *
     * @returns Returns a JSON string.
     * @since 0.0.2
     */
    LinkedList.prototype.toString = function () {
        return JSON.stringify(this.__items);
    };
    /**
     * Returns the last item in the linked list without removing it.
     *
     * @returns Returns the last item or null if the linked list is empty.
     * @since 0.0.2
     */
    LinkedList.prototype.peekLast = function () {
        return this.__items[this.__items.length - 1] || null;
    };
    /**
     * Returns the first item in the linked list without removing it.
     *
     * @returns Returns the first item or null if the linked list is empty.
     * @since 0.0.2
     */
    LinkedList.prototype.peekFirst = function () {
        return this.__items[0] || null;
    };
    /**
     * Returns a new array containing the same items as the linked list in the order they appear.
     *
     * @returns Returns an array of linked list items.
     * @since 0.0.2
     */
    LinkedList.prototype.peekList = function () {
        return this.__items.slice();
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
function __map(array, fn) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
        mapped.push(fn(array[i], i, array.slice()));
    }
    return mapped;
}
