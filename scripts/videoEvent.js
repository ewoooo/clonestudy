const video = document.getElementById("design-video");
const trigger = document.querySelector(".section-design");

function once(el, event, fn, opts) {
	let onceFn = function (e) {
		el.removeEventListener(event, onceFn);
		fn.apply(this, arguments);
	};
	el.addEventListener(event, onceFn, opts);
	return onceFn;
}

const introItems = Array.from(document.querySelectorAll(`[data-animation-target="1"]`));
const introContainer = document.querySelector(".intro-sticky-container");

const portItemsFirst = Array.from(document.querySelectorAll(`[data-animation-target="2"]`));
const portItemsSecond = Array.from(document.querySelectorAll(`[data-animation-target="3"]`));
const portContainer = document.querySelector(".port-sticky-container");

document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger);

	const intro = gsap.timeline({
		scrollTrigger: {
			trigger: introContainer,
			start: "top top",
			end: "80% bottom",
			scrub: true,
		},
	});

	const videoFlip = gsap.timeline({
		default: {
			ease: "power3.inOut",
		},
		scrollTrigger: {
			trigger: portContainer,
			start: "55% 40%",
			end: "bottom center",
			// markers: true,
			toggleActions: "play pause pause reverse",
		},
	});

	const videoIntersect = gsap.timeline({
		scrollTrigger: {
			trigger: introContainer,
			start: "60% top",
			end: "100% top",
			scrub: true,
		},
	});

	intro.fromTo(
		video,
		{
			y: 140,
			scale: 1.7,
		},
		{
			y: 182,
			scale: 1,
		}
	);
	videoIntersect.fromTo(
		video,
		{
			currentTime: 0,
		},
		{
			currentTime: 1.3,
			y: 200,
		}
	);
	gsap.to(introItems, {
		scrollTrigger: {
			trigger: introContainer,
			start: "60% center",
			end: "100% 100%",
			toggleActions: "play reverse restart reverse",
		},
		opacity: 1,
		duration: 1,
	});

	gsap.to(portItemsFirst, {
		scrollTrigger: {
			trigger: portContainer,
			start: "top 10%",
			end: "50% center",
			markers: true,
			toggleActions: "play reverse restart reverse",
		},
		ease: "power3.inOut",
		opacity: 1,
		duration: 0.2,
	});

	gsap.to(portItemsSecond, {
		scrollTrigger: {
			trigger: portContainer,
			start: "55% 40%",
			end: "bottom center",
			// markers: true,
			toggleActions: "play pause pause reverse",
		},
		ease: "power3.inOut",
		opacity: 1,
		duration: 0.2,
	});

	once(video, "loadedmetadata", () => {
		videoFlip.fromTo(
			video,
			{
				currentTime: 2,
			},
			{
				currentTime: video.duration,
			}
		);
	});
});
