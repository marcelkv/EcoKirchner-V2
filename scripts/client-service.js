class ClientService {
    get appDataDto() {
        const customerDtos = [];
        const productDtos = [];

        this.customerVms.forEach(customerVm => {
            customerDtos.push(new CustomerDto(customerVm.id, customerVm.firstName, customerVm.lastName));
        });

        this.productVms.forEach(productVm => {
            productDtos.push(new ProductDto(productVm.id, productVm.name, productVm.cost, productVm.totalItems));
        });

        return new AppDataDto(productDtos, customerDtos);
    }

    constructor() {
        this.saveAppData = null;
    }

    setAppData(appData) {
        const productVms = [];
        const customerVms = [];

        appData.productDtos.forEach(productDto => {
            productVms.push(new ProductVm(productDto.id, productDto.name, productDto.cost, productDto.totalItems));
        });

        appData.customerDtos.forEach(customerDto => {
            customerVms.push(new CustomerVm(customerDto.id, customerDto.firstName, customerDto.lastName));
        });

        this.productVms = productVms;
        this.customerVms = customerVms;
    }

    onSaveAppDataRequested() {
        this.saveAppData(this.appDataDto);
    }
}