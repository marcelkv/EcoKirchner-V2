class CustomersView {
    #customerVms;

    get #customersList() {
        return document.querySelector(CustomersClassNames.customersListItems);
    }

    setCustomers(customerVms) {
        this.#customerVms = customerVms;
        this.#init();
    }

    #init() {
        if (!this.#customersList) {
            return;
        }

        this.#customersList.innerHTML = "";
        this.#customerVms.forEach((customer) => {
            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const nameItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            primaryItems.appendChild(nameItem);
            this.#customersList.appendChild(listItemWrapper);

            listItemWrapper.className = ListItems.listItemWrapper;
            primaryItems.className = ListItems.primaryItems;
            nameItem.className = ListItems.primaryItem;
            nameItem.textContent = customer.firstName + " " + customer.lastName;
        });
    }
}