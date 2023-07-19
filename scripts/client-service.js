class ClientService{
    get products(){
        const products = [];
        products.push(new Product("Super-Calculator", 59.5, 129, 85));
        products.push(new Product("Time-Machine", 23.45, 87, 65));
        products.push(new Product("Petrificator", 13.1, 21, 6));

        return products;
    }
}