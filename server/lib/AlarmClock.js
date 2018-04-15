const shortid = require("shortid");
const EventEmitter = require("events");
const emitterToAsyncIterator = require("../lib/emitter-to-async-iterator");

class AlarmClock {
	constructor() {
		this.alarms = new Map();
		this.alarmBus = new EventEmitter();
	}

	getTime() {
		return new Date().getTime();
	}

	getAlarms() {
		return this.alarms;
	}

	getAlarm(id) {
		return this.alarms.get(id);
	}

	setAlarm({ time, name }) {
		const id = shortid.generate();
		const val = {
			id,
			name,
			time
		};
		this.alarms.set(id, val);
		this.alarmBus.emit("change", val);
		return id;
	}

	deleteAlarm(id) {
		this.alarms.delete(id);
		this.alarmBus.emit("change", { id });
	}

	sliceValues(map) {
		const slice = new Map(map);
		return Array.from(slice.values());
	}

	getAsyncIterator() {
		return emitterToAsyncIterator(this.alarmBus, ["change"]);
	}
}

module.exports = AlarmClock;
