"use strict";
// Entrypoint
exports.__esModule = true;
exports.LinkedList = void 0;
function __map(array, fn) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
        mapped.push(fn(array[i], i, array));
    }
    return mapped;
}
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
        return this.__items.length;
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
     * **Tip:** To create a reversed copy, prepend the `.copy()` method.
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
        var _a;
        return (_a = this.__items[this.__items.length - 1]) !== null && _a !== void 0 ? _a : null;
    };
    /**
     * Returns the first item in the linked list without removing it.
     *
     * @returns Returns the first item or null if the linked list is empty.
     * @since 0.0.2
     */
    LinkedList.prototype.peekFirst = function () {
        var _a;
        return (_a = this.__items[0]) !== null && _a !== void 0 ? _a : null;
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
    /**
     * Removes all items from the linked list.
     *
     * @returns The current `LinkedList` instance.
     */
    LinkedList.prototype.clear = function () {
        this.__items = [];
        return this;
    };
    /**
     * Inserts an item at the specified index in the linked list.
     *
     * @param index The index at which to insert the item.
     * @param item The item to insert.
     *
     * @returns The current `LinkedList` instance.
     *
     * @throws If the linked list has been closed or if the index is out of range.
     */
    LinkedList.prototype.insert = function (index, item) {
        if (this.__closed)
            throw new Error('This linked list has been closed.');
        if (index < 0 || index > this.__items.length)
            throw new Error("Index ".concat(index, " is out of range."));
        var listItem = {
            value: item,
            previous: null
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (index === 0)
            listItem.previous = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        else
            listItem.previous = this.__items[index - 1];
        this.__items.splice(index, 0, listItem);
        // this.__length++;
        return this;
    };
    /**
     * Removes the first occurrence of the specified item from the linked list.
     *
     * @param value The value of the item to remove.
     *
     * @returns True if the item was removed, false otherwise.
     *
     * @throws If the linked list has been closed.
     */
    LinkedList.prototype.remove = function (value) {
        if (this.__closed)
            throw new Error('This linked list has been closed.');
        for (var i = 0; i < this.__items.length; i++) {
            var item = this.__items[i];
            if (item.value === value) {
                this.__items.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /**
     * Executes `cb` for every item in the list.
     * @param cb The callback to be executed for every item in the list.
     */
    LinkedList.prototype.forEach = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var _i = 0, _a = this.__items; _i < _a.length; _i++) {
            var item = _a[_i];
            cb(item, item.previous, this);
        }
        return this;
    };
    /**
     * Executes `cb` for every item in the linked list, and creates a new one which contains
     * only the items that make `cb` return `true`.
     *
     * @param cb The callback function to be executed for every item in the linked list.
     * @returns A new linked list containing only the items that make `cb` return `true`.
     */
    LinkedList.prototype.filter = function (cb) {
        var newItems = [];
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var i = 0; i < this.__items.length; i++) {
            var item = this.__items[i];
            var doPush = cb(item, item.previous, this);
            if (typeof doPush !== 'boolean')
                throw new TypeError("\"cb\" must return a value of type \"boolean\". Got \"".concat(doPush, "\" of type \"").concat(typeof doPush, "\"."));
            if (doPush)
                newItems.push(this.__items[i].value);
        }
        return new LinkedList(newItems);
    };
    /**
     * Returns whether or not at least one item of the linked list makes `cb` return `true`.
     *
     * @param cb The callback function to be executed on every item of the linked list.
     * @returns Whether or not at least one item makes `cb` return `true`.
     */
    LinkedList.prototype.some = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var i = 0; i < this.__items.length; i++) {
            var item = this.__items[i];
            var isSatisfied = cb(item, item.previous, this);
            if (typeof isSatisfied !== 'boolean')
                throw new TypeError("\"cb\" must return a value of type \"boolean\". Got ".concat(isSatisfied, " of type ").concat(typeof isSatisfied));
            if (isSatisfied)
                return true;
        }
        return false;
    };
    /**
     * Maps every item of this linked list to another one in a new linked list, via `cb`.
     *
     * @param cb A callback to be executed for every item in the original linked list.
     * @returns A new linked list containing the results of calling `cb` for every
     * item in the original one.
     */
    LinkedList.prototype.map = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        var newArray = [];
        for (var _i = 0, _a = this.__items; _i < _a.length; _i++) {
            var item = _a[_i];
            newArray.push(cb(item, item.previous, this));
        }
        return new LinkedList(newArray);
    };
    /**
     * Copies this linked list.
     *
     * @returns A copy of this linked list.
     */
    LinkedList.prototype.copy = function () {
        var list = new LinkedList(this.toArray());
        if (this.__closed)
            list.close();
        return list;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
