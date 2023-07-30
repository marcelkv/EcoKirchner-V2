class ClientService {
    #appData;

    constructor() {
        this.saveAppData = null;
        this.appDataReady = null;
    }

    setAppData(appData) {
        this.#appData = appData;
        this.appDataReady();
    }

    onSaveAppDataRequested() {
        this.saveAppData(this.#appData);
    }

    getBankVm() {
        const appData = this.#appData;
        return new BankVm(appData.bankDto.iban, appData.bankDto.bic, appData.bankDto.email, appData.bankDto.phone);
    }

    getOrderVms() {
        return this.#appData.orderDtos.map(orderDto => this.#getOrderVm(orderDto, this.getBankVm()));
    }

    getProductVms() {
        return this.#appData.productDtos.map(productDto => this.#getProductVm(productDto, this.getOrderVms()));
    }

    getCustomerVms() {
        return this.#appData.customerDtos.map(customerDto => this.#getCustomerVm(customerDto));
    }

    updateProductVm(productVm) {
        const foundProductDto = this.#appData.productDtos.find(productDto => productDto.id === productVm.id);
        if (foundProductDto) {
            foundProductDto.totalItems = productVm.totalItems;
            foundProductDto.name = productVm.name;
            foundProductDto.cost = productVm.cost;
            return this.#getProductVm(foundProductDto);
        }
    }

    #getAvailableProducts(productDto) {
        let availableItems = productDto.totalItems;
        this.#appData.orderDtos.map(orderDto => {
            if (orderDto.delivered) {
                return;
            }

            const foundProductOrder = orderDto.productOrderDtos.find(productOrderDto =>
                productOrderDto.productId === productDto.id
            );
            if (foundProductOrder) {
                availableItems -= foundProductOrder.quantity;
            }
        });

        return availableItems;
    }

    #getProductVm(productDto) {
        const availableItems = this.#getAvailableProducts(productDto);
        return new ProductVm(productDto.id, productDto.name, productDto.cost, productDto.totalItems, availableItems);
    }

    #getCustomerVm(customerDto) {
        return new CustomerVm(customerDto.id, customerDto.firstName, customerDto.lastName);
    }

    #getOrderVm(orderDto, bankVm) {
        const productOrderVms = orderDto.productOrderDtos.map(productOrderDto => this.getProductOrderVm(productOrderDto));
        const customerVm = this.#getCustomerVm(orderDto.customerDto);
        return new OrderVm(orderDto.id, customerVm, productOrderVms, orderDto.delivered, orderDto.paymentMethod, bankVm)
    }

    getProductOrderVm(productOrderDto) {
        return new ProductOrderVm(
            productOrderDto.productId,
            productOrderDto.productName,
            productOrderDto.cost,
            productOrderDto.quantity);
    }

    getCustomerDto(customerVm) {
        return new CustomerDto(customerVm.id, customerVm.firstName, customerVm.lastName);
    }

    getProductDto(productVm) {
        return new ProductDto(productVm.id, productVm.name, productVm.cost, productVm.totalItems);
    }

    getOrderDto(orderVm) {
        const customerDto = this.getCustomerDto(orderVm.customerVm);
        const productOrderDtos = this.getProductOrderDtos(orderVm.productOrderVms);
        return new OrderDto(orderVm.id, customerDto, productOrderDtos, orderVm.delivered, orderVm.paymentMethod);
    }

    getProductOrderDtos(productOrderVms) {
        return productOrderVms.map(productOrderVm =>
            new ProductOrderDto(
                productOrderVm.productId,
                productOrderVm.productName,
                productOrderVm.productCost,
                productOrderVm.quantity)
        );
    }
}