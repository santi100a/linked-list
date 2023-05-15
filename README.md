# Santi's Minimal Linked List

[![Build Status](https://github.com/santi100a/linked-list/actions/workflows/main.yml/badge.svg)](https://github.com/santi100a/linked-list/actions)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/linked-list.svg)](https://github.com/santi100a/linked-list)
[![License](https://img.shields.io/github/license/santi100a/linked-list.svg)](https://github.com/santi100a/linked-list)
[![npm homepage](https://img.shields.io/npm/v/@santi100%2flinked-list.svg)](https://www.npmjs.com/package/@santi100%2flinked-list)

This is a minimal, lightweight, and portable linked list library. It's a simple solution for people that don't like stuff like `yallist`.
It's written in TypeScript and is compatible with any runtime that supports ES3 or higher.

Its index file is an ESM wrapper, so if you're using version 0.0.1, you'll have to import
from `cjs/` in order to use the CommonJS version.

**Example:**

```javascript
const { LinkedList } = require('@santi100/linked-list/cjs'); // 0.0.1
const { LinkedList } = require('@santi100/linked-list'); // 0.0.2 and higher
```

## Installation

- NPM:  `npm install @santi100/linked-list`
- Yarn: `yarn add @santi100/linked-list`
- PNPM: `pnpm install @santi100/linked-list`

## Usage

- `interface LinkedListItem<T>`: The shape of a linked list item.
  - `previous: LinkedListItem<T>;` The previous item in the linked list. If this is the genesis item,
  it's `null`.
  - `value: T;` The value of this item in the linked list.

- `class LinkedList<T = unknown>`: This is the linked list class.
  - `constructor LinkedList<T = unknown>(iter?: T[]): LinkedList<T>`:
      Creates a new linked list.
      |    Name    |     Type     |             Description                   |  Optional?   |   Default    |
      |------------|--------------|-------------------------------------------|--------------|--------------|
      |    `T`     | *type param* | The type of every item of the list.       |     Yes      |   `unknown`  |
      | `iter?`    | `T[]`        | An optional array to initialize the list with.  | Yes    |    `[]`      |

  - `push(...items: T[]): this;` Pushes one or more items to the list.
     Returns the `this` object for chaining.
     |    Name    |     Type     |             Description                   |  Optional?   |   Default    |
     |------------|--------------|-------------------------------------------|--------------|--------------|
     | `...items` | `T[]`        | The item(s) you want to add to the list.  | *rest param* |   `[]`       |

  - `pop(): this;` Pops the last item out of the list (and obviously returns it).
  - `close(): this;` Closes the list so it can't be modified.
    Returns the `this` object for chaining.
  - `getLength(): this;` Retrieves the length of the list.
  - `isClosed(): boolean;` Returns `true` in case the list has been closed
    (with `LinkedList.prototype.close()`).
  - `reverse(): this;` (since 0.0.2) Reverses the order of the items in the linked list in-place.
    It throws `Error` if the linked list has been closed, and returns the modified
    linked list instance.
  - `toArray(): T[];` (since 0.0.2) Returns an array containing the values of each item in the
    linked list in the order they appear.
  - `toString(): string;` (since 0.0.2) Returns a JSON representation of the linked list items.
  - `peekLast(): LinkedListItem<T> | null;` (since 0.0.2)
     Returns the last item in the linked list without removing it, or `null` if the list's empty.
  - `peekFirst(): LinkedListItem<T> | null;` (since 0.0.2)
     Returns the first item in the linked list without removing it, or `null` if the list's empty.
  - `peekList(): LinkedListItem<T>[];` (since 0.0.2)
     Returns a new array containing the same items as the linked list in the order they appear.

  - `clear(): this;` (since 0.0.3)
     Removes all items from the linked list. Returns the current `LinkedList` instance.
  - `insert(index: number, item: T): this;` (since 0.0.3)
     Inserts an item at the specified index in the linked list.
     |    Name    |     Type     |             Description                   |  Optional?   |   Default    |
     |------------|--------------|-------------------------------------------|--------------|--------------|
     | `index`    |   `number`   | The index at which to insert the item.    |      No      |    *N/A*     |
     | `item`     |     `T`      | The item to insert.                       |      No      |    *N/A*     |
  - `remove(value: T): boolean;` (since 0.0.3)
     Removes the first occurrence of the specified item from the linked list.
     |    Name    |     Type     |             Description                   |  Optional?   |   Default    |
     |------------|--------------|-------------------------------------------|--------------|--------------|
     | `value`    |     `T`      | The value of the item to remove.          |      No      |    *N/A*     |

     Returns `true` if the item was removed, `false` otherwise.
  - `copy(): LinkedList<T>;` (since 0.0.4)
    Copies this linked list.
    Returns a copy of this linked list.
  - `forEach(cb: LinkedListForEachCb<T, R>): this;` (since 0.0.4)
    Executes `cb` for every item in the list.
    | Name |     Type                  |           Description            |  Optional?   |   Default    |
    |------|---------------------------|----------------------------------|--------------|--------------|
    | `cb` |`LinkedListForEachCb<T, R>`| The callback to be executed for every item in the list. |      No      |    *N/A*     |
  - `map(cb: LinkedListForEachCb<T, R>): LinkedList<T>;` (since 0.0.4)
    Maps every item of this linked list to another one in a new linked list, via `cb`.
    | Name |     Type                  |           Description            |  Optional?   |   Default    |
    |------|---------------------------|----------------------------------|--------------|--------------|
    | `cb` |`LinkedListForEachCb<T, R>`| The callback to be executed for every item in the original list. |      No      |    *N/A*     |

    Returns a new linked list containing the results of calling `cb` for every item in the original one.
  - `filter(cb: LinkedLinkedForEach<T, boolean>): LinkedList;` (since 0.0.4)
    Executes `cb` for every item in the linked list, and creates a new one which contains
    only the items that make `cb` return `true`.
  - `some(cb: LinkedLinkedForEach<T, boolean>): boolean;` (since 0.0.4)
    Returns whether or not at least one item of the linked list makes `cb` return `true`.
    |    Name    |     Type     |             Description                   |  Optional?   |   Default    |
    |------------|--------------|-------------------------------------------|--------------|--------------|
    | `cb`    |     `LinkedLinkedForEach<T, boolean>`      | The callback function to be executed on every item of the linked list.          |      No      |    *N/A*     |
