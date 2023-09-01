class OrdersClassNames {
    static orders = ".orders";
    static ordersListItems = this.orders + " > " + ListItems.dot(ListItems.listItems);
    static ordersBar = this.orders + " > .orders-bar";
    static filterIndicator = this.ordersBar + " > " + ListItems.dot(ListItems.listItemIndicator);
    static filterMessage = this.ordersBar + " > " + ListItems.dot(ListItems.listItemMessage);
}