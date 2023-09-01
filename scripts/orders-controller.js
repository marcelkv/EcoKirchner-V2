class OrdersController {
    #view;
    #service;

    constructor(view, service) {
        this.#view = view;
        this.#service = service;
    }

    initOrders() {
        const orders = this.#service.getOrderVms();
        this.#view.setOrders(orders);
    }
}