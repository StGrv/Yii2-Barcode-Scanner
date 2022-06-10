# Yii2-Barcode-Scanner

1. When you scan a QR code the successfully retrieved code is sent to a JS function.
2. Via AJAX we send the data to a PhP function that checks if it exists in the DB.
3. If it exists we return the necessary result json encoded back to the JS function. If it doesn't we just send back a message.
4. On success we manipulate the result as we wish.
