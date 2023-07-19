const pageManager = new PageManager();

document.addEventListener("DOMContentLoaded", () => { pageManager.initMenuEvents() });


function onProductsClicked() {
    pageManager.showProductPage();
}

function onCustomersClicked() {
    pageManager.showCustomerPage();
}

function onOrdersClicked() {
    pageManager.showOrderPage();
}