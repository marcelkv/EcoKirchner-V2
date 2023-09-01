class OrdersView {
    #orderVms;

    get #ordersList() {
        return document.querySelector(OrdersClassNames.ordersListItems);
    }

    get #ordersBar() {
        return document.querySelector(OrdersClassNames.ordersBar);
    }

    get #indicatorFilter() {
        return document.querySelector(OrdersClassNames.filterIndicator);
    }

    get #indicatorMessage() {
        return document.querySelector(OrdersClassNames.filterMessage);
    }

    get #currentIndicatorState() {
        if (this.#indicatorFilter.classList.contains(ListItems.indicatorGreen)) {
            return "green";
        }
        else if (this.#indicatorFilter.classList.contains(ListItems.indicatorRed)) {
            return "red";
        }
        else if (this.#indicatorFilter.classList.contains(ListItems.indicatorYellow)) {
            return "yellow";
        }
        else if (this.#indicatorFilter.classList.contains(ListItems.indicatorOrange)) {
            return "orange";
        }
        else {
            return "gray";
        }
    }

    constructor() {
        this.onOrderSelected = null;
    }

    setOrders(orderVms) {
        this.#orderVms = orderVms;
        this.#init();
    }

    #init() {
        this.#setRed();
        if (!this.#ordersBar.onclick) {
            this.#ordersBar.onclick = () => this.#toggleFilterIndicator();
        }
    }

    #toggleFilterIndicator() {
        if (this.#currentIndicatorState === "green") {
            this.#setRed();
        }
        else if (this.#currentIndicatorState === "red") {
            this.#setOrange();
        }
        else if (this.#currentIndicatorState === "orange") {
            this.#setYellow();
        }
        else if (this.#currentIndicatorState === "yellow") {
            this.#setGray();
        }
        else {
            this.#setGreen();
        }
    }

    #setRed() {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorRed);
        this.#indicatorMessage.textContent = ResOrders.redText;
        const redOrders = this.#getRedOrderVms();
        this.#initOrdersList(redOrders);
    }

    #setOrange() {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorOrange);
        this.#indicatorMessage.textContent = ResOrders.orangeText;
        const orangeOrders = this.#getOrangeOrderVms();
        this.#initOrdersList(orangeOrders);
    }

    #setYellow() {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorYellow);
        this.#indicatorMessage.textContent = ResOrders.yellowText;
        const yellowOrders = this.#getYellowOrderVms();
        this.#initOrdersList(yellowOrders);
    }

    #setGray() {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorGray);
        this.#indicatorMessage.textContent = ResOrders.grayText;
        const grayOrders = this.#getGrayOrderVms();
        this.#initOrdersList(grayOrders);
    }

    #setGreen() {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorGreen);
        this.#indicatorMessage.textContent = ResOrders.greenText;
        const greenOrders = this.#getGreenOrderVms();
        this.#initOrdersList(greenOrders);
    }

    #clearAllColors() {
        this.#indicatorFilter.classList.remove(ListItems.indicatorGreen);
        this.#indicatorFilter.classList.remove(ListItems.indicatorRed);
        this.#indicatorFilter.classList.remove(ListItems.indicatorOrange);
        this.#indicatorFilter.classList.remove(ListItems.indicatorYellow);
        this.#indicatorFilter.classList.remove(ListItems.indicatorGray);
    }

    #getRedOrderVms() {
        return this.#orderVms.filter(orderVm =>
            !this.#isDelivered(orderVm) &&
            !this.#isPayed(orderVm));
    }

    #getOrangeOrderVms() {
        return this.#orderVms.filter(orderVm =>
            this.#isDelivered(orderVm) &&
            !this.#isPayed(orderVm));
    }

    #getYellowOrderVms() {
        return this.#orderVms.filter(orderVm =>
            !this.#isDelivered(orderVm) &&
            this.#isPayed(orderVm));
    }

    #getGrayOrderVms() {
        return this.#orderVms;
    }

    #getGreenOrderVms() {
        return this.#orderVms.filter(orderVm =>
            this.#isDelivered(orderVm) &&
            this.#isPayed(orderVm));
    }

    #isDelivered(orderVm) {
        return orderVm.delivered;
    }

    #isPayed(orderVm) {
        return orderVm.paymentMethod !== "none";
    }

    #initOrdersList(orderVms) {
        this.#ordersList.innerHTML = "";
        orderVms.forEach((orderVm) => {
            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const indicatorItem = document.createElement("div");
            const nameItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            primaryItems.appendChild(indicatorItem);
            primaryItems.appendChild(nameItem);
            this.#ordersList.appendChild(listItemWrapper);

            indicatorItem.classList.add(ListItems.listItemIndicator);
            if (this.#isDelivered(orderVm) && this.#isPayed(orderVm)) {
                indicatorItem.classList.add(ListItems.indicatorGreen);
            }
            else if (this.#isDelivered(orderVm) && !this.#isPayed(orderVm)) {
                indicatorItem.classList.add(ListItems.indicatorOrange);
            }
            else if (!this.#isDelivered(orderVm) && this.#isPayed(orderVm)) {
                indicatorItem.classList.add(ListItems.indicatorYellow);
            }
            else {
                indicatorItem.classList.add(ListItems.indicatorRed);
            }

            listItemWrapper.className = ListItems.listItemWrapper;
            primaryItems.classList.add(ListItems.primaryItems);
            primaryItems.classList.add(ListItems.clickable);
            nameItem.className = ListItems.primaryItem;
            nameItem.textContent = orderVm.customerVm.firstName + " " + orderVm.customerVm.lastName;

            primaryItems.onclick = () => this.onOrderSelected(orderVm);
        });
    }
}