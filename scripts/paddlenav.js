class Item {
	constructor(element) {
		this.target = element;
	}

	get x() {
		return this.target.offsetLeft;
	}
}

class Controller {
	constructor(container, buttons, entries) {
		this.container = container;
		this.entries = entries;
		this.buttons = buttons;
		this.index = 0;
		this.offsets = this.map();
		this.width = this.container.scrollWidth;
		this.maxDist = this.container.scrollWidth - this.container.clientWidth;
	}

	map() {
		const map = [];
		for (let entry of this.entries) {
			map.push(entry.x);
		}
		return map;
	}

	addEventListeners() {
		this.buttons[0].addEventListener(
			"click",
			() => {
				this.click("pre");
			},
			this
		);

		this.buttons[1].addEventListener(
			"click",
			() => {
				this.click("next");
			},
			this
		);

		this.container.addEventListener(
			"scroll",
			() => {
				this.curIndex;
			},
			this
		);
	}

	get dist() {
		return this.container.scrollLeft;
	}

	get curIndex() {
		for (let i = 0; i < this.entries.length; i++) {
			if (this.offsets[i] > this.dist) {
				this.index = i;
				console.log(this.offsets[i], this.dist, this.maxDist, i);
				break;
			}
		}
		return this.index;
	}

	click(arg) {
		if (arg === "next") {
			this.index++;

			this.container.scrollTo({
				top: 0,
				left: this.offsets[this.index],
			});
		}

		if (arg === "pre") {
			this.index--;

			this.container.scrollTo({
				top: 0,
				left: this.offsets[this.index],
			});
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const container = document.querySelector(".scroll-container");
	const buttons = Array.from(document.querySelectorAll(".paddlenav-arrow"));
	const item = Array.from(document.querySelectorAll(".icon-card"), (el) => new Item(el));
	const tab = new Controller(container, buttons, item);

	console.log(tab);
	// container.addEventListener("scroll", () => {
	// 	console.log(container.scrollLeft);
	// });

	tab.addEventListeners();
});
