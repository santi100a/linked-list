// Main test suite
const { LinkedList } = require("../cjs/index.js");
describe("Main linked list test", () => {
  test("The linked list works as expected", () => {
    const linkedList = new LinkedList();
    linkedList.push(5, 8, 3);

    const three = linkedList.pop();
    const two = linkedList.pop();
    const genesis = linkedList.pop();
    expect(three).toEqual({
      value: 3,
      previous: { value: 8, previous: { value: 5, previous: null } },
    });
    expect(two).toEqual({ value: 8, previous: { value: 5, previous: null } });
    expect(genesis).toEqual({ value: 5, previous: null });
    expect(linkedList.pop()).toBe(null);
    linkedList.close();
    expect(() => linkedList.push(6)).toThrowError(TypeError);
  });
  test("The list can construct itself from an array", () => {
    const list = new LinkedList([5, 8, 3]);
    const three = list.pop();
    const eight = list.pop();
    const five = list.pop();

    const fiveContents = { value: 5, previous: null };
    const eightContents = { value: 8, previous: fiveContents };
    const threeContents = {
      value: 3,
      previous: eightContents
    }


    expect(three).toEqual(threeContents);
    expect(eight).toEqual(eightContents);
    expect(five).toEqual(fiveContents);
  });
});
