window.addEventListener("DOMContentLoaded", () => {
	class Slider {
		constructor() {
			this.curIndex = 0;
			this.maxIndex = null;
			this.distance = null;
			this.anchor;
			this.slider;
			this.items;
			this.buttons;
			this.map = [];
		}

		getMaxIndex() {
			this.maxIndex = this.items.length - 1;
			return this.maxIndex;
		}

		getDistance() {
			this.distance = this.slider.offsetWidth;
			return this.distance;
		}

		getCoordinates() {
			let index = 0;
			for (let item of this.items) {
				this.map.push({ index: index, coordinate: item.offsetLeft });
				index++;
			}
		}

		updateDOM(arg) {
			const buttons = Array.from(this.buttons);
			buttons.forEach((button) => button.classList.remove("button-disabled"));

			if (arg === "max") buttons[1].classList.add("button-disabled");
			if (arg === "min") buttons[0].classList.add("button-disabled");
		}

		addEventListeners() {
			const events = [this.thumbLeft.bind(this), this.thumbRight.bind(this)];
			Array.from(this.buttons).forEach((button, index) => {
				button.addEventListener("click", events[index]);
			});

			this.slider.addEventListener("scroll", () => {
				this.updateIndex();
			});
		}

		updateIndex() {
			const curX = this.slider.scrollLeft;
			const element = this.map;
			for (let i = 0; i <= this.maxIndex; i++) {
				if (element[i].coordinate > curX) {
					console.log(i, curX);
					return (this.curIndex = i);
				}
			}
		}

		updateSnapControl() {
			this.slider.classList.remove("slide-snap-control");
			setTimeout(() => {
				this.slider.classList.add("slide-snap-control");
			}, 100);
		}

		thumbLeft() {
			if (this.curIndex > 0) {
				this.scroll(-this.distance);
				this.updateIndex();
				this.updateDOM();
				this.updateSnapControl();
			} else {
				this.updateDOM("min");
			}
		}

		thumbRight() {
			if (this.curIndex < this.maxIndex) {
				this.scroll(this.distance);
				this.updateIndex();
				this.updateDOM();
				this.updateSnapControl();
			} else {
				this.updateDOM("max");
			}
		}

		scroll(delta) {
			this.slider.scrollBy({
				top: 0,
				left: delta,
			});
		}
	}

	const slide = new Slider();

	slide.slider = document.querySelector(".slide-gallery-scroll");
	slide.container = document.querySelector(".slide-gallery-items");
	slide.buttons = document.querySelectorAll(".paddle-button");
	slide.items = document.querySelectorAll(".slide-gallery-item");

	slide.getCoordinates();
	slide.getMaxIndex();
	slide.getDistance();
	slide.addEventListeners();
	slide.updateIndex();

	console.log(slide);
});
