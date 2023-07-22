class ProductVm {
    constructor(id, name, cost, totalItems, availableItems) {
        this.id = id;
        this.name = name || "";
        this.cost = cost || 0;
        this.totalItems = totalItems;
        this.availableItems = availableItems;
    }
}