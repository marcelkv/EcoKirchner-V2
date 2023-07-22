class ProductOrderVm {
    constructor(productId, productName, productCost, quantity) {
        this.productId = productId;
        this.productName = productName;
        this.productCost = productCost;
        this.quantity = quantity;
    }

    get cost() {
        return roundToTwoDecimals(this.productCost * this.quantity);
    }
}