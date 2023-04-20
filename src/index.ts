// Entrypoint

function __map<T = unknown, R = unknown>(
	array: T[],
	fn: (item: T, index: number, array: T[]) => R
) {
	const mapped = [];
	for (let i = 0; i < array.length; i++) {
		mapped.push(fn(array[i], i, array));
	}
	return mapped;
}

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
export class LinkedList<T = unknown> {
	/**
	 * The internal length of the linked list.
	 */
	private __length: number;
	/**
	 * The internal array of linked list items.
	 */
	private __items: LinkedListItem<T>[];
	/**
	 * The internal closed state variable.
	 */
	private __closed: boolean;
	/**
	 * Internal method.
	 */
	private static _push<T>(this: LinkedList<T>, item: T) {
		const listItem: LinkedListItem<T> = {
			value: item,
			previous: this.__items[this.__items.length - 1] || null
		};
		this.__items.push(listItem);
	}
	/**
	 * Creates a new linked list.
	 *
	 * @param iter An optional array to initialize the list with.
	 */
	constructor(iter: T[] = []) {
		if (!(iter instanceof Array))
			throw new TypeError(
				`"iter" must be an Array. Got "${iter}" of type "${typeof iter}".`
			);
		this.__items = [];
		this.__closed = false;
		this.__length = 0;

		for (const item of iter) {
			LinkedList._push.bind(this)(item);
		}
		this.__length += iter.length;

		const DEF_PROPS_OPTIONS = {
			enumerable: false,
			configurable: false,
			writable: true
		};
		Object?.defineProperty?.(this, '__items', DEF_PROPS_OPTIONS);
		Object?.defineProperty?.(this, '__closed', DEF_PROPS_OPTIONS);
		Object?.defineProperty?.(this, '__length', DEF_PROPS_OPTIONS);
	}
	/**
	 * Pushes one or more items to the list.
	 *
	 * @param items The item(s) you want to add to the list.
	 * @returns `this` object for chaining.
	 */
	push(...items: T[]): this {
		if (this.__closed) throw new Error('This linked list has been closed.');

		for (const item of items) {
			LinkedList._push.bind(this)(item);
		}
		this.__length += items.length;
		return this;
	}

	/**
	 * Pops the last item out of the list.
	 *
	 * @returns The last item in the list.
	 */
	pop(): LinkedListItem<T> {
		if (this.__closed) throw new Error('This linked list has been closed.');
		const item = this.__items.pop() || null;
		if (item !== null) this.__length--;
		return item;
	}
	/**
	 * Closes the list so it can't be modified.
	 *
	 * @returns `this` object for chaining.
	 */
	close(): this {
		if (this.__closed)
			throw new Error('This linked list has already been closed.');
		this.__closed = true;
		return this;
	}
	/**
	 * Retrieves the length of the list.
	 *
	 * @returns The length of the list.
	 */
	getLength(): number {
		return this.__length;
	}
	/**
	 * Returns `true` in case the list has been closed (with `LinkedList.prototype.close()`).
	 * @returns Whether or not the list is closed.
	 */
	isClosed(): boolean {
		return this.__closed;
	}
	/**
	 * Reverses the order of the items in the linked list in-place.
	 *
	 * @throws `Error` if the linked list has been closed.
	 * @returns Returns the modified linked list instance.
	 *
	 * @since 0.0.2
	 */
	reverse(): this {
		if (this.__closed) throw new Error('This linked list has been closed.');

		this.__items.reverse();

		return this;
	}
	/**
	 * Returns an array containing the values of each item in the
	 * linked list in the order they appear.
	 *
	 * @returns Returns an array of values.
	 * @since 0.0.2
	 */
	toArray(): T[] {
		return __map(this.__items, (item) => item.value);
	}
	/**
	 * Returns a JSON representation of the linked list items.
	 *
	 * @returns Returns a JSON string.
	 * @since 0.0.2
	 */
	toString(): string {
		return JSON.stringify(this.__items);
	}
	/**
	 * Returns the last item in the linked list without removing it.
	 *
	 * @returns Returns the last item or null if the linked list is empty.
	 * @since 0.0.2
	 */
	peekLast(): LinkedListItem<T> | null {
		return this.__items[this.__items.length - 1] || null;
	}
	/**
	 * Returns the first item in the linked list without removing it.
	 *
	 * @returns Returns the first item or null if the linked list is empty.
	 * @since 0.0.2
	 */
	peekFirst(): LinkedListItem<T> | null {
		return this.__items[0] || null;
	}
	/**
	 * Returns a new array containing the same items as the linked list in the order they appear.
	 *
	 * @returns Returns an array of linked list items.
	 * @since 0.0.2
	 */
	peekList(): LinkedListItem<T>[] {
		return this.__items.slice();
	}
	/**
     * Removes all items from the linked list.
     *
     * @returns The current `LinkedList` instance.
     */
	clear(): this {
		this.__items = [];
		return this;
	}
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
	insert(index: number, item: T): this {
		if (this.__closed) throw new Error('This linked list has been closed.');

		if (index < 0 || index > this.__items.length)
			throw new Error(`Index ${index} is out of range.`);

		const listItem: LinkedListItem<T> = {
			value: item,
			previous: null
		};

		if (index === 0) listItem.previous = null;
		else listItem.previous = this.__items[index - 1];

		this.__items.splice(index, 0, listItem);
		this.__length++;

		return this;
	}
	/**
     * Removes the first occurrence of the specified item from the linked list.
     *
     * @param value The value of the item to remove.
     *
     * @returns True if the item was removed, false otherwise.
     *
     * @throws {Error} If the linked list has been closed.
     */
	remove(value: T): boolean {
		if (this.__closed) throw new Error('This linked list has been closed.');

		for (let i = 0; i < this.__items.length; i++) {
			const item = this.__items[i];
			if (item.value === value) {
				this.__items.splice(i, 1);
				this.__length--;
				return true;
			}
		}

		return false;
	}
}
