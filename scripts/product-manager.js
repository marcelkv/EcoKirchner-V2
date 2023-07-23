class ProductManager {
    get productsList() {
        return document.querySelector(".products > ." + this.classList.listItems);
    }

    get productsBar() {
        return document.querySelector(".products > .products-bar");
    }

    get indicatorFilter() {
        return document.querySelector(".products > .products-bar > ." + this.classList.listItemIndicator);
    }

    get indicatorMessage() {
        return document.querySelector(".products > .products-bar > ." + this.classList.listItemMessage);
    }

    get currentIndicatorState() {
        if (this.indicatorFilter.classList.contains(this.classList.indicatorGreen)) {
            return "green";
        }
        else if (this.indicatorFilter.classList.contains(this.classList.indicatorRed)) {
            return "red";
        }
        else {
            return "gray";
        }
    }

    constructor(clientService) {
        this.clientService = clientService;
        this.classList = new ListItems();
    }

    init() {
        if (!this.productsList) {
            return;
        }

        this.initFilterIndicator();
        this.initProductsList();
    }

    initFilterIndicator() {
        this.indicatorFilter.classList.remove(this.classList.indicatorRed);
        this.indicatorFilter.classList.remove(this.classList.indicatorGray);
        this.indicatorFilter.classList.add(this.classList.listItemIndicator);
        this.indicatorFilter.classList.add(this.classList.indicatorGreen);
        this.indicatorMessage.textContent = "Haben wir";
        this.productsBar.onclick = () => this.toggleFilterIndicator();
    }

    toggleFilterIndicator() {
        if (this.currentIndicatorState === "green") {
            this.indicatorFilter.classList.remove(this.classList.indicatorGreen);
            this.indicatorFilter.classList.add(this.classList.indicatorRed);
            this.indicatorMessage.textContent = "Haben wir nicht";
        }
        else if (this.currentIndicatorState === "red") {
            this.indicatorFilter.classList.remove(this.classList.indicatorRed);
            this.indicatorFilter.classList.add(this.classList.indicatorGray);
            this.indicatorMessage.textContent = "Alle Produke";
        }
        else {
            this.indicatorFilter.classList.remove(this.classList.indicatorGray);
            this.indicatorFilter.classList.add(this.classList.indicatorGreen);
            this.indicatorMessage.textContent = "Haben wir";
        }
        this.initProductsList();
    }

    initProductsList() {
        this.productsList.innerHTML = "";
        this.clientService.productVms.forEach((productVm) => {
            if ((this.currentIndicatorState === "green" && productVm.availableItems === 0) ||
                (this.currentIndicatorState === "red" && productVm.availableItems > 0)) {
                return;
            }

            const listItemWrapper = document.createElement("div");
            const primaryItems = document.createElement("div");
            const secondaryItems = document.createElement("div");
            const indicatorItem = document.createElement("div");
            const nameItem = document.createElement("div");
            const costItemLabel = document.createElement("div");
            const costItem = document.createElement("div");
            const quantityItemLabel = document.createElement("div");
            const quantityItem = document.createElement("div");
            const availableItemLabel = document.createElement("div");
            const availableItem = document.createElement("div");

            listItemWrapper.appendChild(primaryItems);
            listItemWrapper.appendChild(secondaryItems);
            primaryItems.appendChild(indicatorItem);
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
            indicatorItem.classList.add(this.classList.listItemIndicator);
            if (productVm.availableItems > 0) {
                indicatorItem.classList.add(this.classList.indicatorGreen);
            }
            else {
                indicatorItem.classList.add(this.classList.indicatorRed);
            }
            nameItem.className = this.classList.primaryItem;
            costItemLabel.className = this.classList.secondaryItemLabel;
            costItem.className = this.classList.secondaryItem;
            quantityItemLabel.className = this.classList.secondaryItemLabel;
            quantityItem.className = this.classList.secondaryItem;
            availableItemLabel.className = this.classList.secondaryItemLabel;
            availableItem.className = this.classList.secondaryItem;
            nameItem.textContent = productVm.name;
            costItemLabel.textContent = "Cost:";
            costItem.textContent = productVm.cost + " €";
            quantityItemLabel.textContent = "Total:"
            quantityItem.textContent = productVm.totalItems;
            availableItemLabel.textContent = "Available:";
            availableItem.textContent = productVm.availableItems;

            primaryItems.onclick = () => this.onPrimaryItemClick(secondaryItems);
            quantityItem.onclick = () => this.onQuantityClick(productVm);
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

    onQuantityClick(productVm) {
        const userInput = window.prompt("Total number items for " + productVm.name + ": ", productVm.totalItems);
        const integerValue = parseInt(userInput);
        if (!isNaN(integerValue) & integerValue > 0) {
            const appDataDto = this.clientService.appDataDto;
            productVm.totalItems = integerValue;
            const productDto = this.clientService.getProductDto(productVm);
            productVm.availableItems = this.clientService.getAvailableProducts(productDto, appDataDto.orderDtos);
            this.init();
        }
    }
}