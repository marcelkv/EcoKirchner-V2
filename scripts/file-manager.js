class FileManager {
    get fileInput() {
        return document.querySelector(".file-selector");
    }

    constructor() {
        this.onAppDataReady = null;
    }

    init() {
        this.fileInput.onchange = (event) => this.handleSelectedFile(event);
    }

    selectFile() {
        this.fileInput.click();
    }

    handleSelectedFile(event) {
        const file = event.target.files[0];

        if (!file) {
            alert('No file selected.');
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                const appDataDto = new AppDataDto(jsonData.productDtos, jsonData.customerDtos, jsonData.orderDtos);
                this.onAppDataReady(appDataDto);
            } catch (error) {
                alert('Error parsing JSON file: ' + error.message);
            }
        };

        reader.readAsText(file);
    }

    writeToFile(appData) {
        const fileName = this.getDateTimeString() + " - " + encodeURIComponent("MyAppData.json");
        const dataBlob = new Blob([JSON.stringify(appData)], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
    }

    getDateTimeString() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}.${month}.${day} - ${hours}${minutes}${seconds}`;
    }
}