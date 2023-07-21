const pageManager = new PageManager();
const fileManager = new FileManager();
const clientService = new ClientService();
const productManager = new ProductManager(clientService);
const customerManager = new CustomerManager(clientService);

pageManager.onLoadFileRequested = () => fileManager.selectFile();
pageManager.onSaveFileRequested = () => clientService.onSaveAppDataRequested();

fileManager.onAppDataReady = (appData) => clientService.setAppData(appData)
clientService.saveAppData = (appData) => fileManager.writeToFile(appData);

document.addEventListener("DOMContentLoaded", () => {
    pageManager.initMenuEvents();
    productManager.init()
    customerManager.init();
    fileManager.init();
});