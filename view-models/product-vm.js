class ProductVm {
    #id;

    get id() {
        return this.#id;
    }

    get costAsString() {
        return this.cost + " €";
    }

    constructor(id, name, cost, totalItems, availableItems) {
        this.#id = id;
        this.name = name || "";
        this.cost = cost || 0;
        this.totalItems = totalItems;
        this.availableItems = availableItems;
    }
}