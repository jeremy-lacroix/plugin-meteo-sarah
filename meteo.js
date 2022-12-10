exports.action = function(data, callback, config){
  
  if (!data.city){
    var city = config.modules.meteo.city;
  }
  else{
    var city = data.city;
  }
  
  //Config API
  var key = "fe5059aef22a26d76f18cbdaffd3750f";
  var request = require('request');
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&lang=fr&units=metric&APPID=" + key;
  
  //Call API
  request({ 'uri' : url }, function (err, response, body){

      if (err || response.statusCode != 200) {
        callback({'tts': "L'action a échoué"});
        return;
      }
      else{
        var result = JSON.parse(body);
        var meteo_text = text_meteo(result, city);
        console.log(result['weather'][0]['description']);
        callback({'tts': meteo_text});
      }
  });
}

//Create speech return value
function text_meteo(result, city){
  if(result['weather'][0]['description'] == 'brume'){
    var out = "A " + city + " il y a de la" + result['weather'][0]['description'] + ", la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  if(result['weather'][0]['description'] == 'couvert'){
    var out = "A " + city + " le ciel est " + result['weather'][0]['description'] + ", la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  if(result['weather'][0]['description'] == 'nuageux'){
    var out = "A " + city + " le temps est " + result['weather'][0]['description'] + ", la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  if(result['weather'][0]['description'] == 'peu nuageux'){
    var out = "A " + city + " le ciel est couvert, la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  if(result['weather'][0]['description'] == 'ciel dégagé'){
    var out = "A " + city + " le ciel est dégagé, la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  if(result['weather'][0]['description'] == 'partiellement nuageux'){
    var out = "A " + city + " le ciel est légérement nuageux, la température actuel est de " + Math.round(result['main']['temp']) + " degrer , la température minimal est de " + Math.round(result["main"]["temp_min"]) + " degrer et la température maximal est de " + Math.round(result["main"]["temp_max"]) + " degrer Celsius ";
  }
  
  return out;
}
