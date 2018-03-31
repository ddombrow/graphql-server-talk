class State {
	constructor() {
		this.time = new Date().getTime();
		/*setInterval(() => {
			let oldTime = this.getTime();
			this.setTime(oldTime + 1000);
		});*/
	}

	setTime(time) {
		this.time = time;
		return this.time;
	}

	getTime() {
		return this.time;
	}
}

module.exports = State;
