window.addEventListener("DOMContentLoaded", () => {
	let index = 0;
	let amount = 0;
	let isPaused = false;
	const inc = 1;
	const delta = 0.1;

	const target = document.querySelector(".dotnav-items");
	const children = Array.from(target.children);
	const limit = children.length;

	const loop = requestAnimationFrame(setIndex);
	const button = document.querySelector(".button");

	button.addEventListener("click", () => {
		return (isPaused = !isPaused);
	});

	function setIndex() {
		if (index >= limit) return cancelAnimationFrame(loop);

		if (amount >= 100) {
			index++;
			amount = 0;
		}

		if (!isPaused) amount += inc * delta;
		console.log(amount);
		const ac = (100 - amount) * -1;

		children.forEach((item, i) => {
			if (i == index) {
				item.style.setProperty("--dotnav-inc", `${ac.toFixed(2)}%`);
				item.style.setProperty("--dotnav-width", `56px`);
				target.style.setProperty("--dontnav-index", index);
			} else {
				item.style.setProperty("--dotnav-inc", "-100%");
				item.style.setProperty("--dotnav-width", "8px");
			}
		});

		requestAnimationFrame(setIndex);
	}
});
