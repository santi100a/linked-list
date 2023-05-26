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

export type LinkedListReducerCb<T, R = unknown> = (
	acc: T,
	cur: T,
	idx: number,
	list: LinkedList<T>
) => R;
export type LinkedListForEachCb<T, R = unknown> = (
	item: LinkedListItem<T>,
	previous: LinkedListItem<T> | null,
	list: LinkedList
) => R;
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
export class LinkedList<T = unknown> {
	/**
	 * The internal array of linked list items.
	 */
	private __items: LinkedListItem<T>[];
	/**
	 * The internal closed state variable.
	 */
	private __closed: boolean;
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

		function _push<T>(this: LinkedList<T>, item: T) {
			const listItem: LinkedListItem<T> = {
				value: item,
				previous: this.__items[this.__items.length - 1] || null,
			};
			this.__items.push(listItem);
		}
		for (const item of iter) {
			_push.bind(this)(item);
		}

		const DEF_PROPS_OPTIONS = {
			enumerable: false,
			configurable: false,
			writable: true,
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

		function _push<T>(this: LinkedList<T>, item: T) {
			const listItem: LinkedListItem<T> = {
				value: item,
				previous: this.__items[this.__items.length - 1] || null,
			};
			this.__items.push(listItem);
		}
		for (const item of items) {
			_push.bind(this)(item);
		}
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
		return this.__items.length;
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
	 * **Tip:** To create a reversed copy, prepend the `.copy()` method.
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
		return this.__items[this.__items.length - 1] ?? null;
	}
	/**
	 * Returns the first item in the linked list without removing it.
	 *
	 * @returns Returns the first item or null if the linked list is empty.
	 * @since 0.0.2
	 */
	peekFirst(): LinkedListItem<T> | null {
		return this.__items[0] ?? null;
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
			previous: null,
		};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (index === 0) listItem.previous = null;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		else listItem.previous = this.__items[index - 1];

		this.__items.splice(index, 0, listItem);
		// this.__length++;

		return this;
	}
	/**
	 * Removes the first occurrence of the specified item from the linked list.
	 *
	 * @param value The value of the item to remove.
	 *
	 * @returns True if the item was removed, false otherwise.
	 *
	 * @throws If the linked list has been closed.
	 */
	remove(value: T): boolean {
		if (this.__closed) throw new Error('This linked list has been closed.');

		for (let i = 0; i < this.__items.length; i++) {
			const item = this.__items[i];
			if (item.value === value) {
				this.__items.splice(i, 1);
				return true;
			}
		}

		return false;
	}
	/**
	 * Executes `cb` for every item in the list.
	 * @param cb The callback to be executed for every item in the list.
	 */
	forEach<R = unknown>(cb: LinkedListForEachCb<T, R>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (const item of this.__items) {
			cb(item, item.previous, this);
		}
		return this;
	}

	/**
	 * Executes `cb` for every item in the linked list, and creates a new one which contains
	 * only the items that make `cb` return `true`.
	 *
	 * @param cb The callback function to be executed for every item in the linked list.
	 * @returns A new linked list containing only the items that make `cb` return `true`.
	 */
	filter(cb: LinkedListForEachCb<T, boolean>) {
		const newItems = [];
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (let i = 0; i < this.__items.length; i++) {
			const item = this.__items[i];
			const doPush = cb(item, item.previous, this);
			if (typeof doPush !== 'boolean')
				throw new TypeError(
					`"cb" must return a value of type "boolean". Got "${doPush}" of type "${typeof doPush}".`
				);

			if (doPush) newItems.push(this.__items[i].value);
		}

		return new LinkedList(newItems);
	}
	/**
	 * Returns whether or not at least one item of the linked list makes `cb` return `true`.
	 *
	 * @param cb The callback function to be executed on every item of the linked list.
	 * @returns Whether or not at least one item makes `cb` return `true`.
	 */
	some(cb: LinkedListForEachCb<T, boolean>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (let i = 0; i < this.__items.length; i++) {
			const item = this.__items[i];
			const isSatisfied = cb(item, item.previous, this);
			if (typeof isSatisfied !== 'boolean')
				throw new TypeError(
					`"cb" must return a value of type "boolean". Got ${isSatisfied} of type ${typeof isSatisfied}`
				);

			if (isSatisfied) return true;
		}
		return false;
	}
	/**
	 * Maps every item of this linked list to another one in a new linked list, via `cb`.
	 *
	 * @param cb A callback to be executed for every item in the original linked list.
	 * @returns A new linked list containing the results of calling `cb` for every
	 * item in the original one.
	 */
	map<R = unknown>(cb: LinkedListForEachCb<T, R>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		const newArray: R[] = [];
		for (const item of this.__items) {
			newArray.push(cb(item, item.previous, this));
		}
		return new LinkedList(newArray);
	}
	/**
	 * Copies this linked list.
	 *
	 * @returns A copy of this linked list.
	 */
	copy(): LinkedList<T> {
		const list = new LinkedList<T>(this.toArray());
		if (this.__closed) list.close();
		return list;
	}
}
