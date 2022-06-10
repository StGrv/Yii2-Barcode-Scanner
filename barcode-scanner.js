/* BARCODE SCANNER */
function barcodeScannerDocReady(fn) {
    // See if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // Call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

let lastScanBarcode, countResults = 0;
let error_block = $('#error_block');

error_block.css('display', 'none');
error_block.text('');

function onScanSuccess(scanBarcode) {

    if (scanBarcode !== lastScanBarcode) {
        ++countResults;
        lastScanBarcode = scanBarcode;

        $.ajax({
            url: url('BarcodeScanner'),
            method: "POST",
            data: {scanBarcode: scanBarcode},
            success: function (data) {
                let result = JSON.parse(data);

                if (result['notFoundMessage']) {
                    error_block.css('display', 'block');
                    error_block.html(result['notFoundMessage']);

                    lastScanBarcode = 0;
                }
            }
        });
    }
}

barcodeScannerDocReady(function () {
    var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {fps: 10, qrbox: 250});
    html5QrcodeScanner.render(onScanSuccess);
});