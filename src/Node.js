import { EventEmitter } from 'fbemitter';

const EVENT = 'change';

export class Connection {
	constructor(from, to) {
		this._from = from;
		this._to = to;
		this._subscription = from.addListener(function(...data) {
			to.setValue(...data);
		})
	}
	
	remove() {
		this._subscription.remove();
	}
}

export class Node {
	constructor() {
		this._emitter = new EventEmitter;
	}
	
	setValue(...data) {
		return this._emitter.emit(EVENT, ...data);
	}
	
	addListener(listener) {
		return this._emitter.addListener(EVENT, listener);
	}
	
	connect(to) {
		return new Connection(this, to);
	}
}