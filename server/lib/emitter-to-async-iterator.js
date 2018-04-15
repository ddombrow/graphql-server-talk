//copied from graphql-subscriptions npm module

const { $$asyncIterator } = require("iterall");

function emitterToAsyncIterator(emitter, eventsNames) {
	const pullQueue = [];
	const pushQueue = [];
	const eventsArray = typeof eventsNames === "string" ? [eventsNames] : eventsNames;
	let listening = true;

	const pushValue = event => {
		if (pullQueue.length !== 0) {
			pullQueue.shift()({ value: event, done: false });
		} else {
			pushQueue.push(event);
		}
	};

	const pullValue = () => {
		return new Promise(resolve => {
			if (pushQueue.length !== 0) {
				resolve({ value: pushQueue.shift(), done: false });
			} else {
				pullQueue.push(resolve);
			}
		});
	};

	const emptyQueue = () => {
		if (listening) {
			listening = false;
			removeEventListeners();
			pullQueue.forEach(resolve => resolve({ value: undefined, done: true }));
			pullQueue.length = 0;
			pushQueue.length = 0;
		}
	};

	const addEventListeners = () => {
		for (const eventName of eventsArray) {
			emitter.addListener(eventName, pushValue);
		}
	};

	const removeEventListeners = () => {
		for (const eventName of eventsArray) {
			emitter.removeListener(eventName, pushValue);
		}
	};

	addEventListeners();

	return {
		next() {
			return listening ? pullValue() : this.return();
		},
		return() {
			emptyQueue();

			return Promise.resolve({ value: undefined, done: true });
		},
		throw(error) {
			emptyQueue();

			return Promise.reject(error);
		},
		[$$asyncIterator]() {
			return this;
		}
	};
}

module.exports = emitterToAsyncIterator;
