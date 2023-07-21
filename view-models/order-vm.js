class OrderVm {
    constructor(id, customerId, productOrders, delivered, paymentMethod) {
        this.id = id;
        this.customerId = customerId;
        this.productOrders = productOrders;
        this.delivered = delivered;
        this.paymentMethod = paymentMethod;
    }
}