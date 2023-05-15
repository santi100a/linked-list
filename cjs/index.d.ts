export type LinkedListReducerCb<T, R = unknown> = (acc: T, cur: T, idx: number, list: LinkedList<T>) => R;
export type LinkedListForEachCb<T, R = unknown> = (item: LinkedListItem<T>, previous: LinkedListItem<T> | null, list: LinkedList) => R;
/**
 * The shape of a linked list item.
 */
export interface LinkedListItem<T> {
    /**
     * The previous item in the linked list. If this is the genesis item,
     * it's `null`.
     */
    readonly previous: LinkedListItem<T>;
    /**
     * The value of this item in the linked list.
     */
    readonly value: T;
}
/**
 * @class This is a linked list class.
 */
export declare class LinkedList<T = unknown> {
    /**
     * The internal array of linked list items.
     */
    private __items;
    /**
     * The internal closed state variable.
     */
    private __closed;
    /**
     * Creates a new linked list.
     *
     * @param iter An optional array to initialize the list with.
     */
    constructor(iter?: T[]);
    /**
     * Pushes one or more items to the list.
     *
     * @param items The item(s) you want to add to the list.
     * @returns `this` object for chaining.
     */
    push(...items: T[]): this;
    /**
     * Pops the last item out of the list.
     *
     * @returns The last item in the list.
     */
    pop(): LinkedListItem<T>;
    /**
     * Closes the list so it can't be modified.
     *
     * @returns `this` object for chaining.
     */
    close(): this;
    /**
     * Retrieves the length of the list.
     *
     * @returns The length of the list.
     */
    getLength(): number;
    /**
     * Returns `true` in case the list has been closed (with `LinkedList.prototype.close()`).
     * @returns Whether or not the list is closed.
     */
    isClosed(): boolean;
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
    reverse(): this;
    /**
     * Returns an array containing the values of each item in the
     * linked list in the order they appear.
     *
     * @returns Returns an array of values.
     * @since 0.0.2
     */
    toArray(): T[];
    /**
     * Returns a JSON representation of the linked list items.
     *
     * @returns Returns a JSON string.
     * @since 0.0.2
     */
    toString(): string;
    /**
     * Returns the last item in the linked list without removing it.
     *
     * @returns Returns the last item or null if the linked list is empty.
     * @since 0.0.2
     */
    peekLast(): LinkedListItem<T> | null;
    /**
     * Returns the first item in the linked list without removing it.
     *
     * @returns Returns the first item or null if the linked list is empty.
     * @since 0.0.2
     */
    peekFirst(): LinkedListItem<T> | null;
    /**
     * Returns a new array containing the same items as the linked list in the order they appear.
     *
     * @returns Returns an array of linked list items.
     * @since 0.0.2
     */
    peekList(): LinkedListItem<T>[];
    /**
     * Removes all items from the linked list.
     *
     * @returns The current `LinkedList` instance.
     */
    clear(): this;
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
    insert(index: number, item: T): this;
    /**
     * Removes the first occurrence of the specified item from the linked list.
     *
     * @param value The value of the item to remove.
     *
     * @returns True if the item was removed, false otherwise.
     *
     * @throws If the linked list has been closed.
     */
    remove(value: T): boolean;
    /**
     * Executes `cb` for every item in the list.
     * @param cb The callback to be executed for every item in the list.
     */
    forEach<R = unknown>(cb: LinkedListForEachCb<T, R>): this;
    /**
     * Executes `cb` for every item in the linked list, and creates a new one which contains
     * only the items that make `cb` return `true`.
     *
     * @param cb The callback function to be executed for every item in the linked list.
     * @returns A new linked list containing only the items that make `cb` return `true`.
     */
    filter(cb: LinkedListForEachCb<T, boolean>): LinkedList<any>;
    /**
     * Returns whether or not at least one item of the linked list makes `cb` return `true`.
     *
     * @param cb The callback function to be executed on every item of the linked list.
     * @returns Whether or not at least one item makes `cb` return `true`.
     */
    some(cb: LinkedListForEachCb<T, boolean>): boolean;
    /**
     * Maps every item of this linked list to another one in a new linked list, via `cb`.
     *
     * @param cb A callback to be executed for every item in the original linked list.
     * @returns A new linked list containing the results of calling `cb` for every
     * item in the original one.
     */
    map<R = unknown>(cb: LinkedListForEachCb<T, R>): LinkedList<R>;
    /**
     * Copies this linked list.
     *
     * @returns A copy of this linked list.
     */
    copy(): LinkedList<T>;
}
