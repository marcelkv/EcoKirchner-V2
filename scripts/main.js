const pageManager = new PageManager();
const fileManager = new FileManager();
const clientService = new ClientService();
const productManager = new ProductManager(clientService);
const customerManager = new CustomerManager(clientService);
const orderManager = new OrderManager(clientService);
const demoData = new DemoData();
clientService.updateData = () => updateData();
clientService.setAppData(demoData.appDataDto);

pageManager.onLoadFileRequested = () => fileManager.selectFile();
pageManager.onSaveFileRequested = () => clientService.onSaveAppDataRequested();

fileManager.onAppDataReady = (appData) => setAppData(appData);
clientService.saveAppData = (appData) => fileManager.writeToFile(appData);
orderManager.onOrderSelected = (orderVm) => pageManager.showOrderPage();

document.addEventListener("DOMContentLoaded", () => {
    pageManager.initMenuEvents();
    fileManager.init();
    updateData();
});

function setAppData(appData){
    clientService.setAppData(appData)
    pageManager.showOrdersPage();
}

function updateData() {
    productManager.init()
    customerManager.init();
    orderManager.init();
}