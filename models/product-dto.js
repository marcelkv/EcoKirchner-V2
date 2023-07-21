class ProductDto {
    constructor(id, name, cost, totalItems) {
        this.id = id;
        this.name = name || "";
        this.cost = cost || 0;
        this.totalItems = totalItems;
    }
}