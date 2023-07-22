class DemoData {
    get productDtos() {
        const products = [];
        products.push(new ProductDto("1", "Super-Calculator", 59.5, 129));
        products.push(new ProductDto("2", "Time-Machine", 23.45, 87));
        products.push(new ProductDto("3", "Petrificator", 13.1, 21));
        products.push(new ProductDto("4", "Hilarity-Generator Mega", 10.25, 58));
        products.push(new ProductDto("5", "Chuckle-O-Matic 5000", 14.13, 75));
        products.push(new ProductDto("6", "Laughtron Deluxe", 5.76, 32));
        products.push(new ProductDto("7", "Giggle-Sparker Spectacle", 8.88, 50));
        products.push(new ProductDto("8", "Whimsy-Whirlwind Pro", 11.92, 66));
        products.push(new ProductDto("9", "Giggly-Gear Zapper", 6.32, 28));
        products.push(new ProductDto("10", "Chuckletastic 5000", 17.81, 91));

        return products;
    }

    get customerDtos() {
        const customers = [];
        customers.push(new CustomerDto("1", "Marcel", "Kirchner"));
        customers.push(new CustomerDto("2", "Vy", "Le"));
        customers.push(new CustomerDto("3", "Bill", "Gates"));
        customers.push(new CustomerDto("4", "Nikola", "Tesla"));
        customers.push(new CustomerDto("5", "Max", "Cavalera"));
        customers.push(new CustomerDto("6", "Elon", "Musk"));
        customers.push(new CustomerDto("7", "Jeff", "Bezos"));
        customers.push(new CustomerDto("8", "Nelson", "Mandela"));
        customers.push(new CustomerDto("9", "Mahatma", "Gandi"));
        customers.push(new CustomerDto("10", "Charles", "Darwin"));
        customers.push(new CustomerDto("11", "William", "Shakespeare"));
        customers.push(new CustomerDto("12", "Martin", "Luther"));
        customers.push(new CustomerDto("13", "Isaac", "Newton"));
        customers.push(new CustomerDto("14", "Thomas", "Edison"));
        return customers;
    }

    get orderDtos() {
        const productOrderDtos = [];
        productOrderDtos.push(new ProductOrderDto(this.productDtos[0].id, this.productDtos[0].name, this.productDtos[0].cost, 4));
        productOrderDtos.push(new ProductOrderDto(this.productDtos[4].id, this.productDtos[4].name, this.productDtos[4].cost, 2));
        productOrderDtos.push(new ProductOrderDto(this.productDtos[6].id, this.productDtos[6].name, this.productDtos[6].cost, 3));
        return [new OrderDto("1", this.customerDtos[7], productOrderDtos, false, "none")];
    }

    get bankDto() {
        return new BankDto(
            "DE72 7601 2285 0019 4378 55",
            "PBNFGEFF",
            "kirchner@kartoffel.com",
            "+49 1611 4728162");
    }

    get appDataDto() {
        return new AppDataDto(this.productDtos, this.customerDtos, this.orderDtos, this.bankDto);
    }
}