class ProductsView {
    #productVms;

    get #productsList() {
        return document.querySelector(ProductsClassNames.productsListItems);
    }

    get #productsBar() {
        return document.querySelector(ProductsClassNames.productsBar);
    }

    get #indicatorFilter() {
        return document.querySelector(ProductsClassNames.filterIndicator);
    }

    get #indicatorMessage() {
        return document.querySelector(ProductsClassNames.filterMessage);
    }

    get #currentIndicatorState() {
        if (this.#indicatorFilter.classList.contains(ListItems.indicatorGreen)) {
            return "green";
        }
        else if (this.#indicatorFilter.classList.contains(ListItems.indicatorRed)) {
            return "red";
        }
        else {
            return "gray";
        }
    }

    constructor() {
        this.onSetTotalItems = null;
    }

    setProducts(productVms) {
        this.#productVms = productVms;
        this.#initFilterIndicator();
    }

    updateProduct(newProductVm) {
        const index = this.#productVms.findIndex(productVm => productVm.id === newProductVm.id);
        this.#productVms[index] = newProductVm;

        if (this.#isProductVisible(newProductVm)) {
            this.#reRenderProduct(newProductVm, index);
        } else if (this.#isProductGreen(newProductVm)) {
            this.#setGreen(newProductVm.id);
        }
        else {
            this.#setRed(newProductVm.id);
        }
    }

    #isProductVisible(productVm) {
        return this.#currentIndicatorState === "gray" ||
            (this.#isProductGreen(productVm) && this.#currentIndicatorState === "green") ||
            (this.#isProductRed(productVm) && this.#currentIndicatorState === "red");
    }

    #reRenderProduct(productVm, index) {
        this.#reRenderProductIndicator(productVm, index);
        this.#reRenderProductValues(productVm, index);
    }

    #reRenderProductIndicator(productVm, index) {
        const indicatorItem = this.#getIndicatorItem(index);

        if (productVm.availableItems <= 0) {
            indicatorItem.classList.add(ListItems.indicatorRed);
            indicatorItem.classList.remove(ListItems.indicatorGreen);
        }
        else {
            indicatorItem.classList.remove(ListItems.indicatorRed);
            indicatorItem.classList.add(ListItems.indicatorGreen);
        }
    }

    #reRenderProductValues(productVm, index) {
        const primaryItems = this.#getPrimaryItems(index);
        const secondaryItems = this.#getSecondaryItems(index);
        if (primaryItems) {
            primaryItems[0].innerHTML = productVm.name;
        }
        if (secondaryItems) {
            secondaryItems[0].innerHTML = productVm.cost;
            secondaryItems[1].innerHTML = productVm.totalItems;
            secondaryItems[2].innerHTML = productVm.availableItems;
        }
    }

    #getIndicatorItem(index) {
        const listItemWrapper = this.#getListItemWrapper(index);
        return listItemWrapper.querySelector(ListItems.dot(ListItems.listItemIndicator));
    }

    #getPrimaryItems(index) {
        const listItemWrapper = this.#getListItemWrapper(index);
        if (listItemWrapper) {
            return listItemWrapper.querySelector(ListItems.dot(ListItems.primaryItems))
                .querySelectorAll(ListItems.dot(ListItems.primaryItem));
        }
    }

    #getSecondaryItems(index) {
        const listItemWrapper = this.#getListItemWrapper(index);
        if (listItemWrapper) {
            return listItemWrapper.querySelector(ListItems.dot(ListItems.secondaryItems))
                .querySelectorAll(ListItems.dot(ListItems.secondaryItem));
        }
    }

    #getListItemWrapper(index) {
        return this.#productsList.querySelectorAll(ListItems.dot(ListItems.listItemWrapper))[index];
    }

    #initFilterIndicator() {
        this.#setGreen();
        this.#productsBar.onclick = () => this.#toggleFilterIndicator();
    }

    #toggleFilterIndicator() {
        if (this.#currentIndicatorState === "green") {
            this.#setRed();
        }
        else if (this.#currentIndicatorState === "red") {
            this.#setGray();
        }
        else {
            this.#setGreen();
        }
    }

    #setGreen(productId) {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorGreen);
        this.#indicatorMessage.textContent = ResProducts.redText;
        const greenProducts = this.#getGreenProductVms();
        this.#initProductsList(greenProducts, productId);
    }

    #setRed(productId) {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorRed);
        this.#indicatorMessage.textContent = ResProducts.redText;
        const redProducts = this.#getRedProductVms();
        this.#initProductsList(redProducts, productId);
    }

    #setGray(productId) {
        this.#clearAllColors();
        this.#indicatorFilter.classList.add(ListItems.indicatorRed);
        this.#indicatorMessage.textContent = ResProducts.grayText;
        const allProducts = this.#productVms;
        this.#initProductsList(allProducts, productId);
    }

    #clearAllColors() {
        this.#indicatorFilter.classList.remove(ListItems.indicatorGreen);
        this.#indicatorFilter.classList.remove(ListItems.indicatorRed);
        this.#indicatorFilter.classList.remove(ListItems.indicatorGray);
    }

    #getGreenProductVms() {
        return this.#productVms.filter(productVm => this.#isProductGreen(productVm));
    }

    #getRedProductVms() {
        return this.#productVms.filter(productVm => this.#isProductRed(productVm));
    }

    #isProductGreen(productVm) {
        return productVm.availableItems !== 0;
    }

    #isProductRed(productVm) {
        return productVm.availableItems === 0;
    }

    #initProductsList(productVms, productId) {
        this.#productsList.innerHTML = "";
        productVms.forEach((productVm) => {
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
            this.#productsList.appendChild(listItemWrapper);

            listItemWrapper.className = ListItems.listItemWrapper;
            primaryItems.className = ListItems.primaryItems;
            secondaryItems.className = ListItems.secondaryItems;
            if (!isNaN(productId) && productId === productVm.id) {
                secondaryItems.classList.add(ListItems.open);
            }
            indicatorItem.classList.add(ListItems.listItemIndicator);
            indicatorItem.classList.add(this.#getProductIndicatorClassName(productVm));
            nameItem.className = ListItems.primaryItem;
            costItemLabel.className = ListItems.secondaryItemLabel;
            costItem.className = ListItems.secondaryItem;
            quantityItemLabel.className = ListItems.secondaryItemLabel;
            quantityItem.className = ListItems.secondaryItem;
            availableItemLabel.className = ListItems.secondaryItemLabel;
            availableItem.className = ListItems.secondaryItem;
            nameItem.textContent = productVm.name;
            costItemLabel.textContent = ResProducts.costText;
            costItem.textContent = productVm.costAsString;
            quantityItemLabel.textContent = ResProducts.totalText;
            quantityItem.textContent = productVm.totalItems;
            availableItemLabel.textContent = ResProducts.availableText;
            availableItem.textContent = productVm.availableItems;

            primaryItems.onclick = () => this.#onPrimaryItemClick(secondaryItems);
            quantityItem.onclick = () => this.#onQuantityClick(productVm);
        });
    }

    #getProductIndicatorClassName(productVm) {
        if (productVm.availableItems > 0) {
            return ListItems.indicatorGreen;
        }
        return ListItems.indicatorRed;
    }

    #onPrimaryItemClick(secondaryItems) {
        if (secondaryItems.classList.contains(ListItems.open)) {
            secondaryItems.classList.remove(ListItems.open);
        }
        else {
            this.#closeSecondaryItems();
            secondaryItems.classList.add(ListItems.open);
        }
    }

    #closeSecondaryItems() {
        const queryClassName = ListItems.dot(ListItems.secondaryItems);
        const allSecondaryitems = this.#productsList.querySelectorAll(queryClassName);
        allSecondaryitems.forEach(item => item.classList.remove(ListItems.open));
    }

    #onQuantityClick(productVm) {
        const userInput = window.prompt(ResProducts.requestTotalNumberOfItemsText(productVm));
        const integerValue = parseInt(userInput);
        if (!isNaN(integerValue) & integerValue > 0) {
            productVm.totalItems = integerValue;
            this.onUpdateProductVm(productVm);
        }
    }
}