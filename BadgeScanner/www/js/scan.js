function startScan() {
        var valid_users = ['efgjkmp', 'ebalkan', 'eamaral']
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  if (valid_users.includes(result.text)) {
			  alert('valid user, gate open');
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'green';
		  } else {
			  alert('Invalid user, Please try again');
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'red';
	          }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
		},
		{
                  preferFrontCamera : true, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  saveHistory: true, // Android, save scan history (default false)
                  prompt : "Place a barcode inside the scan area", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
                }
	);

}
