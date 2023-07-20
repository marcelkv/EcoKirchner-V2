const pageManager = new PageManager();
const clientService = new ClientService();
const productManager = new ProductManager(clientService);
const customerManager = new CustomerManager(clientService);

document.addEventListener("DOMContentLoaded", () => {
    pageManager.initMenuEvents();
    productManager.init()
    customerManager.init();
});