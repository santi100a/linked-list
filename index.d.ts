/**
 * The shape of a linked list item.
 */
interface LinkedListItem<T> {
    previous: LinkedListItem<T>;
    value: T;
}
declare const closedSymbol: unique symbol;
declare const itemsSymbol: unique symbol;
declare const lengthSymbol: unique symbol;
/**
 * @class This is a linked list class.
 */
declare class LinkedList<T = unknown> {
    /**
     * The internal length of the linked list.
     */
    [lengthSymbol]: number;
    /**
     * The internal array of linked list items.
     */
    [itemsSymbol]: LinkedListItem<T>[];
    /**
     * The internal closed state variable.
     */
    [closedSymbol]: boolean;
    constructor(iter?: T[]);
    /**
     * Pushes one or more items to the list.
     *
     * @param items The item(s) you want to push.
     * @returns `this` object for chaining.
     */
    push(...items: T[]): LinkedList<T>;
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
    close(): LinkedList<T>;
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
}
export { LinkedList, type LinkedListItem };
