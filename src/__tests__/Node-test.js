/* global beforeEach */
/* global describe */
/* global expect */
/* global it */
/* global jest */

jest.autoMockOff();

describe('Node', function () {
	let Node = require('../Node.js').Node;
	let node = new Node;
	
	let listener, subscription;
	it('should be able to subscribe', function() {
		listener = jest.genMockFunction();
		subscription = node.addListener(listener);
		expect(listener).not.toBeCalled();
	});
	
	it('should receive emitted data', function() {
		node.setValue(1);
		expect(listener).toBeCalledWith(1);
	});
	
	it('should receive another emitted data', function() {
		node.setValue("foo", "bar");
		expect(listener).toBeCalledWith("foo", "bar");
	});
	
	let childNode = new Node;
	
	let connection;
	it('should be able to connect the another node', function() {
		connection = node.connect(childNode);
	});
	
	let childListener, childSubscription;
	it('should emit the data also to the connected node', function() {
		childListener = jest.genMockFunction();
		childSubscription = childNode.addListener(childListener);
		
		node.setValue([1, 2, 3]);
		expect(childListener).toBeCalledWith([1, 2, 3]);
	});
	
	it('should be able to remove connection', function () {
		childListener.mockClear();
		connection.remove();
		node.setValue("baz");
		expect(childListener).not.toBeCalled();
	});
});