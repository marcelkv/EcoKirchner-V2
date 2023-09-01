class App {
    demoData = new DemoData();
    pageManager = new PageManager();
    fileManager = new FileManager();
    clientService = new ClientService();
    productsView = new ProductsView();
    customersView = new CustomersView();
    ordersView = new OrdersView();
    orderView = new OrderView();
    productsController = new ProductsController(this.productsView, this.clientService);
    customersController = new CustomersController(this.customersView, this.clientService);
    ordersController = new OrdersController(this.ordersView, this.clientService);
    orderController = new OrderController(this.orderView);

    constructor() {
        this.pageManager.initMenuEvents();
        this.pageManager.showProductsPage();
        this.pageManager.onLoadFileRequested = () => this.fileManager.selectFile();
        this.pageManager.onSaveFileRequested = () => this.clientService.onSaveAppDataRequested();
        this.fileManager.onAppDataReady = (appDataDto) => this.setAppData(appDataDto);
        this.clientService.appDataReady = () => this.#onAppDataReady();
        this.clientService.saveAppData = (appDataDto) => this.fileManager.writeToFile(appDataDto);
        this.clientService.setAppData(this.demoData.appDataDto);
        this.ordersController.onOrderSelected = (orderVm => this.#onOrderSelected(orderVm));
    }

    #onAppDataReady() {
        this.productsController.initProducts();
        this.customersController.initCustomers();
        this.ordersController.initOrders();
    }

    setAppData(appDataDto) {
        this.clientService.setAppData(appDataDto);
    }

    #onOrderSelected(orderVm) {
        this.pageManager.showOrderPage();
        this.orderController.setOrder(orderVm);
    }
}