window.addEventListener("DOMContentLoaded", () => {
	const indicator = document.querySelector("#performance-gallery-tabnav-indicator");
	const buttons = document.querySelector("#performance-gallery-tabnav-items").children;
	const captions = document.querySelector("#gallery-performance-captions").children;
	const images = document.querySelector("#performance-gallery-item").children;

	class Tab {
		constructor(trigger, caption, image) {
			this.trigger = trigger;
			this.caption = caption;
			this.image = image;
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
			this._pretarget = null;
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
			const index = parseInt(e.currentTarget.dataset.galleryIndex);
			if (this._target && this._target !== this._pretarget) this._pretarget = this._target;
			this.target = index;
			this.updateDom();
		}

		updateDom() {
			this.entries.forEach((entry) => {
				entry.trigger.classList.remove("tabnav-item-active");
				entry.caption.classList.remove("current");
				entry.image.classList.remove("current");
			});
			if (this._pretarget) this._pretarget.image.classList.add("pre");
			this._target.trigger.classList.add("tabnav-item-active");
			this._target.caption.classList.add("current");
			this._target.image.classList.add("current");
			this.updateIndicator();
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

	const nav = new Navigation(
		Array.from(buttons, (button, i) => {
			return new Tab(button, captions[i], images[i]);
		}),
		indicator
	);

	nav.addEventListeners();
	nav.updateIndicator();
});
