class OrderManager {
    get ordersList() {
        return document.querySelector(".orders > ." + this.classList.listItems);
    }

    get orderCustomerNameSection() {
        return document.querySelector(".order > .order-wrapper > .order-customer-name-section");
    }


    get orderCustomerProducts() {
        return document.querySelector(".order > .order-wrapper > .order-customer-products");
    }
    get orderCustomerTable() {
        return this.orderCustomerProducts.querySelector(".products-table");
    }

    get orderCustomerTotalCost() {
        return this.orderCustomerProducts.querySelector(".group-item");
    }

    get indicatorFilter() {
        return document.querySelector(".orders > .orders-bar > ." + this.classList.listItemIndicator);
    }

    get currentIndicatorState() {
        if (this.indicatorFilter.classList.contains(this.classList.indicatorGreen)) {
            return "green";
        }
        else if (this.indicatorFilter.classList.contains(this.classList.indicatorRed)) {
            return "red";
        }
        else if (this.indicatorFilter.classList.contains(this.classList.indicatorYellow)) {
            return "yellow";
        }
        else if (this.indicatorFilter.classList.contains(this.classList.indicatorOrange)) {
            return "orange";
        }
        else {
            return "gray";
        }
    }

    constructor(clientService) {
        this.clientService = clientService;
        this.classList = new ListItems();
        this.onOrderSelected = null;
    }

    init() {
        if (!this.ordersList) {
            return;
        }

        this.initFilterIndicator();
        this.initOrdersList();
    }

    initFilterIndicator() {
        this.indicatorFilter.classList.remove(this.classList.indicatorGray);
        this.indicatorFilter.classList.remove(this.classList.indicatorGreen);
        this.indicatorFilter.classList.remove(this.classList.indicatorYellow);
        this.indicatorFilter.classList.remove(this.classList.indicatorOrange);
        this.indicatorFilter.classList.add(this.classList.listItemIndicator);
        this.indicatorFilter.classList.add(this.classList.indicatorRed);
        this.indicatorFilter.onclick = () => this.toggleFilterIndicator();
    }

    toggleFilterIndicator() {
        if (this.currentIndicatorState === "green") {
            this.indicatorFilter.classList.remove(this.classList.indicatorGreen);
            this.indicatorFilter.classList.add(this.classList.indicatorRed);
        }
        else if (this.currentIndicatorState === "red") {
            this.indicatorFilter.classList.remove(this.classList.indicatorRed);
            this.indicatorFilter.classList.add(this.classList.indicatorOrange);
        }
        else if (this.currentIndicatorState === "orange") {
            this.indicatorFilter.classList.remove(this.classList.indicatorOrange);
            this.indicatorFilter.classList.add(this.classList.indicatorYellow);
        }
        else if (this.currentIndicatorState === "yellow") {
            this.indicatorFilter.classList.remove(this.classList.indicatorYellow);
            this.indicatorFilter.classList.add(this.classList.indicatorGray);
        }
        else {
            this.indicatorFilter.classList.remove(this.classList.indicatorGray);
            this.indicatorFilter.classList.add(this.classList.indicatorGreen);
        }
        this.initOrdersList();
    }

    initOrdersList() {
        this.ordersList.innerHTML = "";
        this.clientService.orderVms.forEach((orderVm) => {
            if (!this.orderIsInFilter(orderVm)) {
                return;
            }

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
            else if (this.isOrderDelivered(orderVm) && this.isOrderNotPayed(orderVm)) {
                indicatorItem.classList.add(this.classList.indicatorOrange);
            }
            else if (this.isOrderPayed(orderVm) && this.isOrderNotDelivered(orderVm)) {
                indicatorItem.classList.add(this.classList.indicatorYellow);
            }
            else {
                indicatorItem.classList.add(this.classList.indicatorRed);
            }

            listItemWrapper.className = this.classList.listItemWrapper;
            primaryItems.className = this.classList.primaryItems;
            nameItem.className = this.classList.primaryItem;
            nameItem.textContent = orderVm.customerVm.firstName + " " + orderVm.customerVm.lastName;

            primaryItems.onclick = () => this.onOrderClick(orderVm);
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

    isOrderNotDelivered(orderVm) {
        return !orderVm.delivered;
    }

    isOrderNotPayed(orderVm) {
        return orderVm.paymentMethod === "none";
    }

    orderIsInFilter(orderVm) {
        return ((this.currentIndicatorState === "green" && this.isOrderDone(orderVm)) ||
            (this.currentIndicatorState === "orange" && this.isOrderDelivered(orderVm) && this.isOrderNotPayed(orderVm)) ||
            (this.currentIndicatorState === "yellow" && this.isOrderPayed(orderVm) && this.isOrderNotDelivered(orderVm)) ||
            (this.currentIndicatorState === "red" && this.isOrderNotDelivered(orderVm) && this.isOrderNotPayed(orderVm)) ||
            this.currentIndicatorState === "gray"
        );
    }

    onOrderClick(orderVm) {
        this.onOrderSelected(orderVm);
        this.initSelectedOrder(orderVm);
    }

    initSelectedOrder(orderVm) {
        this.orderCustomerNameSection.innerHTML = orderVm.customerVm.firstName + " " + orderVm.customerVm.lastName;

        const tbody = this.orderCustomerTable.querySelector('tbody');
        tbody.innerHTML = '';

        orderVm.productOrderVms.forEach(function (productOrderVm) {
            const row = document.createElement('tr');

            const name = document.createElement('td');
            const cost = document.createElement('td');
            const quantity = document.createElement('td');
            const total = document.createElement('td');
            name.textContent = productOrderVm.productName;
            cost.textContent = productOrderVm.productCost + " €";
            quantity.textContent = productOrderVm.quantity;
            total.textContent = productOrderVm.cost + " €";
            name.classList.add('firstCol');

            row.appendChild(name);
            row.appendChild(cost);
            row.appendChild(quantity);
            row.appendChild(total);

            tbody.appendChild(row);
        });

        this.orderCustomerTotalCost.innerHTML = orderVm.cost + " €";
        const bankVm = orderVm.bankVm;
        const iban = document.getElementsByClassName('iban')[0];
        iban.innerHTML = bankVm.iban;
        const bic = document.getElementsByClassName('bic')[0];
        bic.innerHTML = bankVm.bic;
        const email = document.getElementsByClassName('email')[0];
        email.innerHTML = bankVm.email;
        const phone = document.getElementsByClassName('phone')[0];
        phone.innerHTML = bankVm.phone;
    }
}