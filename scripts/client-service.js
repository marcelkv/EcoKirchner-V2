class ClientService {
    get appDataDto() {
        const customerDtos = this.customerVms.map(customerVm =>
            new CustomerDto(customerVm.id, customerVm.firstName, customerVm.lastName)
        );

        const productDtos = this.productVms.map(productVm =>
            new ProductDto(productVm.id, productVm.name, productVm.cost, productVm.totalItems)
        );

        const orderDtos = this.orderVms.map(orderVm =>
            new OrderDto(orderVm.id, orderVm.customer, orderVm.productOrders, orderVm.delivered, orderVm.paymentMethod)
        );

        return new AppDataDto(productDtos, customerDtos, orderDtos);
    }

    constructor() {
        this.saveAppData = null;
        this.updateData = null;
    }

    setAppData(appData) {
        const productVms = appData.productDtos.map(productDto => {
            let availableItems = productDto.totalItems;
            appData.orderDtos.map(orderDto => {
                const foundProductOrder = orderDto.productOrders.find(productOrder => productOrder.productDto.id === productDto.id);
                if (foundProductOrder) {
                    availableItems -= foundProductOrder.quantity;
                }
            });

            return new ProductVm(productDto.id, productDto.name, productDto.cost, productDto.totalItems, availableItems);
        });

        const customerVms = appData.customerDtos.map(customerDto =>
            new CustomerVm(customerDto.id, customerDto.firstName, customerDto.lastName)
        );

        const orderVms = appData.orderDtos.map(orderDto =>
            new OrderVm(orderDto.id, orderDto.customer, orderDto.productOrders, orderDto.delivered, orderDto.paymentMethod)
        );

        this.productVms = productVms;
        this.customerVms = customerVms;
        this.orderVms = orderVms;
        this.updateData();
    }

    onSaveAppDataRequested() {
        this.saveAppData(this.appDataDto);
    }
}