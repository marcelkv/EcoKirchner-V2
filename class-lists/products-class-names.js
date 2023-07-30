class ProductsClassNames {
    static products = ".products";
    static productsListItems = this.products + " > " + ListItems.dot(ListItems.listItems);
    static productsBar = ".products > .products-bar";
    static filterIndicator = this.productsBar + " > " + ListItems.dot(ListItems.listItemIndicator);
    static filterMessage = this.productsBar + " > " + ListItems.dot(ListItems.listItemMessage);
}