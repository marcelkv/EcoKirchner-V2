class OrderManager {
    get ordersList() {
        return document.querySelector(".orders > ." + this.classList.listItems);
    }

    constructor(clientService) {
        this.clientService = clientService;
        this.classList = new ListItems();
    }

    init() {
        if (!this.ordersList) {
            return;
        }

        this.ordersList.innerHTML = "";
        this.clientService.orderVms.forEach((orderVm) => {
            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const indicatorItem = document.createElement("div");
            const nameItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            primaryItems.appendChild(indicatorItem);
            primaryItems.appendChild(nameItem);
            this.ordersList.appendChild(listItemWrapper);

            indicatorItem.classList.add(this.classList.listItemIndicator);
            if (this.isOrderDone(orderVm)) {
                indicatorItem.classList.add(this.classList.indicatorGreen);
            }
            else if (this.isOrderDelivered(orderVm)) {
                indicatorItem.classList.add(this.classList.indicatorOrange);
            }
            else if (this.isOrderPayed(orderVm)) {
                indicatorItem.classList.add(this.classList.indicatorYellow);
            }
            else {
                indicatorItem.classList.add(this.classList.indicatorRed);
            }

            listItemWrapper.className = this.classList.listItemWrapper;
            primaryItems.className = this.classList.primaryItems;
            nameItem.className = this.classList.primaryItem;
            nameItem.textContent = orderVm.customer.firstName + " " + orderVm.customer.lastName;
        });
    }

    isOrderDone(orderVm) {
        return this.isOrderDelivered(orderVm) && this.isOrderPayed(orderVm);
    }

    isOrderDelivered(orderVm) {
        return orderVm.delivered;
    }

    isOrderPayed(orderVm) {
        return (orderVm.paymentMethod === "cash" || orderVm.paymentMethod === "transaction");
    }
}