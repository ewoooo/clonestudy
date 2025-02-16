window.addEventListener("DOMContentLoaded", () => {
	const select = document.querySelector("#upgraders-select");
	const intel = document.querySelector("#intel-18-gallery-item");
	const m1 = document.querySelector("#m1-20-gallery-item");

	const entries = [intel, m1];

	console.log(intel, m1);

	select.addEventListener("change", () => {
		const s = select.options[select.selectedIndex].dataset.label;
		console.log(s);
		updateDom(s);
	});

	function updateDom(arg) {
		if (arg === "intel") {
			entries[0].classList.add("current");
			entries[1].classList.remove("current");
		}

		if (arg === "m1") {
			entries[0].classList.remove("current");
			entries[1].classList.add("current");
		}
	}
});
