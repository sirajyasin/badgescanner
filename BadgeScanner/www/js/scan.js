
var red_plug_id = "8006483CBBE44CAE81CCD5BC07526DF61A5A9B8E";
var green_plug_id = "80065D728E14913AAD1899ABBD49774E1A5A1365";
//var plug_token = "f1f2df00-A1v58z3AR3UJ8wcuwUI9Ks9";
var plug_token = "f1f2df00-A3Uc43Ujs5w2Ov59RlccQF0";
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
}

function deny_user() {
    api_call(1, red_plug_id);
    turn_on_red_light()
    setTimeout(function(){ api_call(0, red_plug_id); }, 500);
    setTimeout(function(){ turn_off_light(); }, 6000);
}

function validate_code(signum, rand) {
    var valid = false;
    $.ajax({
    url: "https://api.myjson.com/bins/5zbki",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (data, textStatus, jqXHR) {
        user_info =  data;
        if ( !(signum in user_info['rand_num']) ) {
            alert('Invalid User.');
	    valid = false;
            return false;
        }
	alert(rand);
	alert(user_info['rand_num'][signum]['rand']);

	if ( rand != user_info['rand_num'][signum]['rand'] ) {
	    alert('Invalid code.');
	    valid = false;
	    return false;
        }
	var expiry = new Date(user_info['rand_num'][signum]['expiry']);
	var now = new Date();
	if ( expiry > now ) {
	  alert('Valid User and Valid Code.');
	  valid = true;
	} else {
	  alert('code Expired.');
	  valid = false;
	  return false;
	}
    }
    });
    return valid;

}

function startScan() {
        var valid_users;
	users = window.localStorage.getItem('valid_users');
	if ( users && users.trim().length != 0) {
		valid_users = users.split(",");
	} else {
		valid_users = ['efgjkmp', 'ebalkan', 'eamaral'];
	}
	cordova.plugins.barcodeScanner.scan(
		function (result) {
		  var  scan_result = result.text;
		  alert(scan_result);
		  if ( scan_result && scan_result.length == 19 ) {
		      var usr = scan_result.trim().substr(0,7);
		      if (valid_users.includes(usr)) {
		        alert('Valid User');
			var rand = scan_result.trim().substr(7, 19);
			var result = validate_code(usr, rand);
			if (result) {
		          $('#blink')[0].style.display = 'block';
		          $('#blink')[0].style.background = 'green';
		          allow_user();
                          setTimeout(startScan, 6000);
			} else {
		          $('#blink')[0].style.display = 'block';
		          $('#blink')[0].style.background = 'red';
		          deny_user();
                          setTimeout(startScan, 6000);
			}
		      } else {
		        $('#blink')[0].style.display = 'block';
		        $('#blink')[0].style.background = 'red';
		        deny_user();
                        setTimeout(startScan, 6000);
	              }
		  } else {
			document.body.style.background = "orange"; 
			setTimeout(startScan, 6000);
		  }
                        
		}, 
		function (error) {
			  document.body.style.background = "orange"; 
			  setTimeout(startScan, 6000);
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


