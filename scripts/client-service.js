class ClientService {
    get productVms() {
        const products = [];
        products.push(new ProductVm("1", "Super-Calculator", 59.5, 129, 85));
        products.push(new ProductVm("2", "Time-Machine", 23.45, 87, 65));
        products.push(new ProductVm("3", "Petrificator", 13.1, 21, 6));
        products.push(new ProductVm("4", "Hilarity-Generator Mega", 10.25, 58, 39));
        products.push(new ProductVm("5", "Chuckle-O-Matic 5000", 14.13, 75, 43));
        products.push(new ProductVm("6", "Laughtron Deluxe", 5.76, 32, 22));
        products.push(new ProductVm("7", "Giggle-Sparker Spectacle", 8.88, 50, 29));
        products.push(new ProductVm("8", "Whimsy-Whirlwind Pro", 11.92, 66, 54));
        products.push(new ProductVm("9", "Giggly-Gear Zapper", 6.32, 28, 18));
        products.push(new ProductVm("10", "Chuckletastic 5000", 17.81, 91, 72));

        return products;
    }

    get customerVms() {
        const customers = [];
        customers.push(new CustomerVm("1", "Marcel", "Kirchner"));
        customers.push(new CustomerVm("2", "Vy", "Le"));
        customers.push(new CustomerVm("3", "Bill", "Gates"));
        customers.push(new CustomerVm("4", "Nikola", "Tesla"));
        customers.push(new CustomerVm("5", "Max", "Cavalera"));
        customers.push(new CustomerVm("6", "Elon", "Musk"));
        customers.push(new CustomerVm("7", "Jeff", "Bezos"));
        customers.push(new CustomerVm("8", "Nelson", "Mandela"));
        customers.push(new CustomerVm("9", "Mahatma", "Gandi"));
        customers.push(new CustomerVm("10", "Charles", "Darwin"));
        customers.push(new CustomerVm("11", "William", "Shakespeare"));
        customers.push(new CustomerVm("12", "Martin", "Luther"));
        customers.push(new CustomerVm("13", "Isaac", "Newton"));
        customers.push(new CustomerVm("14", "Thomas", "Edison"));
        return customers;
    }

    get appDataDto() {
        const customerDtos = [];
        const productDtos = [];

        this.customerVms.forEach(customerVm => {
            customerDtos.push(new CustomerDto(customerVm.id, customerVm.firstName, customerVm.lastName));
        });

        this.productVms.forEach(productVm => {
            productDtos.push(new ProductDto(productVm.id, productVm.name, productVm.cost, productVm.totalItems));
        });

        return new AppDataDto(productDtos, customerDtos);
    }

    constructor() {
        this.saveAppData = null;
    }

    setAppData(appData) {
        console.log(appData);
    }

    onSaveAppDataRequested() {
        this.saveAppData(this.appDataDto);
    }
}