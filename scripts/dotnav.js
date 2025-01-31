window.addEventListener("DOMContentLoaded", () => {
	class Navigation {
		constructor() {
			this.curIndex = null;
			this.maxIndex = null;
			this.slider;
			this.buttons;
			this.items;
			this.map = [];
		}

		getMaxIndex() {
			this.maxIndex = this.items.lenght - 1;
		}

		getCoordinate() {
			this.items.forEach((item, index) => {
				this.map.push({ item: item, index: index, coordinate: item.offsetLeft });
			});
		}

		addEventListeners() {
			this.buttons.forEach((button, index) =>
				button.addEventListener(
					"click",
					(_) => {
						this.scrollToIndex(this.map[index].coordinate);
						this.updateIndex();
					},
					this
				)
			);

			this.slider.addEventListener("scroll", this.updateIndex, this);
		}

		updateIndex() {
			const curX = this.slider.scrollLeft;
			console.log(curX);
		}

		scrollToIndex(delta) {
			this.slider.scrollTo({
				top: 0,
				left: delta,
			});
		}
	}

	const nav = new Navigation();
	nav.buttons = document.querySelectorAll(".dotnav-item");
	nav.items = document.querySelectorAll(".gallery-item");
	nav.slider = document.querySelector(".media-gallery");

	nav.getMaxIndex();
	nav.getCoordinate();
	nav.addEventListeners();

	console.log(nav);
});
