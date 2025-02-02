class NavigationControl {
	constructor() {
		this.curVal = 0;
		this.targetVal = null;
		this.maxVal = 3990;
		this.minVal = 0;
		this.inc = 2;
		this.index = null;
		this.indexDiff = null;
		this.amount = null;
		this.isReversed = false;
		this.isTransporting = false;
		this.isPaused = false;
	}

	increase() {
		this.curVal += this.inc;
		if (!this.isTransporting && this.curVal >= this.maxVal) {
			this.curVal = this.maxVal;
			this.isPaused = true; // Pause All
		}
		if (this.isTransporting && this.curVal >= this.targetVal) this.curVal = this.targetVal;

		return this.curVal;
	}

	decrease() {
		this.curVal -= this.inc;
		if (!this.isTransporting && this.curVal <= this.minVal) this.curVal = this.minVal;
		if (this.isTransporting && this.curVal <= this.targetVal) this.curVal = this.targetVal;

		return this.curVal;
	}

	togglePause() {
		this.isPaused = !this.isPaused;

		if (this.isPaused) {
			console.log("Pasued");
			cancelAnimationFrame(this.animation);
		} else {
			console.log("Sequencing...");
			requestAnimationFrame(this.animation);
		}
	}

	checkEndpoint() {
		if (this.targetVal < this.curVal) this.isReversed = true;
		if (this.targetVal > this.curVal) this.isReversed = false;

		if (this.curVal === this.targetVal) {
			console.log("Transport Ends: ", this.curVal, this.targetVal);
			this.isTransporting = false;
			this.isReversed = false;
			control.inc = 2;
		}
	}

	checkIndex() {
		if (this.index !== this.indexDiff) {
			console.log("인덱스 변경");
		}

		this.indexDiff = this.index;
	}

	update() {
		this.index = Math.floor(this.curVal / 1000);
		this.amount = Number(((this.curVal % 1000) / 10).toFixed(1));
	}
}

const control = new NavigationControl();

control.animation = () => {
	if (control.isPaused) return cancelAnimationFrame(control.animation);

	if (control.isTransporting) control.checkEndpoint();

	if (!control.isReversed) control.increase();
	if (control.isReversed) control.decrease();

	control.update();

	updateDOM(control);
	requestAnimationFrame(control.animation);
};

requestAnimationFrame(control.animation);
const items = document.querySelectorAll(".dotnav-item");
const images = document.querySelectorAll(".gallery-item");
const button = document.querySelector(".button-play-pause");

function updateDOM({ index, amount }) {
	const factor = parseFloat(((100 - amount) * -1).toFixed(1));

	items.forEach((item, i) => {
		if (i === index) {
			item.classList.add("dotnav-item-active");
			if (amount === 99) item.style.setProperty("--dotnav-progress-factor", `0%`);
			else item.style.setProperty("--dotnav-progress-factor", `${factor}%`);
		} else {
			item.classList.remove("dotnav-item-active");
		}
	});
}

images.forEach((item) => {
	console.log(item.scrollX);
});

items.forEach((button, index) => {
	button.setAttribute("data-index-value", index);

	button.addEventListener("click", () => {
		const value = button.getAttribute("data-index-value");
		move(value);
	});
});

button.addEventListener("click", togglePause);

function move(value) {
	if (control.isPaused) control.togglePause();
	control.targetVal = value * 1000;
	control.isTransporting = true;
	control.inc = 20;
}
function togglePause() {
	control.togglePause();
}
