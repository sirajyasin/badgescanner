function startScan() {
        var valid_users = ['efgjkmp', 'edihyav', 'eabimod', 'ebalkan', 'eamaral', 'efeomaz']
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  alert(result)
		  alert('check and take some action')
		  if (valid_users.include(result.text)) {
			  document.body.style.background = "green"; 
			  $('#blink').style.display = 'block';
			  $('#blink').style.background = 'green';
		  } else {
			  document.body.style.background = "red"; 
			  $('#blink').style.display = 'block';
			  $('#blink').style.background = 'red';
	          }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
		}
	);

}
