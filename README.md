## Study

---

## Image Cropping

### Use Absolute;

<Wrapper>
    Positon: Absolute;
    W/H: 100%; //wrapping area

    <Picture>
    H: 100%; // Horizontal Croppping
        <Image>
        H: 100% // Horizontal Cropping
        Object-fit: Cover // Crop Func

### Use Absolute/Grid

<Wrapper>
    Positon: Absolute;
    Display: Grid;
    Justify-contents: center;
    Align-content: center; // Centering <Picture> Item;
    Alight-items: center; // Centering Pictures <Img> Item;
    W/H: 100%; //wrapping area

    <Picture>
    Display: Block;
    Width: ## px;
    Height: ## px;
        <Image>
        none;

### Endpoint Detection

    ```
    const stickyParent = document.querySelector(".intro-sticky-container");
    const stickyEl = stickyParent.children[0];
    let isActive = false;

    window.addEventListener("scroll", () => {
    	const containerRect = stickyParent.getBoundingClientRect();
    	const stickyRect = stickyEl.getBoundingClientRect();
    	const dist = parseInt(containerRect.bottom) - parseInt(stickyRect.bottom);
    	const thres = 300;

    	if (0 < dist && dist <= thres) {
    		console.log(dist);
    		isActive = true;
    	} else {
    		isActive = false;
    	}

    	if (isActive) stickyEl.dataset.test = "true";
    	else stickyEl.dataset.test = "false";

    });
    ```

    getBoundinngClinetRect() 메서드는 화면 상에서 렌더된 벡터와 방향값을 전달함.
    sticky 요소는 Container 요소 안에서만 해당 성질을 유지하므로, Container 하단과 sticky 요소의 하단값이 0 이하인 경우, sticky는 종료가 됨.
    이를 응용하여 container.bottom과 sticky.bottom의 사이 간격을 거리라고 하고, 거리가 임계점을 넘어가면 특정 함수를 실행하도록 유도할 수 있음.

### Pub

1. built
    - global
    - basic (no class)
    - sk
    - ps
    - hidden
2. module
    - sectional case
    - special case
