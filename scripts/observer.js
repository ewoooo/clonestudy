window.addEventListener("DOMContentLoaded", () => {
	// const parent = document.querySelectorAll(".controller__background");
	// const child = document.querySelectorAll(".controller__child");
	const target = document.querySelectorAll(".controller-container");
	const targets = [...target];

	console.log(targets);
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-active");
					entry.target.classList.remove("is-inactive");
				} else {
					entry.target.classList.add("is-inactive");
					entry.target.classList.remove("is-active");
				}
			});
		},
		{
			threshold: 0.8,
			// rootMargin: "-10% 0px",
		}
	);

	targets.forEach((target) => {
		observer.observe(target);
	});
});
