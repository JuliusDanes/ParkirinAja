function mapload(){
	/*alert("Hey Maps...");*/

	document.getElementById('mapload').src = "https://www.google.com/maps/d/u/1/embed?mid=11vWa73SWbg5NLvy9V2k4r0SsF0tKMKkm";
}
	var iframe = document.getElementById('mapload');


function mapspot(noId){
		document.getElementById('mapdiv').style.display = "none";		
		document.getElementById('mapload').style.display = "block";
	var conId = 'c_' + noId;
		// alert(conId);
	var con = document.getElementById(conId);
	var conDis = con.style.display;

	if (conDis=="none") {
		var bodyboxes = document.getElementsByClassName('bodybox');
		bodyboxes[0].style.display = "none";
		bodyboxes[1].style.display = "none";
		bodyboxes[2].style.display = "none";
		bodyboxes[3].style.display = "none";
		var conDis = con.style.display = "inline";
	}else{
		var conDis = con.style.display = "none";
	}

	var maps = document.getElementById('mapload');

	switch(noId){
		case "pares":
			maps.src = "https://www.google.com/maps/d/u/1/embed?mid=11vWa73SWbg5NLvy9V2k4r0SsF0tKMKkm"; 
			break;
		case "parli":
			maps.src = "https://www.google.com/maps/d/u/1/embed?mid=1eH3dwoGKXkLVo_XG-V8naXzzgpKHPr_l"; 
			break;
		case "rkrl":
			maps.src = "https://www.google.com/fusiontables/embedviz?q=select+col2%3E%3E0+from+1FJbOasiB45ry05EByUd6U8LlmKcWC_mNr-8ORKM&viz=MAP&h=false&lat=-6.197481229743014&lng=106.8325006650391&t=1&z=12&l=col2%3E%3E0&y=2&tmplt=2&hml=KML"; 
			//https://www.transportumum.com/jakarta/
			break;
		case "rtj":
			maps.src = "https://www.google.com/fusiontables/embedviz?q=select+col3+from+1HWPRIE9fqiNyZZ8SIA31XE7nKKRjxWjooAUC-6s&viz=MAP&h=false&lat=-6.204071501191501&lng=106.82012433593742&t=1&z=12&l=col3&y=2&tmplt=2&hml=KML"; 
			//sumber: http://www.transportumum.com/jakarta/transjakarta-busway/
			break;
	}

}


	var watchId = null;
	function geoloc() {
		document.getElementById('mapdiv').style.display = "block";		
		document.getElementById('mapload').style.display = "none";
	if (navigator.geolocation) {
		var optn = {
				enableHighAccuracy : true,
				timeout : Infinity,
				maximumAge : 0
		};
	watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
	} else {
			alert('Geolocation is not supported in your browser');
	}
	}

function showPosition(position) {
		var googlePos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var mapOptions = {
			zoom : 12,
			center : googlePos,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var mapObj = document.getElementById('mapdiv');
		var googleMap = new google.maps.Map(mapObj, mapOptions);
		var markerOpt = {
			map : googleMap,
			position : googlePos,
			title : 'Hi , I am here',
			animation : google.maps.Animation.DROP
		};
		var googleMarker = new google.maps.Marker(markerOpt);
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : googlePos
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					var popOpts = {
						content : results[1].formatted_address,
						position : googlePos
					};
				var popup = new google.maps.InfoWindow(popOpts);
				google.maps.event.addListener(googleMarker, 'click', function() {
				popup.open(googleMap);
			});
				} else {
					alert('No results found');
				}
				} else {
					alert('Geocoder failed due to: ' + status);
				}
			});
			}


		function showError(error) {
		var err = document.getElementById('mapdiv');
		switch(error.code) {
		case error.PERMISSION_DENIED:
		err.innerHTML = "User denied the request for Geolocation."
		break;
		case error.POSITION_UNAVAILABLE:
		err.innerHTML = "Location information is unavailable."
		break;
		case error.TIMEOUT:
		err.innerHTML = "The request to get user location timed out."
		break;
		case error.UNKNOWN_ERROR:
		err.innerHTML = "An unknown error occurred."
		break;
		}
		}
