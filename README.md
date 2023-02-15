# Santi's Minimal Linked List

This is a minimal, lightweight, and portable linked list library. It's a simple solution for people that don't like stuff like `yallist`.
It's written in TypeScript and is compatible with any runtime that supports EcmaScript 3 or higher.

## How to install it

Run the `npm install @santi100/linked-list`, `yarn add @santi100/linked-list` or `npm install @santi100/linked-list` command, depending on your package manager.

## Usage
- `class LinkedList<T = unknown>`: This is the linked list class.
- `LinkedList.prototype.push(...items: T[]): LinkedList<T>`: Pushes one or more items to the list. 
Returns the `this` object for chaining.
- `LinkedList.prototype.pop(): LinkedListItem<T>`: Pops the last item out of the list (and obviously returns it).
- `LinkedList.prototype.close(): LinkedList<T>`: Closes the list so it can't be modified.
Returns the `this` object for chaining.
