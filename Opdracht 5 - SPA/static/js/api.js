var request = new XMLHttpRequest();


request.onload = function() {
    var data = JSON.parse(request.responseText);
    console.log(data)
};

request.onError = function() {

}

request.open('GET', 'http://api.weatherunlocked.com/api/forecast/nl.1972?lang=nl&app_id=b7dff351&app_key=a82cccc7ee0981db93b7508449f13e0b', true);
request.send();
