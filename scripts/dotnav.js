window.addEventListener("DOMContentLoaded", () => {
	class Navigation {
		constructor() {
			this.curIndex = 0;
			this.maxIndex = null;
			this.count = null;
			this.slider;
			this.buttons;
			this.pauseButton;
			this.items;
			this.isMoving = false;
			this.isPaused = true;
			this.map = [];
			this.animationID;
		}

		getMaxIndex() {
			this.maxIndex = this.items.length - 1;
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

			this.slider.addEventListener(
				"scroll",
				(_) => {
					this.updateIndex();
				},
				this
			);

			this.pauseButton.addEventListener(
				"click",
				(_) => {
					this.updatePause();
				},
				this
			);
		}

		updatePause() {
			this.isPaused = !this.isPaused;

			if (this.isPaused) {
				console.log("Pasued");
				cancelAnimationFrame(this.animationID);
			} else {
				console.log("Sequencing...");
				window.requestAnimationFrame(this.animationID);
			}
		}

		updateCount = (arg) => {
			// reset
			if (arg === "reset") {
				this.count = 0;
				this.requestReset = false;
				return;
			}

			// normal
			else {
				this.count += 1;
				console.log(this.count, this.curIndex);

				if (this.count >= 1000) {
					this.count = 0;
					this.isMoving = true;
					this.curIndex++;
				}
			}
		};

		controlDeltas() {
			if (this.isPaused) return cancelAnimationFrame(this.animationID);

			this.updateCount();
			if (this.isMoving) {
				this.scrollToIndex(this.map[this.curIndex].coordinate);
				this.isMoving = false;
			}
		}

		updateIndex() {
			const curX = this.slider.scrollLeft;
			const element = this.map;

			for (let i = 0; i <= this.maxIndex; i++) {
				if (element[i].coordinate > curX) {
					console.log(i, curX, element[i].coordinate);
					this.curIndex = i;
					this.updateCount("reset");
					return;
				}
			}
		}

		updateDOM() {
			this.buttons.forEach((button, index) => {
				const factor = parseFloat(((1000 - this.count) * -1) / 10);

				if (index === this.curIndex) {
					button.classList.add("dotnav-item-active");
					if (this.count === 999) button.style.setProperty("--dotnav-progress-factor", `0%`);
					else button.style.setProperty("--dotnav-progress-factor", `${factor}%`);
				}
				//
				else {
					button.classList.remove("dotnav-item-active");
				}
			});
		}

		scrollToIndex(delta) {
			this.slider.scrollTo({
				top: 0,
				left: delta,
			});

			this.updateCount("reset");
		}
	}

	const nav = new Navigation();
	nav.buttons = document.querySelectorAll(".dotnav-item");
	nav.pauseButton = document.querySelector(".button-play-pause ");
	nav.items = document.querySelectorAll(".gallery-item");
	nav.slider = document.querySelector(".media-gallery");
	nav.animationID = () => {
		if (nav.count >= 999 && nav.curIndex >= 3) {
			return nav.updatePause();
		}

		nav.controlDeltas();
		nav.updateDOM();
		window.requestAnimationFrame(nav.animationID);
	};

	nav.getMaxIndex();
	nav.getCoordinate();
	nav.addEventListeners();
	nav.animationID();
});
