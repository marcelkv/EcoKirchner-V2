class ProductManager {
    get productsList() {
        return document.querySelector(".products > .products-list");
    }

    constructor(clientService) {
        this.clientService = clientService;
    }

    init() {
        this.clientService.products.forEach((product, index) => {
            const productItem = document.createElement("div");
            const nameItem = document.createElement("div");
            const costItem = document.createElement("div");
            const quantityItem = document.createElement("div");
            const availableItem = document.createElement("div");
            productItem.appendChild(nameItem);
            productItem.appendChild(costItem);
            productItem.appendChild(quantityItem);
            productItem.appendChild(availableItem);
            this.productsList.appendChild(productItem);

            productItem.className = "product-item-wrapper";
            nameItem.classList.add("product-item");
            nameItem.classList.add("product-name")
            costItem.classList.add("product-item");
            costItem.classList.add("product-cost");
            quantityItem.classList.add("product-item");
            quantityItem.classList.add("product-quantity");
            availableItem.classList.add("product-item");
            availableItem.classList.add("product-available");
            nameItem.textContent = product.name;
            costItem.textContent = product.cost + " €";
            quantityItem.textContent = product.totalItems;
            availableItem.textContent = product.availableItems;
        });
    }
}