# wafs
The course repo for 'Web App From Scratch'

## Voor en nadelen van JavaScript libraries/frameworks

### Voordelen
- Met minder code meer mogelijkheden. [bron](http://z-drenthe-hulp.hcc.nl/javascript0.html)
- Om jQuery te leren is kennis van JavaScript niet vereist [Bron](http://z-drenthe-hulp.hcc.nl/javascript0.html)
- Gratis te gebruiken [Bron](https://www.wpbeveiligen.nl/is-jquery-nu-precies-is-veilig)
- Grootste geaccepteerde standaar binnen dynamische websites [bron](https://www.wpbeveiligen.nl/is-jquery-nu-precies-is-veilig)
- Compatible met bijna elke browser [Bron](https://www.wpbeveiligen.nl/is-jquery-nu-precies-is-veilig)

### Nadelen
- Makkelijk om te leren, moeilijk om goed in te worden [bron](http://z-drenthe-hulp.hcc.nl/javascript0.html)
- Veel jQuery scripts worden extern geladen [Bron](https://www.wpbeveiligen.nl/is-jquery-nu-precies-is-veilig)

### Eigen bevindingen
Ik heb nog geen ervaring met jQuery, dus ik kan eigenlijk niet zeggen wat ik zelf van jQuery vind.
Wel kan ik uit de bronnen opmaken dat het een fijne programmeer taal is die snel zijn werk kan doen.


## voor en nadelen van een client-side single page web apps

### Voordelen
- Vlotte gebruikerservaring [Bron](https://nl.wikipedia.org/wiki/Single_Page_Application)
- Voelt aan als computerprogramma wat je op je eigen computer draait. [Bron](https://nl.wikipedia.org/wiki/Single_Page_Application)
- Alle benodigde code, HTML, CSS en JavaScript wordt opgehaald met een enkele laad actie van de pagina [Bron](https://nl.wikipedia.org/wiki/Single_Page_Application)
-

### Nadelen
- Als je de pagina wil refreshen, refresh je meteen alles.
- Als er iets binnen de code kapot is, loop je kans dat de rest van de code ook niet lekker werkt.

### Eigen bevindingen
Voor het groepsproject van het project information design van vorig blok, heb ik samen met Victor Zumpolle een single page web app gemaakt.
We hebben om dit werkend te krijgen veel JavaScript gebruikt. We hebben veel eventlisteners gebruikt en in de HTML veel elementen een class active gegeven.
Vervolgens zorgden we er met JavaScript voor dat we die classes weer verwijderden als we de elementen niet meer nodig hadden.

Ik vind het een fijne manier van werken, al moet ik eerlijk zeggen dat ik het bouwen ervan nog wel erg moeilijk vind.

## Best practices - spa app
![live demo](http://wafs.joepgravemaker.nl/)
De opdracht luidde: maak een single page web app waarin je data ophaalt uit een API. Ik ging zoeken naar een API en al snel bleek dat er tal van leuke API's beschikbaar waren
maar dat er ook een moeilijkheidgraad aan een API hangt. Ik kwam daarom al snel uit bij de [news API.](https://www.programmableweb.com/api/news) Omdat ik eerder al voor een [Movie review API](https://www.programmableweb.com/api/new-york-times-movie-reviews) een basisstructuur opgezet had, was het niet moeilijk de API te veranderen. Ik ben uiteindelijk van de movie review API afgestapt omdat deze toch niet voldoende informatie bleek te bevatten.

## Procces
omdat ik het uit mijzelf schrijven van JavaScript nog erg lastig vindt, heb ik veel hulp gehad van de leraar en mede studenten.Dit heeft er voor gezorgd dat ik de basisstructuur ging begrijpen. Als eerst heb ik ervoor gezorgd dat de navigatie voor de single page web app werkte. Dit heb ik gedaan door 2 sections op de HTML pagina aan te maken.
```html
<section id="Start">
  <h1>Home</h1>

</section>

<section id="news" class="none">
  <h1>Top Stories</h1>
  <div id="activities">
    <ul>
      <li><a class="display_title" data-bind="title"></a></li>
      <li><img src="" data-bind="image"></li>
    </ul>
  </div>
</section>
```
De section met ```id="news"``` heb ik een ```class="none"``` mee gegeven. Deze staat in de css als volgt gedeclareerd:
```css
.none{
	display: none;
}
```
Deze id wordt dus bij het openen van de pagina niet getoond. Met JavaScript heb ik er voor gezord dat als men in de navigatie op News zou klikken, dat de home pagina dan zou de ```class="none"``` toegewezen zou krijgen en dat deze bij ```id="news"``` er van af gehaald zou worden. Dit heb ik als volgt gedaan.
```javascript
var sections = document.querySelectorAll("section");
var section = document.querySelector(route);

for (var i = 0; i < sections.length; i++) {
  sections[i].classList.add("none")
}
if (document.querySelector(route)) {
  document.querySelector(route).classList.remove("none")
}
```

### routie
Vervolgens was het de opdracht om de routie goed te implementeren. De routie bepaald de routing door de pagina. Dit vond ik ook nog redelijk lastig, maar na wat hulp en zelf online opzoeken is het ook voor mij een logische structuur.'start', 'news' en 'news/:name' zijn aan de JavaScript gekoppeld door middel van hun ID in de HTML. Daarna geef ik er een function aan mee die vervolgens de juiste 'pagina' toggled.
Dit doet hij dus doormiddel van ```template.toggle```. Bij ```news/:name``` Toggled hij ook mijn nieuws detailpagina.
```javascript
routie({
  'start': function() {
    console.log('test')
    template.toggle('#Start')
  },
  'news': function() {
    template.toggle('#news')
    template.render(data)
  },
  'news/:name': function(name) {
    console.log(name)
    template.toggle('#newsmain')
    template.newDetail(data, name)
  }
})
```

### De juiste data tonen
Vervolgens ging ik verder met het welke data ik waar wilde gaan tonen. Ik had het idee om een overzichtspagina te maken met allemaal tegels met daarin een afbeelding en een titel. Als men dan vervolgens op die titel zou klikken zou je naar de detailpagina van dat nieuwsartikel doorverwezen worden en het artikel helemaal kunnen lezen.
Als eerst ben ik bezig gegaan met het declareren van de data die ik op mijn overzichtspagina wilde tonen. Dit heb ik als volgt gedaan. Als eerst ben ik door de data heen gaan mappen en heb de data er uit gepakt die ik nodig heb. Vervolgens heb ik die weer in een nieuwe variabelen news gestopt die weer met de HTML pagina communiceerde via data-binds.
```javascript
var dataNews = data.map(function(i) {
  return {
    title: i.title,
    display_link: i.title.replace(/ /g, "_"),
    multimedia: i.urlToImage,
  }
});

var news = {
  display_title: {
    href: function(params) {
      return `#news/${this.display_link}`
    }
  },
  image: {
    src: function(params) {
      return this.multimedia
    }
  }
};
```
Vervolgens heb ik doormiddel van Transparency de data in de pagina geladen. Hij pakt de section met id 'activities' uit de HTML en zet daar de data in.
```javascript
var target = document.getElementById('activities');
console.log(api.response.articles);

Transparency.render(target, dataNews, news);
},
```
Daarna ben ik verder gegaan met het declareren van de data voor de detailpagina. Ik heb hierbij het zelfde pad bewandeld als hierboven, alleen heb ik hier gefilterd op de data die ik wilde tonen. Hier krijgt hij de parameter name mee vanuit de routie, waar ik met een .replace de _ voor gewone spaties vervang. Daarna zeg ik dat de data gefilterd moeten worden en het artikel dat gelijk staat aan het aangeklikte artikel getooond moet worden. Daarna gebruik ik weer een map functie om te declareren wat ik wil laten zien en vervolgens stop ik dat weer in een variabelen newsDetail die dat vervolgens weer aan de HTML doorspeelt doormiddel van data-binds.

```javascript
newDetail: function(data, name) {
  var spaceName = name.replace(/_/g, " ")

  var dataNews2 = data.filter(function(i) {
    return i.title == spaceName
  }).map(function(i) {
    console.log(i)
    return {
      title: i.title,
      multimedia: i.urlToImage,
      description: i.description,
      linkName: i.url.name,
      link: i.url
    }
  });

  var newsDetail = {
    title: {
      href: function(params) {
        return this.title
      }
    },
    image: {
      src: function(params) {
        return this.multimedia
      }
    },
    description: {
      class: function(params) {
        return this.description
      }
    },
    linkName: {
      class: function(params) {
        return this.linkName
      }
    },
    link: {
      href: function(params) {
        return this.link
      }
    },
  }
```

### Interaction diagram
![alt text](https://github.com/japgroevemaker/wafs/blob/master/BEELD/WAFS/wafs4.jpg)

### Actor diagram
![alt text](https://github.com/japgroevemaker/wafs/blob/master/BEELD/WAFS/wafs42.jpg)

### Flow diagram
![alt text](https://github.com/japgroevemaker/wafs/blob/master/BEELD/WAFS/wafs43.jpg)

# Herkansing
Omdat de app nog niet helemaal was wat het moest zijn moest ik herkansen. Er waren een aantal punten waarop ik moest verbeteren. Ik moest onderandere er voor zorgen dat de gebruiker de data kon filteren en/of sorteren.

### Filteren
Omdat dit een verbeter punt was, ben ik aan de slag gegaan met een filter functie. Mijn idee was dat de gebruiker het nieuws uit verschillende landen zou moeten kunnen ophalen. Hiervoor heb ik radio buttons aan de ```HTML``` toegevoegd. Elk van deze radio buttons heeft een value dat staat voor het land.
```html
<input class="langChange" id="us" type="radio" name="country" value="us" checked>
<label for="us">Verenigde Staten</label>
<input class="langChange" id="nl" type="radio" name="country" value="nl">
<label for="nl">Nederland</label>
<input class="langChange" id="gb" type="radio" name="country" value="gb">
<label for="gb">Groot-Britannie</label>
<input class="langChange" id="fr" type="radio" name="country" value="fr">
<label for="fr">Frankrijk</label>
<input class="langChange" id="be" type="radio" name="country" value="be">
<label for="be">Belgie</label>
<input class="langChange" id="de" type="radio" name="country" value="de">
<label for="de">Duitsland</label>
```
Met deze value communiceer ik met mijn api zoals je hier onder kan zien.
```js
var langChange = {
  filter: function() {
    var lang = document.querySelectorAll(".langChange")
    for (var i = 0; i < lang.length; i++) {
      lang[i].addEventListener("click", function() {
        console.log(this.value);
        api.country = `country=${this.value}`
        api.getData()
      })
    }
  }
}
```
Vervolgens voer ik deze functie uit binnen mijn API variabel.
```js
country: `country=${langChange.filter()}`,
```
Daarna wil ik natuurlijk nog ervoor zorgen dat de gebruiker standaard al nieuws te zien krijgt als hij/zij op de pagina komt. Dit doe ik met een counter en een if else statement. Binnen de variabel api maak ik een nieuwe variabel aan.
```js
timesSearched: 0
```
Vervolgens maak ik het if else statement aan.
```js
if (this.timesSearched > 0) {

  var url = this.apiBasisUrl + this.typeOfNews + '?' + this.country + '&apiKey=' + this.apiKey;

} else {
  var url = this.apiBasisUrl + this.typeOfNews + '?' + "country=us" + '&apiKey=' + this.apiKey;
  this.timesSearched++
}
```
Hier in vertel ik dat, als de keer dat er gezocht is, groter dan 0 is. Hij deze waarde moet aanroepen:
```js
country: `country=${langChange.filter()}`,
```
Als dat niet het geval is moet hij dus de ```country=``` value op ```us``` zetten.
```js
"country=us"
```

## Feedback naar de gebruiker
Een ander punt was dat ik de gebruiker feedback moest geven als er bijvoorbeeld data ingeladen werd. Dit heb ik gedaan doormiddel van een loader.
Als eerst heb ik ```div``` aan de ```HTML``` toegevoegd.
```html
<div id="loader"></div>
```
Deze ben ik vervolgens gaan stijlen.
```css
#loader {
  margin: auto;
  border: 0.5em solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.5em solid #ff8533;
  width: 5em;
  height: 5em;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
	z-index: 20;
}
```
Vervolgens heb ik de ```animation``` gedeclareerd zodat de loader zou gaan draaien.
```css
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```
Daarna ben ik een ```function``` binnen javascript gaan aanmaken. Hier in selecteer ik de loader doormiddel van de id die er aan gekoppeld is. vervolgens voeg ik bij de ``` function hide()``` een class toe, en bij de ``` function show()``` haal ik diezelfde class weer weg. Deze specifieke class bevat alleen ```display: none;``` die er dus voor zorgt dat de loader getoond en verwijderd word.
```js
var loader = {
  hide: function(){
    var loader = document.getElementById('loader');
    loader.classList.add('none')
  },
  show: function(){
    var loader = document.getElementById('loader');
    loader.classList.remove('none')
  }
}
```
Vervolgens is het natuurlijk essentieel dat deze ```function()``` op de juiste plek wordt uitgevoerd. De ```function()``` moet uitgevoerd worden voor dat de api de data in laadt en weer moet worden verborgen als de data is ingeladen. Dat doe ik op deze manier.
```js
loader.show()
fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
    api.response = data
    routes.init(api.response.articles)
    loader.hide()
  }).catch(function(error) {
    console.log(error);
  })
```
## Conclusie
Nu ik tijdens de Herkansingen weer bezig ben geweest, gaat dit vak mij veel makkelijker af. Ik denk dat het ook goed geweest is dat ik eerst alle andere vakken heb gedaan en nu pas wafs. Ik kan nu veel meer zelf doen en mijn grootste struikelblok javascript wordt voor mij steeds logischer!
