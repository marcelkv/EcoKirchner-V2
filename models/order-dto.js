class OrderDto {
    constructor(id, customerDto, productOrderDtos, delivered, paymentMethod) {
        this.id = id;
        this.customerDto = customerDto;
        this.productOrderDtos = productOrderDtos;
        this.delivered = delivered;
        this.paymentMethod = paymentMethod;
    }
}