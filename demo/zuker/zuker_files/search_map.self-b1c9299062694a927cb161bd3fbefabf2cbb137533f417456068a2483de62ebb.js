// gon.all_schools = [
//   {
//     "name"    : "政治大學",
//     "en_name" : "NCCU",
//     "address" : "台北市文山區指南路二段64號",
//     "lat"     : "24.987331",
//     "lng"     : "121.576128"
//   },
//   {
//     "name"    : "臺灣大學",
//     "en_name" : "NTU",
//     "address" : "臺北市羅斯福路四段一號",
//     "lat"     : "25.018635",
//     "lng"     : "121.539838"
//   },
//   {
//     "name"    : "世新大學",
//     "en_name" : "SHU",
//     "address" : "台北市文山區木柵路一段17巷1號",
//     "lat"     : "24.988645",
//     "lng"     : "121.544207"
//   },
//   {
//     "name"    : "臺北教育大學",
//     "en_name" : "NTUE",
//     "address" : "臺北市大安區和平東路2段134號",
//     "lat"     : "25.024624",
//     "lng"     : "121.544637"
//   },
//   {
//     "name"    : "臺灣科技大學",
//     "en_name" : "NTUST",
//     "address" : "臺北市大安區基隆路4段43號",
//     "lat"     : "25.013250",
//     "lng"     : "121.541119"
//   },
//   {
//     "name"    : "臺灣師範大學",
//     "en_name" : "NTNU",
//     "address" : "臺北市大安區和平東路一段162號",
//     "lat"     : "25.025951",
//     "lng"     : "121.527489"
//   },
//   {
//     "name"    : "臺北醫學大學",
//     "en_name" : "TMU",
//     "address" : "臺北市信義區吳興街250號",
//     "lat"     : "25.025951",
//     "lng"     : "121.561267"
//   },
//   {
//     "name"    : "淡江大學",
//     "en_name" : "TKU",
//     "address" : "新北市淡水區英專路151號",
//     "lat"     : "25.174989",
//     "lng"     : "121.452337"
//   }
// ];


var zuker_map = {
  map: "",
  infowindow: "",
  bound: "",

  markers : new Array(),
  all_schools: gon.all_schools
};
function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");

  /*
  while (mapdiv == null) {
    mapdiv = document.getElementById("map");
    console.log(mapdiv);
  }
  */

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    //mapdiv.style.height = '200px';
    if( $("#map").attr("data-height") == undefined ){
      mapdiv.style.height = ($(window).height() - $("nav.fixed-navbar").outerHeight()) + "px";
    }else{
      mapdiv.style.height = $("#map").attr("data-height") + "px";
    }

  }
}

// 由地址決定 marker
function geocodeAddress(geocoder, zukerMap, address, house_array) {
  $.each(house_array, function( index, house ) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        zukerMap.setCenter(results[0].geometry.location);

        if( $("body").hasClass("zh-TW") ){
          var infoWindowContent = house.title;
        }
        if( $("body").hasClass("en") ){
          var infoWindowContent = house.en_title;
        }
        infoWindowContent += "（<a href='/houses/" + house.token + "'>詳細</a>）";

        var all_schools_address_array = [];
        $.each( zuker_map.all_schools, function( key, school ) {
          all_schools_address_array.push(school.address);
        });

        // start: 計算距離與時間
        var gservice = new google.maps.DistanceMatrixService;
        // 走路
        gservice.getDistanceMatrix({
          origins: [address],
          destinations: all_schools_address_array,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {

          if (status !== google.maps.DistanceMatrixStatus.OK) {
            //alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              infoWindowContent += "<ul class='map_destination_list'>";
              for (var j = 0; j < results.length; j++) {
                if(results[j].distance.value <= 2000){ // 小於 2000 公尺

                  if( $("body").hasClass("zh-TW") ){
                    // infoWindowContent += "<li>距 " + zuker_map.all_schools[j].name + " " + results[j].distance.text + "，走路 " + results[j].duration.text + "</li>";
                    infoWindowContent += "<li>" + "<i class='material-icons' style='font-size:16px;'>directions_walk</i> <strong>" + results[j].duration.text + "</strong> <i class='material-icons' style='font-size:12px;'>arrow_forward</i> <strong>" + zuker_map.all_schools[j].name + "</strong></li>";
                  }
                  if( $("body").hasClass("en") ){
                    // infoWindowContent += "<li><strong>" + zuker_map.all_schools[j].en_name + "</strong> " + results[j].distance.text + ", <i class='material-icons'>directions_walk</i> " + results[j].duration.text + "</li>";
                    infoWindowContent += "<li>" + "<i class='material-icons' style='font-size:16px;'>directions_walk</i> <strong>" + results[j].duration.text + "</strong> <i class='material-icons' style='font-size:12px;'>arrow_forward</i> <strong>" + zuker_map.all_schools[j].en_name + "</strong></li>";
                  }
                }
              }
              infoWindowContent += "</ul>";
            }
          }
        });
        // 開車
        // gservice.getDistanceMatrix({
        //   origins: [address],
        //   destinations: all_schools_address_array,
        //   travelMode: google.maps.TravelMode.DRIVING,
        //   unitSystem: google.maps.UnitSystem.METRIC,
        //   avoidHighways: false,
        //   avoidTolls: false
        // }, function(response, status) {

        //   if (status !== google.maps.DistanceMatrixStatus.OK) {
        //     //alert('Error was: ' + status);
        //   } else {
        //     var originList = response.originAddresses;
        //     var destinationList = response.destinationAddresses;
        //     for (var i = 0; i < originList.length; i++) {
        //       var results = response.rows[i].elements;
        //       infoWindowContent += "<ul class='map_destination_list'>";
        //       for (var j = 0; j < results.length; j++) {
        //         if(results[j].distance.value <= 2000){ // 小於 2000 公尺
        //           if( $("body").hasClass("zh-TW") ){
        //             infoWindowContent += "<li>距 " + zuker_map.all_schools[j].name + " " + results[j].distance.text + "，開車 " + results[j].duration.text + "</li>";
        //           }
        //           if( $("body").hasClass("en") ){
        //             infoWindowContent += "<li>Distance: " + zuker_map.all_schools[j].en_name + "; Time: " + results[j].distance.text + ": Drive " + results[j].duration.text + "</li>";
        //           }
        //         }
        //       }
        //       infoWindowContent += "</ul>";
        //     }
        //   }
        // });
        // end: 計算距離與時間


        var marker = new google.maps.Marker({
          map: zukerMap,
          position: results[0].geometry.location,
          house_id: house.token
        });
        marker.addListener('click', function(e) {
          if (zuker_map.infowindow) zuker_map.infowindow.close();
          zuker_map.infowindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });
          zuker_map.infowindow.open(zukerMap, marker);
          zukerMap.panTo(e.latLng);
          var house_id = this.house_id;
          $("div.house-item").each(function(){
            $(this).removeClass("active");
            if( $(this).attr("data-house-id") == house_id ){
              $(this).addClass("active");

              $('#search-container').scrollTo($(this), {
                offsetTop: $("nav.fixed-navbar").outerHeight() + 10,
                duration: 1000
              });
            }
          });
        });
        zuker_map.markers.push(marker);
      } else {
        //alert(status);
      }
    });
  });
}

function fit_bounds(){
  zuker_map.bound = new google.maps.LatLngBounds();
  for(var i in zuker_map.markers){
    zuker_map.bound.extend(zuker_map.markers[i].getPosition());
  }
  zuker_map.map.fitBounds(zuker_map.bound);
}

// map 初始化
function initMap() {
  detectBrowser();
  var map_zoom_level = 15;
  if( $("#map").attr("data-zoom-level") != undefined ){
    map_zoom_level = parseInt($("#map").attr("data-zoom-level"));
  }
  var mapOptions = {
    zoom: map_zoom_level,
    //center: {lat: -34.397, lng: 150.644},
    //disableDefaultUI: true
    zoomControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true
  };

  zuker_map.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  //console.log(gon.datas);
  $.each( gon.datas, function( key, value ) {
    geocodeAddress(geocoder, zuker_map.map, key, value);
  });

}



$(function(){
  $("div.house-item").hover(function(){
    $("div.house-item").removeClass("active");
    $(this).addClass("active");
    if (zuker_map.infowindow) zuker_map.infowindow.close();
    var data_house_id = $(this).attr("data-house-id");
    var data_house_name = $(this).attr("data-house-name");
    $.each(zuker_map.markers, function(){
      if( data_house_id == this.house_id){

        zuker_map.infowindow = new google.maps.InfoWindow({
          content: data_house_name + "（<a href='/houses/" + data_house_id + "'>詳細</a>）"
        });
        zuker_map.infowindow.open(zuker_map.map, this);

        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  }, function(){
    $(this).removeClass("active");
    var data_house_id = $(this).attr("data-house-id");
    $.each(zuker_map.markers, function(){
      if( data_house_id == this.house_id){
        if (zuker_map.infowindow) zuker_map.infowindow.close();
        if (this.getAnimation() !== null) {
          this.setAnimation(null);
        }
      }
    });
  });

  initMap();
});

$(window).load(function(){
  if( $("#map").attr("data-no-fitbounds") != "true" ){
    fit_bounds();
  }

});
$(window).resize(function(){
  detectBrowser();
  if( $("#map").attr("data-no-fitbounds") != "true" ){
    fit_bounds();
  }
});
