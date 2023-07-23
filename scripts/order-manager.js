class OrderManager {
    get ordersList() {
        return document.querySelector(".orders > ." + this.classList.listItems);
    }

    get ordersBar() {
        return document.querySelector(".orders > .orders-bar");
    }

    get orderCustomerNameSection() {
        return document.querySelector(".order > .order-wrapper > .order-customer-name-section");
    }

    get orderCustomerProducts() {
        return document.querySelector(".order > .order-wrapper");
    }

    get orderCustomerTable() {
        return this.orderCustomerProducts.querySelector(".products-table");
    }

    get orderCustomerPayedCashIndicator() {
        return this.orderCustomerProducts.querySelector(".list-item-indicator");
    }

    get orderCustomerPayedTransactionIndicator() {
        return this.orderCustomerProducts.querySelectorAll(".list-item-indicator")[1];
    }

    get orderCustomerDeliveredIndicator() {
        return this.orderCustomerProducts.querySelectorAll(".list-item-indicator")[2];
    }

    get orderCustomerTotalCost() {
        return this.orderCustomerProducts.querySelector(".group-item");
    }

    get indicatorFilter() {
        return document.querySelector(".orders > .orders-bar > ." + this.classList.listItemIndicator);
    }


    get indicatorMessage() {
        return document.querySelector(".orders > .orders-bar > ." + this.classList.listItemMessage);
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
        this.onDeliveredChanged = null;
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
        this.indicatorMessage.textContent = "Nicht Bezahlt und Nicht Geliefert";
        this.ordersBar.onclick = () => this.toggleFilterIndicator();
    }

    toggleFilterIndicator() {
        if (this.currentIndicatorState === "green") {
            this.indicatorFilter.classList.remove(this.classList.indicatorGreen);
            this.indicatorFilter.classList.add(this.classList.indicatorRed);
            this.indicatorMessage.textContent = "Nicht Bezahlt und Nicht Geliefert";
        }
        else if (this.currentIndicatorState === "red") {
            this.indicatorFilter.classList.remove(this.classList.indicatorRed);
            this.indicatorFilter.classList.add(this.classList.indicatorOrange);
            this.indicatorMessage.textContent = "Geliefert aber Nicht Bezahlt";

        }
        else if (this.currentIndicatorState === "orange") {
            this.indicatorFilter.classList.remove(this.classList.indicatorOrange);
            this.indicatorFilter.classList.add(this.classList.indicatorYellow);
            this.indicatorMessage.textContent = "Bezahlt aber Nicht Geliefert";
        }
        else if (this.currentIndicatorState === "yellow") {
            this.indicatorFilter.classList.remove(this.classList.indicatorYellow);
            this.indicatorFilter.classList.add(this.classList.indicatorGray);
            this.indicatorMessage.textContent = "Alle Bestellungen";
        }
        else {
            this.indicatorFilter.classList.remove(this.classList.indicatorGray);
            this.indicatorFilter.classList.add(this.classList.indicatorGreen);
            this.indicatorMessage.textContent = "Bezahlt und Geliefert";
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
            primaryItems.classList.add(this.classList.primaryItems);
            primaryItems.classList.add(this.classList.clickable);
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

        if (orderVm.delivered) {
            this.orderCustomerDeliveredIndicator.classList.add(this.classList.indicatorGray);
        }
        else {
            this.orderCustomerDeliveredIndicator.classList.add(this.classList.indicatorNone);
        }

        if (orderVm.paymentMethod === "none") {
            this.orderCustomerPayedCashIndicator.classList.add(this.classList.indicatorNone);
            this.orderCustomerPayedTransactionIndicator.classList.add(this.classList.indicatorNone);
        }
        else if (orderVm.paymentMethod === "cash") {
            this.orderCustomerPayedCashIndicator.classList.add(this.classList.indicatorGray);
        }
        else {
            this.orderCustomerPayedTransactionIndicator.classList.add(this.classList.indicatorGray);
        }

        this.orderCustomerPayedCashIndicator.onclick = () => this.togglePayedCash(orderVm);
        this.orderCustomerPayedTransactionIndicator.onclick = () => this.togglePayedTransaction(orderVm);
        this.orderCustomerDeliveredIndicator.onclick = () => this.toggleDelivered(orderVm);
    }

    togglePayedCash(orderVm) {
        if (orderVm.paymentMethod === "cash") {
            this.orderCustomerPayedCashIndicator.classList.remove(this.classList.indicatorGray);
            this.orderCustomerPayedCashIndicator.classList.add(this.classList.indicatorNone);
            orderVm.paymentMethod = "none";
        }

        else {
            this.orderCustomerPayedCashIndicator.classList.add(this.classList.indicatorGray);
            this.orderCustomerPayedCashIndicator.classList.remove(this.classList.indicatorNone);
            this.orderCustomerPayedTransactionIndicator.classList.remove(this.classList.indicatorGray);
            this.orderCustomerPayedTransactionIndicator.classList.add(this.classList.indicatorNone);
            orderVm.paymentMethod = "cash";
        }
        this.init();
    }

    togglePayedTransaction(orderVm) {
        if (orderVm.paymentMethod === "transaction") {
            this.orderCustomerPayedTransactionIndicator.classList.remove(this.classList.indicatorGray);
            this.orderCustomerPayedTransactionIndicator.classList.add(this.classList.indicatorNone);
            orderVm.paymentMethod = "none";
        }

        else {
            this.orderCustomerPayedTransactionIndicator.classList.add(this.classList.indicatorGray);
            this.orderCustomerPayedTransactionIndicator.classList.remove(this.classList.indicatorNone);
            this.orderCustomerPayedCashIndicator.classList.remove(this.classList.indicatorGray);
            this.orderCustomerPayedCashIndicator.classList.add(this.classList.indicatorNone);
            orderVm.paymentMethod = "transaction";
        }
        this.init();
    }

    toggleDelivered(orderVm) {
        if (this.orderCustomerDeliveredIndicator.classList.contains(this.classList.indicatorGray)) {
            this.orderCustomerDeliveredIndicator.classList.remove(this.classList.indicatorGray);
            this.orderCustomerDeliveredIndicator.classList.add(this.classList.indicatorNone);
            orderVm.delivered = false;
        }
        else {
            this.orderCustomerDeliveredIndicator.classList.add(this.classList.indicatorGray);
            this.orderCustomerDeliveredIndicator.classList.remove(this.classList.indicatorNone);
            orderVm.delivered = true;
        }

        orderVm.updateProductsTotalItems(this.clientService.productVms);
        this.onDeliveredChanged();
        this.init();
    }
}