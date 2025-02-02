window.addEventListener("DOMContentLoaded", () => {
	const container = document.querySelector(".intro-sticky-container");
	const section = document.querySelector(".section-design");
	const video = document.getElementById("design-video");

	function handleVideo() {
		const videoPlayback = 300;
		const ANIMATION_GAP = 300;

		const sectionHeight = section.offsetHeight;

		const scroll = window.scrollY - section.offsetTop;
		const scrollPercent = Math.max(0, parseFloat(((scroll / section.offsetHeight) * 100).toFixed(1)));

		video.currentTime = 0.1;

		//스크롤이 시작되면

		const firstConstrain = 20;
		let firstAnimationIsFinished = false;
		const firstTarget = document.querySelector(".hardware-container");
		const captions = document.querySelectorAll(".screener");
		const firstAnimation = {
			transMin: 1420,
			transMax: 2540,
			scaleMin: 100,
			scaleMax: 170,
		};

		// 기간동안
		if (scrollPercent < firstConstrain) {
			const progress = scrollPercent / firstConstrain;
			const translate = firstAnimation.transMin + (firstAnimation.transMax - firstAnimation.transMin) * progress;
			const scale = firstAnimation.scaleMax - (firstAnimation.scaleMax - firstAnimation.scaleMin) * progress;

			firstTarget.style.setProperty("--translate", `${translate / 10}px`);
			firstTarget.style.setProperty("--scale", scale / 100);

			firstAnimationIsFinished = false;

			if (progress >= 0.9) {
				firstAnimationIsFinished = true;
			}
		}

		if (scrollPercent >= firstConstrain && firstAnimationIsFinished) {
			console.log("TEST 3");
			captions.forEach((caption) => {
				caption.classList.remove("is-disabled");
			});
		}
	}

	const target = container;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log("Start..");
				window.addEventListener("scroll", handleVideo);
			} else {
				console.log("End");
				window.removeEventListener("scroll", handleVideo);
			}
		});
	}, {});

	observer.observe(target);
});
