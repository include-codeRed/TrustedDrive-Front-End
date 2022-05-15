function initMap() {
    let elemEmbedMap = document.getElementById('content-form-schedule-set-map');

    const position = {
        lat: 24.534,
        lng: 52.534
    }

    let map = new google.maps.Map(elemEmbedMap, {
        position,
        zoom: 8
    });

    map.setCenter(position);

    // location button 
    const locateBtn = document.createElement('button');
    locateBtn.textContent = "";
    locateBtn.classList.add('custom-map-control-button');

    const addCustomMarker = document.createElement('div');
    addCustomMarker.classList.add('marker-div-custom');
    const addMarkerImg = document.createElement('img');
    addMarkerImg.src = '/Front-End/asset/image/map_icon.png';
    addMarkerImg.alt = "marker pointer";
    addMarkerImg.classList.add('marker-img-custom')
    addCustomMarker.appendChild(addMarkerImg);

    map.controls[google.maps.ControlPosition.CENTER].push(addCustomMarker);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locateBtn);

    locateBtn.addEventListener('click', () => {
        locating();
    });

    addCustomMarker.addEventListener("click", () => {
        map.setZoom(15);
    });


    map.addListener("center_changed", () => {
        window.setTimeout(() => {
            setOnMap();
        },5000)
    });

    function locating() {
        let infoWindow = new google.maps.InfoWindow();
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
    
                const currentPost = {
                    lat : position.coords.latitude,
                    lng : position.coords.longitude
                };
    
                // let map = new google.maps.Map(embedMap,{
                //     position: currentPost,
                //     zoom: 8
                // });
                
                map.setCenter(currentPost);
                
                infoWindow.setPosition(currentPost);
                infoWindow.setContent("Found Location");
                infoWindow.open(map);
            },
            () => {
                HasLocationError(true, infoWindow, map);
            });
        } else {
            HasLocationError(false, infoWindow, map);
        } 
    }

    function HasLocationError(isWorking,infoWindow,map) {
        let pos = map.getCenter();
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            isWorking
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation"
        );
        infoWindow.open(map);
    }

    let dropLocation = document.getElementById("form-schedule-address");

    dropLocation.addEventListener('change', searchLocation);

    function searchLocation() {
        var request = {
            query: dropLocation.value,
            fields: ['name', 'geometry'],
        };

        service = new google.maps.places.PlacesService(map);

        const options = {
            componentRestrictions: { country: "In" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["establishment"],
          };
          const autocomplete = new google.maps.places.Autocomplete(dropLocation, options);

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }

                map.setCenter(results[0].geometry.location);
            }
        });
    }

    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
    
        map.setCenter(place.geometry.location);
    }


    async function setOnMap() {
        let lat = map.getCenter().lat();
        let lng = map.getCenter().lng();
        let key = 'AIzaSyCeDt3ZsPoeSvDCttvQURP5FsmCVxoLEV4';
        let httpsUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;

        const response = await fetch(httpsUrl);
        const result = await response.json();
        dropLocation.value = result.plus_code.compound_code;
        // console.log(result.plus_code.compound_code);
    }

}








// let dropLocation = document.getElementById("form-schedule-address");

// dropLocation.addEventListener("change", searchLocation);

// function searchLocation() {
//     const sydney = new google.maps.LatLng(-33.867, 151.195);

//     let infowindow = new google.maps.InfoWindow();
//     let map = new google.maps.Map(document.getElementById("content-form-schedule-set-map"), {
//         center: sydney,
//         zoom: 15,
//     });

//     var request = {
//         query: dropLocation.value,
//         fields: ['name', 'geometry'],
//       };

//     service = new google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//             for (let i = 0; i < results.length; i++) {
//                 createMarker(results[i]);
//             }

//             map.setCenter(results[0].geometry.location);
//         }
//     });
// }