class OrdersController {
    #view;
    #service;

    constructor(view, service) {
        this.onOrderSelected = null
        this.#view = view;
        this.#service = service;
        this.#view.onOrderSelected = orderVm => this.onOrderSelected(orderVm);
    }

    initOrders() {
        const orders = this.#service.getOrderVms();
        this.#view.setOrders(orders);
    }
}