class PageManager {
    get mainPage() {
        return document.querySelector(".page.main");
    }

    get productsPage() {
        return document.querySelector(".page.products");
    }

    get productPage() {
        return document.querySelector(".page.product");
    }

    get customers() {
        return document.querySelector(".page.customers");
    }

    get customer() {
        return document.querySelector(".page.customer");
    }

    get orders() {
        return document.querySelector(".page.orders");
    }

    get order() {
        return document.querySelector(".page.order");
    }

    get menuButton() {
        return document.querySelector(".header-menu-button");
    }

    get menuLarge() {
        return document.querySelector(".header-menu-large");
    }

    get largeMenuItems() {
        return this.menuLarge.querySelectorAll(".menu-item");
    }

    get menu() {
        return document.querySelector(".menu");
    }

    get menuItems() {
        return this.menu.querySelectorAll(".menu-item");
    }

    get backButton() {
        return document.querySelector(".header-back-button");
    }

    get isMenuButtonOpen() {
        return this.menuButton.classList.contains(this.className_open);
    }

    constructor() {
        this.menuEventsInitialized = false;
        this.className_active = "active";
        this.className_open = "open";
        this.className_hidden = "hidden";
        this.onSaveFileRequested = null;
        this.onLoadFileRequested = null;
    }

    initMenuEvents() {
        if (this.menuEventsInitialized) {
            return;
        }

        this.backButton.addEventListener("click", () => this.onBackButtonClick());
        this.menuButton.addEventListener("click", () => this.onMenuButtonClick());
        this.menuItems.forEach((menuItem, index) => {
            menuItem.addEventListener("click", () => this.onMenuItemClick(index))
        });
        this.largeMenuItems.forEach((menuItem, index) => {
            menuItem.addEventListener("click", () => this.onMenuItemClick(index))
        })
        this.menuEventsInitialized = true;
    }

    toggleMenuButton() {
        if (this.isMenuButtonOpen) {
            this.closeMenu();
        }
        else {
            this.openMenu();
        }
    }

    closeMenu() {
        this.menuButton.classList.remove(this.className_open);
        this.menu.classList.remove(this.className_open);
    }

    openMenu() {
        this.menuButton.classList.add(this.className_open);
        this.menu.classList.add(this.className_open);
    }

    onBackButtonClick() {
        this.onMenuItemClick(this.previousPageIndex);
    }

    onMenuButtonClick() {
        this.toggleMenuButton();
    }

    onMenuItemClick(index) {
        if (index === 0) {
            this.showProductsPage();
        }
        else if (index === 1) {
            this.showCustomersPage();
        }
        else if (index === 2) {
            this.showOrdersPage();
        }
        else if (index === 3) {
            this.hideMenu();
            this.onSaveFileRequested();
        }
        else if (index === 4) {
            this.hideMenu();
            this.onLoadFileRequested();
        }
    }

    showProductsPage() {
        this.hideAll();
        this.showElement(this.productsPage);
    }

    showProductPage() {
        this.hideAll();
        this.showBackButton();
        this.showElement(this.productPage);
        this.previousPageIndex = 0;
    }

    showCustomersPage() {
        this.hideAll();
        this.showElement(this.customers);
    }

    showCustomerPage() {
        this.hideAll();
        this.showBackButton();
        this.showElement(this.customer);
        this.previousPageIndex = 1;
    }

    showOrdersPage() {
        this.hideAll();
        this.showElement(this.orders);
    }

    showOrderPage() {
        this.hideAll();
        this.showBackButton();
        this.showElement(this.order);
        this.previousPageIndex = 2;
    }

    showBackButton() {
        this.backButton.classList.add(this.className_active);
    }

    hideAll() {
        this.hideElement(this.mainPage);
        this.hideElement(this.productsPage);
        this.hideElement(this.productPage);
        this.hideElement(this.customers);
        this.hideElement(this.customer);
        this.hideElement(this.orders);
        this.hideElement(this.order);
        this.hideMenu();
        this.hideBackButton();
    }

    hideMenu() {
        this.menuButton.classList.remove(this.className_open);
        this.menu.classList.remove(this.className_open);
    }

    hideBackButton() {
        this.backButton.classList.remove(this.className_active);
    }

    hideElement(element) {
        element.classList.add(this.className_hidden);
    }

    showElement(element) {
        element.classList.remove(this.className_hidden);
    }
}