document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
}

function startScan() {
        var valid_users = ['efgjkmp', 'edihyav', 'eabimod', 'ebalkan', 'eamaral', 'efeomaz']
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  if (valid_users.include(result.text)) {
			  document.body.style.background = "green"; 
		  } else {
			  document.body.style.background = "red"; 
	          }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
		}
	);

}
