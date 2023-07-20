class CustomerManager {
    get customersList() {
        return document.querySelector(".customers > ." + this.classList.listItems);
    }

    constructor(clientService) {
        this.clientService = clientService;
        this.classList = new ListItems();
    }

    init() {
        this.clientService.customers.forEach((customer) => {
            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const nameItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            primaryItems.appendChild(nameItem);
            this.customersList.appendChild(listItemWrapper);

            listItemWrapper.className = this.classList.listItemWrapper;
            primaryItems.className = this.classList.primaryItems;
            nameItem.className = this.classList.primaryItem;
            nameItem.textContent = customer.firstName + " " + customer.lastName;
        });
    }
}