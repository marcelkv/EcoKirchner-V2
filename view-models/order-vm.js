class OrderVm {
    constructor(id, customerVm, productOrderVms, delivered, paymentMethod) {
        this.id = id;
        this.customerVm = customerVm;
        this.productOrderVms = productOrderVms;
        this.delivered = delivered;
        this.paymentMethod = paymentMethod;
    }

    get cost() {
        if (!this.productOrderVms) {
            return 0;
        }

        let total = 0;
        for (let i = 0; i < this.productOrderVms.length; i++) {
            total += this.productOrderVms[i].cost;
        }
        return roundToTwoDecimals(total);
    }
}