class stickyObserver {
	constructor() {
		this.entries = [];
		this.target = undefined;
		this.video = undefined;
		this.threshold = 400;
		this.isSafe = null;
	}

	add(entry) {
		return this.entries.push(entry);
	}

	findTarget() {
		const tolerance = 5;
		for (let entry of this.entries) {
			const t = entry.target.getBoundingClientRect();
			if (0 <= t.top && t.top <= tolerance) {
				console.log(t);
				return (this.target = entry);
			}
		}
		return (this.target = undefined);
	}

	observe() {
		if (!this.target) {
			this.updateEvents();
			return;
		}

		// calc
		this.target.isObserved();
		this.updateStates(this.target);

		this.controlDOM();

		// console.log(this.target.query);
		this.sendQuery(this.target.query);
	}

	updateStates(obj) {
		if (0 < obj.distance[0] && obj.distance[0] <= this.threshold) this.isSafe = true;
		else this.isSafe = false;
	}

	sendQuery({ scale, play }) {
		this.video.scale(scale, this.target.ratio);
		this.video.play(play, this.target.ratio);
	}

	controlDOM() {
		if (this.isSafe) {
			this.updateDOM("add");
			this.updateEvents("add");
		} else {
			this.updateEvents("remove");
			this.updateDOM();
		}
	}

	updateDOM(arg) {
		if (arg === "add") {
			this.target.target.classList.add("is-active");
			this.target.entries.forEach((entry) => {
				entry.classList.add("is-visible");
			});
		} else {
			this.target.target.classList.remove("is-active");
			this.target.entries.forEach((entry) => {
				entry.classList.remove("is-visible");
			});
		}
	}

	updateEvents(arg) {
		if (arg === "add") window.addEventListener("wheel", this.wheelEventID, { passive: false });
		else window.removeEventListener("wheel", this.wheelEventID, { passive: false });
	}
}

class StickyElement {
	constructor(obj) {
		this.container = obj.container;
		this.target = obj.target;
		this.entries = this.getEntries();
		this.distance = this.calcDist();
		this.ratio = this.calcRatio();
		this.query = this.getQuery();
		this.isSticked = null;
	}

	getQuery() {
		const data = this.target.dataset;
		return { scale: data.videoScaleQuery ? data.videoScaleQuery : false, play: data.videoPlayQuery ? data.videoPlayQuery : false };
	}

	calcDist() {
		const c = this.container.getBoundingClientRect();
		const t = this.target.getBoundingClientRect();
		return (this.distance = [c.bottom - t.bottom, c.top - t.top]);
	}

	calcRatio() {
		const maxDist = this.container.offsetHeight - this.target.offsetHeight;
		const curDist = this.distance[1];

		return (this.ratio = Math.abs(curDist / maxDist));
	}

	getEntries() {
		return Array.from(this.target.querySelectorAll(".animation-target"));
	}

	isObserved() {
		this.calcDist();
		this.calcRatio();
	}
}

class VideoElement {
	constructor(element) {
		this.element = element;
		this.speed = null;
		this.curTime = 0;
		this.targetTime = 1.2;
		this.playTime = 0;
		this.tVal = 0;
		this.sVal = 0;
	}

	get duration() {
		return this.element.duration;
	}

	play(args, delta) {
		if (!args) return;

		if (args === "play") {
			console.log("Playing...");
			this.curTime = this.targetTime * delta;
		}

		this.element.currentTime = this.curTime;
	}

	scale(args, delta) {
		const tMin = 142;
		const tMax = 254;
		const sMin = 100;
		const sMax = 170;

		if (!args) return;

		if (args === "down") {
			this.tVal = tMin + (tMax - tMin) * delta;
			this.sVal = (sMax - (sMax - sMin) * delta) / 100;
		}

		if (args === "up") {
			this.tVal = tMin - (tMax - tMin) * delta;
			this.sVal = (sMax + (sMax - sMin) * delta) / 100;
		}

		this.element.style.setProperty("--translate", `${this.tVal}px`);
		this.element.style.setProperty("--scale", `${this.sVal}`);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const observer = new stickyObserver();
	const video = new VideoElement(document.getElementById("design-video"));
	const stickyElements = Array.from(document.querySelectorAll(".sticky-element")).map((target) => ({ container: target.closest(".sticky-container"), target }));
	for (let element of stickyElements) observer.add(new StickyElement(element));

	// add Elements
	observer.video = video;
	observer.wheelEventID = (e) => {
		e.preventDefault();
		window.scrollBy({
			top: e.deltaY * 0.4,
		});
	};

	// scroll event
	window.addEventListener("scroll", onScroll, { passive: true });

	let isScrolling = false;
	function onScroll() {
		if (isScrolling) return;

		isScrolling = true;
		requestAnimationFrame(() => {
			//
			observer.findTarget();
			observer.observe();

			isScrolling = false;
		});
	}
});
