window.addEventListener("DOMContentLoaded", () => {
	const children = document.querySelectorAll(".dotnav-item");
	const target = document.querySelectorAll(".controller-container");
	const targets = [...target];

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-active");
					entry.target.classList.remove("is-inactive");
					controlChildren("add");
				} else {
					entry.target.classList.add("is-inactive");
					entry.target.classList.remove("is-active");
					controlChildren("remove");
				}
			});
		},
		{
			threshold: 0.9,
		}
	);

	targets.forEach((target) => {
		observer.observe(target);
	});

	function controlChildren(args) {
		if (args == "add") {
			children.forEach((child) => {
				child.classList.add("is-active");
				child.classList.remove("is-inactive");
			});
		}
		if (args == "remove") {
			children.forEach((child) => {
				child.classList.add("is-inactive");
				child.classList.remove("is-active");
			});
		}
	}
});
