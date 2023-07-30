class ProductsController {
    #view;
    #service;

    constructor(view, service) {
        this.#view = view;
        this.#service = service;
        this.#view.onUpdateProductVm = (productVm) => this.onUpdateProductVm(productVm);
    }

    initProducts() {
        const products = this.#service.getProductVms();
        this.#view.setProducts(products);
    }

    onUpdateProductVm(productVm) {
        const updatedProductVm = this.#service.updateProductVm(productVm);
        this.#view.updateProduct(updatedProductVm);
    }
}