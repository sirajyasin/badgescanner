function startScan() {
        var valid_users = ['efgjkmp', 'edihyav', 'eabimod', 'ebalkan', 'eamaral', 'efeomaz']
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  alert(result.text);
		  alert('check and take some action');
		  if (valid_users.includes(result.text)) {
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'green';
		  } else {
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'red';
	          }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
		}
	);

}
