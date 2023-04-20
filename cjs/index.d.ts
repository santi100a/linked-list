/**
 * The shape of a linked list item.
 */
export interface LinkedListItem<T> {
    /**
     * The previous item in the linked list. If this is the genesis item,
     * it's `null`.
     */
    previous: LinkedListItem<T>;
    /**
     * The value of this item in the linked list.
     */
    value: T;
}
/**
 * @class This is a linked list class.
 */
export declare class LinkedList<T = unknown> {
    /**
     * The internal length of the linked list.
     */
    private __length;
    /**
     * The internal array of linked list items.
     */
    private __items;
    /**
     * The internal closed state variable.
     */
    private __closed;
    /**
     * Internal method.
     */
    private static _push;
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
     * @returns The current LinkedList instance.
     *
     * @throws If the linked list has been closed or if the index is out of range.
     */
    insert(index: number, item: T): this;
    remove(value: T): boolean;
}
