class ResProducts {
    static greenText = "Haben wir";
    static redText = "Haben wir nicht";
    static grayText = "Alle Produkte";
    static costText = "Preis:";
    static totalText = "Gesamt:";
    static availableText = "Reserve:";

    static requestTotalNumberOfItemsText(productVm) {
        return "Gesamt Anzahl für " + productVm.name + ": ", productVm.totalItems;
    }
}