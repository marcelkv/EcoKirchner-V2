class ClientService {
    get appDataDto() {
        const customerDtos = this.customerVms.map(customerVm => this.getCustomerDto(customerVm));
        const productDtos = this.productVms.map(productVm => this.getProductDto(productVm));
        const orderDtos = this.orderVms.map(orderVm => this.getOrderDto(orderVm));
        const bankDtos = new BankDto(this.bankVm.iban, this.bankVm.bic, this.bankVm.email, this.bankVm.phone);
        return new AppDataDto(productDtos, customerDtos, orderDtos, bankDtos);
    }

    constructor() {
        this.saveAppData = null;
        this.updateData = null;
    }

    setAppData(appData) {
        this.productVms = appData.productDtos.map(productDto => this.getProductVm(productDto, appData.orderDtos));
        this.customerVms = appData.customerDtos.map(customerDto => this.getCustomerVm(customerDto));
        this.bankVm = new BankVm(appData.bankDto.iban, appData.bankDto.bic, appData.bankDto.email, appData.bankDto.phone);
        this.orderVms = appData.orderDtos.map(orderDto => this.getOrderVm(orderDto, this.bankVm));
        this.updateData();
    }

    onSaveAppDataRequested() {
        this.saveAppData(this.appDataDto);
    }

    getAvailableProducts(productDto, orderDtos) {
        let availableItems = productDto.totalItems;
        orderDtos.map(orderDto => {
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

    getProductVm(productDto, orderDtos) {
        const availableItems = this.getAvailableProducts(productDto, orderDtos);
        return new ProductVm(productDto.id, productDto.name, productDto.cost, productDto.totalItems, availableItems);
    }

    getCustomerVm(customerDto) {
        return new CustomerVm(customerDto.id, customerDto.firstName, customerDto.lastName);
    }

    getOrderVm(orderDto, bankVm) {
        const productOrderVms = orderDto.productOrderDtos.map(productOrderDto => this.getProductOrderVm(productOrderDto));
        const customerVm = this.getCustomerVm(orderDto.customerDto);
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