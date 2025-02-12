window.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelector("#performance-gallery-tabnav-items").children;
	const indicator = document.querySelector("#performance-gallery-tabnav-indicator");
	const gallery = document.querySelector("#gallery-performance-captions").children;
	const photos = document.querySelectorAll("");

	class Tab {
		constructor(trigger, item, photo) {
			this.trigger = trigger;
			this.item = item;
			this.photo = photo;
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
			this.index = undefined;
			this._target = null;
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
			this.target = index;
			console.log(e.currentTarget);
			console.log(this._target);
			this.updateDom();
		}

		updateDom() {
			this.entries.forEach((entry) => {
				entry.trigger.classList.remove("tabnav-item-active");
				entry.item.classList.remove("current");
			});

			this._target.trigger.classList.add("tabnav-item-active");
			this._target.item.classList.add("current");
			this.indicator.style.setProperty(`--tabnav-indicator-start`, `${this._target.offsetX + 6}px`);
			this.indicator.style.setProperty(`--tabnav-indicator-width`, `${this._target.width}px`);
		}
	}

	const nav = new Navigation(
		Array.from(buttons, (button, i) => {
			return new Tab(button, gallery[i], photo[i]);
		}),
		indicator
	);

	console.log(nav);
	nav.addEventListeners();
});
