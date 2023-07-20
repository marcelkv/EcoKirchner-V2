class ClientService {
    get products() {
        const products = [];
        products.push(new Product("Super-Calculator", 59.5, 129, 85));
        products.push(new Product("Time-Machine", 23.45, 87, 65));
        products.push(new Product("Petrificator", 13.1, 21, 6));

        return products;
    }

    get customers() {
        const customers = [];
        customers.push(new Customer("Marcel", "Kirchner"));
        customers.push(new Customer("Vy", "Le"));
        customers.push(new Customer("Bill", "Gates"));
        customers.push(new Customer("Nikola", "Tesla"));
        customers.push(new Customer("Max", "Cavalera"));
        customers.push(new Customer("Elon", "Musk"));
        customers.push(new Customer("Jeff", "Bezos"));
        customers.push(new Customer("Nelson", "Mandela"));
        customers.push(new Customer("Mahatma", "Gandi"));
        customers.push(new Customer("Charles", "Darwin"));
        customers.push(new Customer("William", "Shakespeare"));
        customers.push(new Customer("Martin", "Luther"));
        customers.push(new Customer("Isaac", "Newton"));
        customers.push(new Customer("Thomas", "Edison"));
        return customers;
    }
}