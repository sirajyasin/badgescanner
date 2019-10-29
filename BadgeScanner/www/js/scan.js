function startScan() {
        var valid_users = ['efgjkmp', 'edihyav', 'eabimod', 'ebalkan', 'eamaral', 'efeomaz']
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  alert(result);
		  alert('check and take some action');
		  if (valid_users.include(result.text)) {
			  $('#blink').style.display = 'block';
			  $('#blink').style.background = 'green';
		  } else {
			  $('#blink').style.display = 'block';
			  $('#blink').style.background = 'red';
	          }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
		}
	);

}
