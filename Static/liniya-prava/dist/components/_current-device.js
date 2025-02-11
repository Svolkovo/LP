const isMobileActive = () => {
    const minWidth = 992;
    return window.innerWidth < minWidth || screen.width < minWidth;
}  