
var red_plug_id = "8006483CBBE44CAE81CCD5BC07526DF61A5A9B8E";
var green_plug_id = "80065D728E14913AAD1899ABBD49774E1A5A1365";
var plug_token = "f1f2df00-A1v58z3AR3UJ8wcuwUI9Ks9";
var light_token = "cb285a31cee4325fddb8fffddfd80dfb5c1d24cbb797598da8772c83b3453fb6";


function api_call(state, device_id) {
   var api_server = 'https://wap.tplinkcloud.com/';
   var _data = {
     "method": "passthrough",
     "params": {
       "deviceId": device_id,
       "requestData": "{\"system\":{\"set_relay_state\":{\"state\":"+ state +"}}}",
       "token": plug_token
     }
   }
  
   $.support.cors = true;
   $.ajax({
      url:  api_server,
      type: "POST",
      data: JSON.stringify(_data),
      dataType: "json",
      contentType: "application/json; charset=utf-8"
   });
}

function light(action, color) {
   var api_server = 'https://api.lifx.com/v1/lights/all/state';
   var _data = {
    "power": action,
    "color": color,
    "duration": 0,
    "fast": true
   }
  
   $.support.cors = true;
   $.ajax({
      url:  api_server,
      type: "PUT",
      data: JSON.stringify(_data),
      dataType: "json",
      headers: {"Authorization": "Bearer " + light_token},
      contentType: "application/json; charset=utf-8"
   });

}

function turn_on_green_light() {
   light('on', 'green') 
}

function turn_on_red_light() {
   light('on', 'red') 
}

function turn_off_light() {
   light('off', '') 
}

function allow_user() {
    api_call(1, green_plug_id);
    turn_on_green_light()
    setTimeout(function(){ api_call(0, green_plug_id); }, 500);
    setTimeout(function(){ turn_off_light(); }, 6000);
    startScan();
}

function deny_user() {
    api_call(1, red_plug_id);
    turn_on_red_light()
    setTimeout(function(){ api_call(0, red_plug_id); }, 500);
    setTimeout(function(){ turn_off_light(); }, 6000);
    startScan();
}

function startScan() {
        var valid_users;
	users = window.localStorage.getItem('valid_users');
	if ( users.trim().length != 0) {
		valid_users = users.split(",");
	} else {
		valid_users = ['efgjkmp', 'ebalkan', 'eamaral'];
	}
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  if (valid_users.includes(result.text)) {
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'green';
			  allow_user();
		  } else {
			  $('#blink')[0].style.display = 'block';
			  $('#blink')[0].style.background = 'red';
			  deny_user();
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


