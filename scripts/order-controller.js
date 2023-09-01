class OrderController {
    #view;

    constructor(view) {
        this.#view = view;
    }

    setOrder(orderVm) {
        this.#view.setOrder(orderVm);
    }
}