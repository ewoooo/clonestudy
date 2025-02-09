window.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelector("").children;
	const gallery = document.querySelector("").children;
	const indicator = document.querySelector("");
	const nav = new Navigation(
		Array.from(buttons, (button, i) => {
			return new Tab(button, gallery[i]);
		}),
		indicator
	);

	class Tab {
		constructor(trigger, item) {
			this.trigger = trigger;
			this.item = item;
		}

		get offsetX() {
			return this.trigger.offsetLeft;
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
			const index = parseInt(e.currentTarget.dataset.index);
			this.target = index;
			this.updateDom();
		}

		updateDom() {
			this.entries.forEach((entry) => {
				entry.trigger.classList.remove("active");
				entry.item.classList.remove("active");
			});

			this._target.trigger.classList.add("active");
			this._target.item.classList.add("active");
			this.indicator.style.setProperty(`--tabnav-indicator-offsetX`, `${this._target.offsetX}px`);
		}
	}

	nav.addEventListeners();
});
