class ProductManager {
    get productsList() {
        return document.querySelector(".products > ." + this.classList.listItems);
    }

    constructor(clientService) {
        this.clientService = clientService;
        this.classList = new ListItems();
    }

    init() {
        this.clientService.productVms.forEach((product) => {
            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const secondaryItems = document.createElement("div");
            const nameItem = document.createElement("div");
            const costItemLabel = document.createElement("div");
            const costItem = document.createElement("div");
            const quantityItemLabel = document.createElement("div");
            const quantityItem = document.createElement("div");
            const availableItemLabel = document.createElement("div");
            const availableItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            listItemWrapper.appendChild(secondaryItems);
            primaryItems.appendChild(nameItem);
            secondaryItems.appendChild(costItemLabel);
            secondaryItems.appendChild(costItem);
            secondaryItems.appendChild(quantityItemLabel);
            secondaryItems.appendChild(quantityItem);
            secondaryItems.appendChild(availableItemLabel);
            secondaryItems.appendChild(availableItem);
            this.productsList.appendChild(listItemWrapper);

            listItemWrapper.className = this.classList.listItemWrapper;
            primaryItems.className = this.classList.primaryItems;
            secondaryItems.className = this.classList.secondaryItems;
            nameItem.className = this.classList.primaryItem;
            costItemLabel.className = this.classList.secondaryItemLabel;
            costItem.className = this.classList.secondaryItem;
            quantityItemLabel.className = this.classList.secondaryItemLabel;
            quantityItem.className = this.classList.secondaryItem;
            availableItemLabel.className = this.classList.secondaryItemLabel;
            availableItem.className = this.classList.secondaryItem;
            nameItem.textContent = product.name;
            costItemLabel.textContent = "Cost:";
            costItem.textContent = product.cost + " €";
            quantityItemLabel.textContent = "Total:"
            quantityItem.textContent = product.totalItems;
            availableItemLabel.textContent = "Available:";
            availableItem.textContent = product.availableItems;

            primaryItems.onclick = () => this.onPrimaryItemClick(secondaryItems);
        });
    }

    onPrimaryItemClick(secondaryItems) {
        if (secondaryItems.classList.contains(this.classList.open)) {
            secondaryItems.classList.remove(this.classList.open);
        }
        else {
            this.closeSecondaryItems();
            secondaryItems.classList.add(this.classList.open);
        }
    }

    closeSecondaryItems() {
        const queryClassName = this.classList.dot(this.classList.secondaryItems);
        const allSecondaryitems = this.productsList.querySelectorAll(queryClassName);
        allSecondaryitems.forEach(item => item.classList.remove(this.classList.open));
    }
}