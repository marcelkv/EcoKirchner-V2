class CustomersController {
    #view;
    #service;

    constructor(view, service) {
        this.#view = view;
        this.#service = service;
    }

    initCustomers() {
        const customers = this.#service.getCustomerVms();
        this.#view.setCustomers(customers);
    }
}