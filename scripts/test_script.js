window.addEventListener("DOMContentLoaded", () => {
	// Button
	const button = document.querySelector(".button");
	button.addEventListener("click", () => {
		return (nav.isPaused = !nav.isPaused);
	});

	const button2 = document.querySelector(".button-re");
	button2.addEventListener("click", () => {
		console.log(nav.isReversed);
		return (nav.isReversed = !nav.isReversed);
	});

	const button3 = document.querySelector(".button-to");
	button3.addEventListener("click", () => {
		nav.targetIndex = 1;
		nav.isMoving = true;
		console.log(nav.isMoving);
	});

	const loop = requestAnimationFrame(animateNav);

	let nav = {
		curIndex: 0,
		targetIndex: 0,
		amount: 0,
		spd: 1,
		isMoving: false,
		isReversed: false,
		isPaused: false,
	};

	const container = document.querySelector(".dotnav-items");
	const children = Array.from(container.children);
	const maxAmount = 100;
	const minAmount = 0;

	// Index Contraint
	nav.maxIndex = children.length - 1;

	function animateNav() {
		// 일시정지 해제
		if (!nav.isPaused) {
			// 타겟 있음
			if (nav.isMoving) {
				nav.spd = 2;
				checkFlag(nav);
				updateAmount(nav);
				updateIndexMoving(nav);
			}
			// 타겟 없음
			else {
				nav.spd = 0.5;
				updateAmount(nav);
				updateIndex(nav);
			}
			console.log(nav.curIndex, nav.amount);
			updateDOM(nav);
		}
		// Callback
		requestAnimationFrame(animateNav);
	}

	function updateAmount(obj) {
		// 증감
		if (obj.amount < maxAmount && !obj.isReversed) obj.amount += obj.spd;
		if (obj.amount > minAmount && obj.isReversed) obj.amount -= obj.spd;

		// 제한
		if (obj.amount >= maxAmount) obj.amount = maxAmount;
		if (obj.amount <= minAmount) obj.amount = minAmount;
	}

	function updateIndexMoving(obj) {
		if (obj.amount === maxAmount && !obj.isReversed) {
			if (obj.curIndex < obj.targetIndex) {
				obj.curIndex++;
				obj.amount = minAmount;
			}
		}

		if (obj.amount === minAmount && obj.isReversed) {
			if (obj.curIndex > obj.targetIndex) {
				obj.curIndex--;
				obj.isReversed = true;
				obj.amount = minAmount;
			}
		}

		if (obj.curIndex === obj.targetIndex) {
			obj.isMoving = false;
			obj.isReversed = false;
			obj.amount = 0;
		}
	}

	function updateIndex(obj) {
		// 증가
		if (obj.amount === maxAmount && !obj.isReversed) {
			// 최대 인덱스에 도달하면 종료
			if (obj.curIndex === obj.maxIndex) {
				return;
			}

			obj.curIndex++;
			obj.amount = minAmount;
		}

		// 감소
		if (obj.amount === minAmount && obj.isReversed) {
			// 최소 인덱스에 도달하면 종료
			if (obj.curIndex === 0) {
				return;
			}

			obj.curIndex--;
			obj.amount = maxAmount;
		}
	}

	function updateDOM(obj) {
		const ac = (100 - obj.amount) * -1;
		children.forEach((item, i) => {
			if (i === obj.curIndex) {
				item.style.setProperty("--dotnav-inc", `${ac.toFixed(2)}%`);
				item.style.setProperty("--dotnav-width", `56px`);
			} else {
				item.style.setProperty("--dotnav-inc", "-100%");
				item.style.setProperty("--dotnav-width", "8px");
			}
		});
	}

	function checkFlag(obj) {
		if (obj.curIndex < obj.targetIndex) obj.isReversed = false;
		if (obj.curIndex > obj.targetIndex) obj.isReversed = true;
		else obj.isReversed = false;
	}
});
