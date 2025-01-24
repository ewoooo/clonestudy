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
