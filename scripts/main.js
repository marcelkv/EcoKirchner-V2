const pageManager = new PageManager();
const clientService = new ClientService();
const productManager = new ProductManager(clientService);

document.addEventListener("DOMContentLoaded", () => {
    pageManager.initMenuEvents();
    productManager.init()
});

function onProductsClicked() {
    pageManager.showProductPage();
}

function onCustomersClicked() {
    pageManager.showCustomerPage();
}

function onOrdersClicked() {
    pageManager.showOrderPage();
}