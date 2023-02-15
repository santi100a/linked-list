// Entrypoint

/**
 * The shape of a linked list item.
 */
interface LinkedListItem<T> {
  previous: LinkedListItem<T>;
  value: T;
}
const closedSymbol: unique symbol = Symbol('closed');
const itemsSymbol: unique symbol = Symbol('items');
const lengthSymbol: unique symbol = Symbol('length') ;


/**
 * @class This is a linked list class.
 */
class LinkedList<T = unknown> {
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
  constructor(iter?: T[]) {
    this[itemsSymbol] = [];
    this[closedSymbol] = false;
    this[lengthSymbol] = 0;

    
    const _push: (item: T) => void = function _push(item: T) {
      const listItem: LinkedListItem<T> = {
        value: item,
        previous: this[itemsSymbol][this[itemsSymbol].length - 1] || null,
      };
      this[itemsSymbol].push(listItem);
    }.bind(this);
    for (const item of iter || []) {
      _push(item);
    }
  }
  /**
   * Pushes one or more items to the list.
   * 
   * @param items The item(s) you want to push.
   * @returns `this` object for chaining.
   */
  push(...items: T[]): LinkedList<T> {
    if (this[closedSymbol]) throw new TypeError('This linked list has been closed.');
    const _push: (item: T) => void = function _push(item: T) {
      const listItem: LinkedListItem<T> = {
        value: item,
        previous: this[itemsSymbol][this[itemsSymbol].length - 1] || null,
      };
      this[itemsSymbol].push(Object.freeze(listItem));
    }.bind(this);
    for (const item of items) {
      _push(item);
    }
    this[lengthSymbol] += items.length;
    return this; 
  }
  /**
   * Pops the last item out of the list.
   * 
   * @returns The last item in the list.
   */
  pop(): LinkedListItem<T> {
    if (this[closedSymbol]) throw new TypeError('This linked list has been closed.');
    const item = this[itemsSymbol].pop() || null;
    if (item !== null) this[lengthSymbol]--;
    return item;
  }
  /**
   * Closes the list so it can't be modified.
   * 
   * @returns `this` object for chaining.
   */
  close(): LinkedList<T> {
    this[closedSymbol] = true;
    return this;
  }
  /**
   * Retrieves the length of the list.
   * 
   * @returns The length of the list.
   */
  getLength(): number {
    return this[lengthSymbol];
  }
  /**
   * Returns `true` in case the list has been closed (with `LinkedList.prototype.close()`). 
   * @returns Whether or not the list is closed.
   */
  isClosed(): boolean {
    return this[closedSymbol];
  }
}
export { LinkedList, type LinkedListItem };
