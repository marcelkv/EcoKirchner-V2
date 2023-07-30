class ProductVm {
    #id;

    get id() {
        return this.#id;
    }

    get costAsString() {
        const paddedNumber = padNumberWithDecimalPlaces(this.cost, 2);
        if (paddedNumber) {
            return paddedNumber.replace(".", ",") + " €";
        }
    }

    constructor(id, name, cost, totalItems, availableItems) {
        this.#id = id;
        this.name = name || "";
        this.cost = cost || 0;
        this.totalItems = totalItems;
        this.availableItems = availableItems;
    }
}