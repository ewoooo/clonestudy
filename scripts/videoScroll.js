window.addEventListener("DOMContentLoaded", () => {
	const videoEl = document.querySelector("#design-video");
	const video = new VideoControl(new Video(videoEl));
	const triggers = Array.from(document.querySelectorAll(".sticky-element")).map((element) => new Trigger(element));

	for (let trigger of triggers) video.add(trigger);

	console.log(video.triggers);

	let isScrolling = false;
	window.addEventListener("scroll", onScroll, { passive: true });

	function onScroll() {
		if (isScrolling) return;

		isScrolling = true;
		window.requestAnimationFrame(() => {
			video.find();
			isScrolling = false;
		});
	}
});

class Video {
	constructor(element) {
		this.element = element;
		this.current = 0;
		this.duration = this.duration();
	}

	duration() {
		setTimeout(() => {
			return (this.duration = this.element.duration);
		}, 100);
	}
}

class Trigger {
	constructor(element) {
		this.element = element;
		this.delta = this.delta();
	}

	delta() {
		const cY = this.element.getBoundingClientRect().top;
		const wY = this.element.offsetHeight;
		this.delta = cY / wY;
		return this.delta;
	}
}

class VideoControl {
	constructor(element) {
		this.target = element;
		this.triggers = [];
		this.trigger;
		this.delta = 0;
	}

	add(obj) {
		this.triggers.push(obj);
	}

	find() {
		const tolerance = 5;
		for (let trigger of this.triggers) {
			const cY = trigger.element.getBoundingClientRect().top;
			if (Math.abs(cY) <= tolerance) {
				return (this.trigger = trigger);
			}
		}
		console.log("Trigger not found");
		// return (this.trigger = undefined);
	}

	pull() {
		this.trigger.delta();
	}

	// play() {
	// 	this.target.cu;
	// }
}
