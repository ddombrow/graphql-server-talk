const AlarmClock = require("../server/lib/AlarmClock");
const { forAwaitEach } = require("iterall");

describe("the alarm clock", () => {
	it("should initialize", () => {
		const ac = new AlarmClock();

		expect(ac.getTime()).toBeTruthy();
		expect(ac.getAlarms()).toMatchObject(new Map());
	});

	it("can set and delete alarms", () => {
		const ac = new AlarmClock();

		let changeCount = 0;
		const changes = forAwaitEach(ac.getAsyncIterator(), val => {
			expect(val).toBeDefined();
			changeCount += 1;
			if (changeCount >= 4) {
				throw {};
			}
		});

		const alarm1 = ac.setAlarm({
			name: "morning",
			time: new Date().getTime() + 10000
		});

		const alarm2 = ac.setAlarm({
			name: "evening",
			time: new Date().getTime() + 50000
		});

		ac.deleteAlarm(alarm1);
		ac.deleteAlarm(alarm2);

		return changes.catch(() => {
			expect(changeCount).toBe(4);
		});
	});
});
