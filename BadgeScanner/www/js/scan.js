function startScan() {
        var valid_users = ['efgjkmp', 'edihyav', 'eabimod', 'ebalkan', 'eamaral', 'efeomaz']
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
		}
	);

}
