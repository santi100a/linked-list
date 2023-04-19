// Main test suite
describe('Main linked list test', () => {
	const { LinkedList } = require('../cjs/index.js');
	test('The linked list works as expected', () => {
		const linkedList = new LinkedList();
		linkedList.push(5, 8, 3);
		const three = linkedList.pop();
		const two = linkedList.pop();
		const genesis = linkedList.pop();
		expect(three).toEqual({
			value: 3,
			previous: { value: 8, previous: { value: 5, previous: null } }
		});
		expect(two).toEqual({ value: 8, previous: { value: 5, previous: null } });
		expect(genesis).toEqual({ value: 5, previous: null });
		expect(linkedList.pop()).toBe(null);
		linkedList.close();
		expect(() => linkedList.push(6)).toThrow();
	});
	test('The list can construct itself from an array', () => {
    const list = new LinkedList([5, 8, 3]);
		const three = list.pop();
		const eight = list.pop();
		const five = list.pop();

		const fiveContents = { value: 5, previous: null };
		const eightContents = { value: 8, previous: fiveContents };
		const threeContents = {
			value: 3,
			previous: eightContents
		};

		expect(three).toEqual(threeContents);
		expect(eight).toEqual(eightContents);
		expect(five).toEqual(fiveContents);
    expect(() => new LinkedList('not an array')).toThrow(
			'"iter" must be an Array. Got "not an array" of type "string".'
		);
	});
	describe('LinkedList_class', () => {
		// Tests that pushing items to the list increases its length and adds the items to the end.
		it('test_push', () => {
			const list = new LinkedList();
			list.push(1, 2, 3);
			expect(list.getLength()).toBe(3);
			expect(list.toArray()).toEqual([1, 2, 3]);
			list.push(4);
			expect(list.getLength()).toBe(4);
			expect(list.toArray()).toEqual([1, 2, 3, 4]);
		});

		// Tests that popping the last item from the list decreases its length and returns the correct item.
		it('test_pop', () => {
			const list = new LinkedList([1, 2, 3]);
			const popped = list.pop();
			expect(popped?.value).toBe(3);
			expect(list.getLength()).toBe(2);
			expect(list.toArray()).toEqual([1, 2]);
		});

		// Tests that closing the list prevents further modifications and throws an error if push or pop is called.
		it('test_close', () => {
			const list = new LinkedList([1, 2, 3]);
			list.close();
			expect(() => list.push(4)).toThrow('This linked list has been closed.');
			expect(() => list.pop()).toThrow('This linked list has been closed.');
			expect(list.isClosed()).toBe(true);
		});

		// Tests that the getLength method returns the correct length of the list.
		it('test_get_length', () => {
			const list = new LinkedList([1, 2, 3]);
			expect(list.getLength()).toBe(3);
			list.push(4, 5);
			expect(list.getLength()).toBe(5);
		});

		// Tests that reversing the list changes the order of its items.
		it('test_reverse', () => {
			const list = new LinkedList(['a', 'b', 'c']);
			list.reverse();
			expect(list.toArray()).toEqual(['c', 'b', 'a']);
		});

		// Tests that peekLast, peekFirst, and peekList return the correct items.
		it('test_peek', () => {
			const list = new LinkedList(['a', 'b', 'c']);
			expect(list.peekFirst()?.value).toBe('a');
			expect(list.peekLast()?.value).toBe('c');
			expect(list.peekList()).toEqual([
				{ value: 'a', previous: null },
				{ value: 'b', previous: { value: 'a', previous: null } },
				{
					value: 'c',
					previous: { value: 'b', previous: { value: 'a', previous: null } }
				}
			]);
		});
		// Tests that the list can't be closed twice.
		it('test_close_twice', () => {
			const list = new LinkedList().push(5, 7, 4).close();
			expect(list.isClosed()).toBeTruthy();
			expect(() => list.close()).toThrow(
				'This linked list has already been closed.'
			);
		});
		// Tests that .toString() works as expected.
		it('test_stringify', () => {
			const list = new LinkedList().push(5, 7, 4).close();
			const json = list.toString();
			expect(json).toBe(
				JSON.stringify([
					{
						value: 5,
						previous: null
					},
					{
						value: 7,
						previous: {
							value: 5,
							previous: null
						}
					},
					{
						value: 4,
						previous: {
							value: 7,
							previous: {
								value: 5,
								previous: null
							}
						}
					}
				])
			);
		});
		// Tests that .reverse() throws an error if the list was closed.
		it('test_close_reverse_error', () => {
			const list = new LinkedList().push(5, 7, 2).close();
			expect(() => list.reverse()).toThrow('This linked list has been closed.');
		});
	});
});
