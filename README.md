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
De opdracht luidde: maak een single page web app waarin je data ophaalt uit een API. Ik ging zoeken naar een API en al snel bleek dat er tal van leuke API's beschikbaar waren
maar dat er ook een moeilijkheidgraad aan een API hangt. Ik kwam daarom al snel uit bij de [news API.](https://www.programmableweb.com/api/news) Omdat ik eerder al voor een [Movie review API](https://www.programmableweb.com/api/new-york-times-movie-reviews) een basisstructuur opgezet had, was het niet moeilijk de API te veranderen. Ik ben uiteindelijk van de movie review API afgestapt omdat deze toch niet voldoende informatie bleek te bevatten.

## Procces
omdat ik het uit mijzelf schrijven van JavaScript nog erg lastig vindt, heb ik veel hulp gehad van de leraar en mede studenten.Dit heeft er voor gezorgd dat ik de basisstructuur ging begrijpen. Als eerst heb ik ervoor gezorgd dat de navigatie voor de single page web app werkte. Dit heb ik gedaan door 2 sections op de HTML pagina aan te maken.
```
<section id="Start">
  <h1>Home</h1>

</section>

<section id="news" class="none">
  <h1>Top Stories</h1>
  <div id="activities">
    <ul>
      <li><a class="display_title" data-bind="title"></a></li>
      <li><a class="source" data-bind="source"></a></li>
      <li><img src="" data-bind="image"></li>
      <li><a class="summary" data-bind="summary"></a></li>
    </ul>
  </div>
</section>
```
De section met 
