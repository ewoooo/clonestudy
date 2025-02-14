class Tab {
	constructor(trigger, caption, image, id) {
		this.trigger = trigger;
		this.caption = caption;
		this.image = image;
		this.id = id;
	}

	get offsetX() {
		return this.trigger.offsetLeft;
	}

	get width() {
		return this.trigger.offsetWidth;
	}
}

class Navigation {
	constructor(entries, indicator) {
		this.indicator = indicator;
		this.entries = entries;
		this.index = null;
		this._target = null;
		// this._pretarget = null;
	}

	set target(i) {
		this._target = this.entries[i];
	}

	get target() {
		return this._target;
	}

	addEventListeners() {
		this.entries.forEach((item) => {
			item.trigger.addEventListener("click", this.onClick.bind(this));
		});
	}

	onClick(e) {
		const index = Number(e.currentTarget.dataset.galleryIndex);
		// if (this._target !== this.entries[index]) this._pretarget = this._target;

		this.target = index;
		this.updateDom();
	}

	updateDom() {
		this.entries.forEach((entry) => {
			entry.trigger.classList.remove("tabnav-item-active");
			entry.caption.classList.remove("current");
			entry.image.classList.remove("current");
			// entry.image.classList.remove("pre");
		});
		this._target.trigger.classList.add("tabnav-item-active");
		this._target.caption.classList.add("current");
		this._target.image.classList.add("current");
		this.updateIndicator();
		// if (this._pretarget) this._pretarget.image.classList.add("pre");
	}

	updateIndicator() {
		if (!this._target) {
			this.indicator.style.setProperty(`--tabnav-indicator-start`, `${this.entries[0].offsetX + 6}px`);
			this.indicator.style.setProperty(`--tabnav-indicator-width`, `${this.entries[0].width}px`);
		} else {
			this.indicator.style.setProperty(`--tabnav-indicator-start`, `${this._target.offsetX + 6}px`);
			this.indicator.style.setProperty(`--tabnav-indicator-width`, `${this._target.width}px`);
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	function createNav(indicator, buttons, captions, images) {
		const ind = document.querySelector(indicator);
		const b = document.querySelector(buttons).children;
		const c = document.querySelector(captions).children;
		const img = document.querySelector(images).children;

		return new Navigation(
			Array.from(b, (button, i) => {
				return new Tab(button, c[i], img[i], i);
			}),
			ind
		);
	}

	let navigations = [];

	navigations.push(createNav("#performance-gallery-tabnav-indicator", "#performance-gallery-tabnav-items", "#gallery-performance-captions", "#performance-gallery-item"));

	navigations.push(createNav("#macOS-tabnav-indicator", "#macOS-tabnav-buttons", "#macOS-tabnav-captions", "#macOS-tabnav-images"));

	for (let nav of navigations) {
		nav.addEventListeners();
		nav.updateIndicator();

		console.log(nav);
	}
});
