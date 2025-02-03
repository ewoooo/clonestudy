class stickyObserver {
	constructor(targets) {
		this.targets = targets.map((target, index) => ({
			...target,
			id: index,
			dist: this.dist(target),
			ratio: this.ratio(target),
			assets: this.getAnimationTargets(target),
			isActive: null,
			isStick: null,
		}));
		this.threshold = 400;
		this.enterSafeArea = false;
	}

	dist({ container, target }) {
		return container.getBoundingClientRect().bottom - target.getBoundingClientRect().bottom;
	}

	ratio({ container, target, dist }) {
		const maxDist = container.offsetHeight - target.offsetHeight;
		const curDist = dist === undefined || dist === null ? this.dist({ container, target }) : dist;
		return Number((1 - curDist / maxDist).toFixed(2));
	}

	observe() {
		for (let target of this.targets) {
			target.dist = this.dist(target);
			target.ratio = this.ratio(target);
			this.checkTouchpoint(target);
			this.updateDOM(target);
		}
	}

	checkTouchpoint(target) {
		if (0 < target.dist && target.dist <= this.threshold) target.isActive = true;
		else target.isActive = false;

		if (0 < target.dist && target.dist <= this.threshold * 0.8) this.enterSafeArea = true;
		else this.enterSafeArea = false;
	}

	updateDOM({ container, target, isActive, assets }) {
		if (isActive) {
			container.classList.add("is-active");
			target.classList.add("is-active");
			this.uppdateAssets(assets, isActive);
		} else {
			container.classList.remove("is-active");
			target.classList.remove("is-active");
			this.uppdateAssets(assets, isActive);
		}
	}

	getAnimationTargets({ target }) {
		return Array.from(target.querySelectorAll(".animation-target"));
	}

	uppdateAssets(assets, isActive) {
		if (isActive) {
			for (let asset of assets) {
				asset.classList.add("is-visible");
			}
		}

		if (!isActive) {
			for (let asset of assets) {
				asset.classList.remove("is-visible");
			}
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const video = document.getElementById("design-video");
	const targets = document.querySelectorAll(".sticky-element");
	const targetArray = Array.from(targets).map((target) => ({ container: target.closest(".sticky-container"), target }));
	const observer = new stickyObserver(targetArray);
	let isScrolling = false;

	window.addEventListener("scroll", onScroll, { passive: true });

	function onScroll() {
		if (isScrolling) return;

		isScrolling = true;
		requestAnimationFrame(() => {
			observer.observe();
			window.addEventListener("wheel", onWheel, { passive: false });
			// if (observer.enterSafeArea) window.addEventListener("wheel", onWheel, { passive: false });
			// else removeEventListener("wheel", onWheel, { passive: false });

			resizeVideo(video, observer.targets[0].ratio, "scaleDown");
			isScrolling = false;
		});
	}

	function onWheel(e) {
		e.preventDefault();
		console.log("tick");
		window.scrollBy({
			top: e.deltaY * 1,
		});
	}
});

let startVideo = false;

function resizeVideo(target, delta, args) {
	let tVal, sVal;
	const tMin = 142;
	const tMax = 254;
	const sMin = 100;
	const sMax = 170;

	if (!startVideo && args === "scaleDown") {
		tVal = tMin + (tMax - tMin) * delta;
		sVal = (sMax - (sMax - sMin) * delta) / 100;
	}

	if (args === "scaleUp") {
		tVal = tMin - (tMax - tMin) * delta;
		sVal = (sMax + (sMax - sMin) * delta) / 100;
	}

	target.style.setProperty("--translate", `${tVal}px`);
	target.style.setProperty("--scale", `${sVal}`);
}
