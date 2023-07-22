class OrderDto {
    constructor(id, customer, productOrders, delivered, paymentMethod) {
        this.id = id;
        this.customer = customer;
        this.productOrders = productOrders;
        this.delivered = delivered;
        this.paymentMethod = paymentMethod;
    }
}