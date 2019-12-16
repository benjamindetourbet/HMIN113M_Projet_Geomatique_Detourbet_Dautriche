$.getJSON("http://localhost:5000/pi/"+document.getElementById("element").innerHTML, function(data) {
    markersPI = [];
    popupsPI = [];
    nbPI = 0;

    $.each(data, function(indice, liste) {
      for(i=0; i<liste.length; i++ ){    // Pour chaque element dans la liste
         var isFound = false;
         var isFoundName = false;
         var x, y;
         var namePlace;
         var newList = liste[i].split(",");
         for(j=0; j<newList.length; j++ ){
           var items = newList[j].split(":");
           for(k=0; k<items.length; k++){
             items[k] = items[k].trim().replace(/['"]+/g, '');
             // pour trouver les coordonnées
             if(items[k].localeCompare("coordinates")==0){ // test si vrai alors = 0
                x = items[k+1].replace(/[^0-9.]/g, ""); // remplace tout ce qui n'est pas un chiffre ou un point
                y = newList[j+1].replace(/[^0-9.]/g, "");
                isFound = true;
             }
             //Pour extraires les noms
             if(items[k].localeCompare("name")==0){
               namePlace = items[k+1];
               isFoundName = true;
             }
           }
           if(isFound&&isFoundName) break; //Fin de la boucle for
         }

         if(isFound&&isFoundName){ //test si les elements sont trouvés
           markersPI.push(document.getElementById('marker').cloneNode());
           markersPI[nbPI].id = nbPI; //donne un ID aux marqueurs
           map.addOverlay(new ol.Overlay({ //ajout des marqueurs
              position: ol.proj.fromLonLat([x,y]),
              positioning: 'center-center',
              element: markersPI[nbPI] //appel de la liste
           }));

           popupsPI.push(document.getElementById('popup').cloneNode());
           namePlace = namePlace.replace(/(['"])/g, "");
           popupsPI[nbPI].innerHTML = ""+namePlace;  // affichage du nom
           popupsPI[nbPI].id = "popup"+nbPI;  // donne un ID aux noms
           map.addOverlay(new ol.Overlay({
               positioning: 'center-center',
               offset : [20, -25],
               position: ol.proj.fromLonLat([x,y]),
               element: popupsPI[nbPI]
           }));
           markersPI[nbPI].addEventListener('click', function(evt) {
          let popup = document.getElementById("popup"+evt.target.id);
                 (popup.style.display == "none" ? popup.style.display = "block" :
                                                  popup.style.display = "none")
           });

          nbPI++;
          let html = "<li>"+namePlace + " ("+x + ":" + y+")</li>"; //concatenation des infos
          $("#pis").append(html);
       }
     }
    });

});
