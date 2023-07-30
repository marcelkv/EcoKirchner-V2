class ResProducts {
    static greenText = "Haben wir";
    static redText = "Haben wir nicht";
    static grayText = "Alle Produkte";
    static costText = "Preis:";
    static totalText = "Gesamt:";
    static availableText = "Reserve:";

    static requestTotalNumberOfItemsText(productVm) {
        return "Gesamt Anzahl für " + productVm.name + ": " + productVm.totalItems;
    }

    static requestItemCostText(productVm) {
        return "Preis für " + productVm.name + ": " + productVm.costAsString;
    }

    static requestNameText(productVm) {
        return "Name für " + productVm.name;
    }

    static requestAvailableItemsText() {
        return "Die Reserve wird automatisch berechnet.";
    }
}