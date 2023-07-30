class App {
    demoData = new DemoData();
    pageManager = new PageManager();
    fileManager = new FileManager();
    clientService = new ClientService();
    productsView = new ProductsView();
    productsController = new ProductsController(this.productsView, this.clientService);

    constructor() {
        this.pageManager.initMenuEvents();
        this.pageManager.showProductsPage();
        this.pageManager.onLoadFileRequested = () => this.fileManager.selectFile();
        this.pageManager.onSaveFileRequested = () => this.clientService.onSaveAppDataRequested();
        this.fileManager.onAppDataReady = (appDataDto) => this.setAppData(appDataDto);
        this.clientService.appDataReady = () => this.#onAppDataReady();
        this.clientService.saveAppData = (appDataDto) => this.fileManager.writeToFile(appDataDto);
        this.clientService.setAppData(this.demoData.appDataDto);
    }

    #onAppDataReady() {
        this.productsController.initProducts();
    }

    setAppData(appDataDto) {
        this.clientService.setAppData(appDataDto);
    }
}