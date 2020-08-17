var VanBooke1 = document.getElementsByClassName('VanBooke1');
var Gris1 = document.getElementsByClassName('VanNone1');

var VanBooke2 = document.getElementsByClassName('VanBooke2');
var Gris2 = document.getElementsByClassName('VanNone2');

//var DivBaniere = document.getElementById('Baniere');
var divFormulaireCache = document.getElementById('divFormulaireCache');
var divPagePrincipal = document.getElementById('divPagePrincipal');

var inputEnvoieVan = document.getElementById('inputEnvoieVan');
var dateVan = document.getElementById('dateVan');



function isDesign(str) {
    var design;
    if (window.matchMedia('only screen and (max-device-width: 320px)').matches) {
        design = 'touch';
    } else if (window.matchMedia('only screen and (max-device-width: 1024px)').matches) {
        design = 'tablet';
    } else if (window.matchMedia('screen').matches) {
        design = 'desktop';
    } else if (window.matchMedia('handheld').matches) {
        design = 'mobile';
    }
    else{
        design = 'ne peut pas determiner';
    }
    return(str == design);
}
/*

if (isDesign("touch")) {
    alert("Le design est touch");
} else if (isDesign("tablet")) {
    alert("Le design est tablet");
} else if (isDesign("desktop")) {
    alert("Le design est desktop");
} else if (isDesign("mobile")) {
    alert("Le design est mobile");
}
*/



/* Petit traitement sur les noms des capitaines affiches. On re-active le fait que l'on voit que ce sont des elements draggables pour les admins*/

var AdminConnecte = document.getElementById('divFormulairesAdministrationVANS');
var ClassesdivCapitaineAffiche = document.getElementsByClassName('divCapitaineAffiche');



if(AdminConnecte != null){
    for(i=0; i < ClassesdivCapitaineAffiche.length; i++){
        console.log("nb divs: ", ClassesdivCapitaineAffiche.length);
        console.log("j'applique le style");
        ClassesdivCapitaineAffiche[i].style.cursor = 'grab';
    }
}
    

console.log("Admin Connecte est: ", AdminConnecte);
//on rajoute l'évênement sur le div de gauche



var divFirstTime = document.getElementById('FirstTime');
var divTutoCache = document.getElementById('divContenantTuto');

divFirstTime.addEventListener('click', function() {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';
        //alert("ioo");

        divPagePrincipal.style.display = 'none';
        
        divTutoCache.style.display = 'flex';
    });
    
var divReturnTuto = document.getElementById('ReturnTuto');
var divTutoCache = document.getElementById('divContenantTuto');

divReturnTuto.addEventListener('click', function() {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';
        //alert("ioo");

        divPagePrincipal.style.display = 'flex';

        divTutoCache.style.display = 'none';
    });



/*J'ai du creer cette fonction sinon j'avais un pb pour renvoyer la valeur de la date. Je ne sais pas pk mais sans fonction la valeur de la date qui etait 
presente en dernier dans le tableau VanBooke2 etait celle qui etait appliquee sur tous mes elements.
*/

/*Cette fonction permet la création d'un objet XMLHttpRequest instancié afin d'envoyer un nouveau commentaire*/
function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
    alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
    return null;
    }
    return xhr;
}    



////////////////////////////////////////////////////////////////////////////////
///////////////////// Gestion des evenements pour PC ///////////////////////////
////////////////////////////////////////////////////////////////////////////////

if (isDesign("desktop")){
    
    
    /*////////////////////////////////////////////////////////////////////////////*/
    /*///////////////////// SUPPRESSION CAPITAINES  //////////////////////////////*/
    /*////////////////////////////////////////////////////////////////////////////*/

    var SupVan1 = document.getElementsByClassName('imageDe11');
    var SupVan2 = document.getElementsByClassName('imageDel2');
    var divFormulaireCacheDEL = document.getElementById('divFormulaireCacheDEL');
    var PafficheDateDEL = document.getElementById('AfficheDateDEL');

    var NumVanEnvoieVanDEL = document.getElementById('inputEnvoieVanDEL');
    var dateVanDEL = document.getElementById('dateVanDEL');
    var NomCapitaineDEL = document.getElementById('NomCapitaineDEL');

    function DelVan1 (SupVan, i, NumVan) { 
        SupVan.item(i).addEventListener('click', function(event) {

            event.stopPropagation();    //evite d'executer l'evenement lie au div et a l'ajout d'une personne

            var Date = SupVan[i].parentElement;
                Date = Date.parentElement;
                Date = Date.parentElement;
                Date = Date.previousElementSibling.innerHTML;
                console.log("la date est: ", Date);


            var NomCapitaine = SupVan[i].parentElement;
                //NomCapitaine = NomCapitaine.parentElement;
                NomCapitaine = NomCapitaine.previousElementSibling;
                NomCapitaine = NomCapitaine.previousElementSibling.textContent;
                console.log("le capitaine est: ", NomCapitaine);


            PafficheDateDEL.innerHTML = Date;

            divPagePrincipal.style.display = 'none';
            divFormulaireCacheDEL.style.display = 'flex';
            divFormulaireCacheDEL.style.flexDirection = 'column';
            divFormulaireCacheDEL.style.justifyContent = 'center';
            divFormulaireCacheDEL.style.alignItems = 'center';

            dateVanDEL.value = Date;
            console.log("le van est: ", NumVan);

            NumVanEnvoieVanDEL.value = NumVan;
            NomCapitaineDEL.value = NomCapitaine;
        });
    }

    function DelVan2 (SupVan, i, NumVan) { 
        SupVan.item(i).addEventListener('click', function() {

        event.stopPropagation();    //evite d'executer l'evenement lie au div et a l'ajout d'une personne

        var Date = SupVan[i].parentElement;
            Date = Date.parentElement;
            Date = Date.parentElement;
            Date = Date.previousElementSibling;
            Date = Date.previousElementSibling.innerHTML;
            console.log("la date est: ", Date);


        var NomCapitaine = SupVan[i].parentElement;
            //NomCapitaine = NomCapitaine.parentElement;
            NomCapitaine = NomCapitaine.previousElementSibling;
            NomCapitaine = NomCapitaine.previousElementSibling.textContent;
            console.log("le capitaine est: ", NomCapitaine);

        PafficheDateDEL.innerHTML = Date;

        divPagePrincipal.style.display = 'none';
        divFormulaireCacheDEL.style.display = 'flex';
        divFormulaireCacheDEL.style.flexDirection = 'column';
        divFormulaireCacheDEL.style.justifyContent = 'center';
        divFormulaireCacheDEL.style.alignItems = 'center';

        console.log("le van est: ", NumVan);

        dateVanDEL.value = Date;
        NumVanEnvoieVanDEL.value = NumVan;
        NomCapitaineDEL.value = NomCapitaine;
        });
    }
    
    
    
    /*////////////////////////////////////////////////////////////////////////////*/
    /*////////////////////////////// DRAG AND DROP////////////////////////////////*/
    /*////////////////////////////////////////////////////////////////////////////*/

    var DivAutoriseDrop1 = document.getElementsByClassName('VanBooke1');
    var DivAutoriseDropNone1 = document.getElementsByClassName('VanNone1');
    var DivAutoriseDropFull1 = document.getElementsByClassName('VanFull1');
    var DivAutoriseDrop2 = document.getElementsByClassName('VanBooke2');
    var DivAutoriseDropNone2 = document.getElementsByClassName('VanNone2');
    var DivAutoriseDropFull2 = document.getElementsByClassName('VanFull2');


    (function() {

        var dndHandler = {

            draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

            applyDragEvents: function(element) {

                console.log("l'element est: ", element);

                element.draggable = true;

                var dndHandler = this; // Cette variable est nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

                element.addEventListener('dragstart', function(e) {
                    dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                    e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
                    console.log("element sauvegarde: ", dndHandler.draggedElement);
                });
            },

            applyDropEvents: function(dropper, ClassVan) {

                dropper.addEventListener('dragover', function(e) {
                    e.preventDefault(); // On autorise le drop d'éléments
                    console.log("je retire l'interdiction de poser sur", e.target);
                });
                
               
                var dndHandler = this; // Cette variable est nécessaire pour que l'événement « drop » ci-dessous accède facilement au namespace « dndHandler »

                dropper.addEventListener('drop', function(e) {

                    var target = e.target,
                        draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                        clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément
                        
                        console.log("le clone est: ", clonedElement);

                    while (target.className.indexOf(ClassVan) == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                        target = target.parentNode;
                    }

                    //target.className = 'dropper'; // Application du style par défaut

                    clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                    dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()

                   

                    /////////////////////// Recup des ClassName ////////////////////////////
       

                    // Nom de classe d'origine - On utilise pour cela un formulaire bidon que j'ai place dans l'element deplace pour recuperer la valeur de la classe d'origine
                    var ClassOrigine = draggedElement.getElementsByClassName("FormVariables");
                        ClassOrigine = ClassOrigine[0].firstElementChild;
                        ClassOrigine = ClassOrigine.firstElementChild;
                        ClassOrigine = ClassOrigine.value;
                    console.log("classe Origine:", ClassOrigine);

                    //console.log("classe Origine:", ClassOrigine);

                    // Pour la classe de destination on peut utiliser l'objet qui a ete depose au nouvel endroit
                    var ClassDestination = clonedElement.parentElement;
                    ClassDestination = ClassDestination.className;
                    console.log("classe Destination:", ClassDestination);




                    ///////////////////// recup des dates ///////////////////////
                    
                    var TestPlacementAncienElement = draggedElement.parentElement;
                        TestPlacementAncienElement = TestPlacementAncienElement.previousElementSibling;
                        console.log(TestPlacementAncienElement.className);


                    if (TestPlacementAncienElement.className == "Date"){
                        var DateAncienne = draggedElement.parentElement;
                        DateAncienne = DateAncienne.previousElementSibling.innerText;
                        console.log("la date ancienne est: ", DateAncienne);
                        console.log("class: ", clonedElement.className);
                    }
                    else {
                            //console.log("je rentre ds la boucle");
                            var DateAncienne = draggedElement.parentElement;
                                DateAncienne = DateAncienne.previousElementSibling;
                                DateAncienne = DateAncienne.previousElementSibling.innerText;
                            console.log("la date ancienne est: ", DateAncienne);
                            console.log("class: ", clonedElement.className);
                        }



                    draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine


                    /*RECUP DE LA DATE: Je fais un test pour connaitre la classe du premier sibling du parent de l'objet pour savoir si c'est DATE
                    Si ce n'est pas le cas ca veut dire que je suis sur Van2 et qu'il faut reculer d'un sibling de plus pour avoir la date
                    */
                    var TestPlacement = clonedElement.parentElement;
                        TestPlacement = TestPlacement.previousElementSibling;
                        console.log(TestPlacement.className);


                    if (TestPlacement.className == "Date"){
                        var Date = clonedElement.parentElement;
                        Date = Date.previousElementSibling.innerText;
                        console.log("la date est: ", Date);
                        console.log("class: ", clonedElement.className);
                    }
                    else {
                            //console.log("je rentre ds la boucle");
                            var Date = clonedElement.parentElement;
                                Date = Date.previousElementSibling;
                                Date = Date.previousElementSibling.innerText;
                            console.log("la date est: ", Date);
                            console.log("class: ", clonedElement.className);
                        }


                    ///////// Recup du nom DU capitains que l'on bouge //////////

                    var ChaineCapitainesBouge = clonedElement.firstElementChild;
                      //  ChaineCapitainesBouge = ChaineCapitainesBouge.firstElementChild;
                        ChaineCapitainesBouge = ChaineCapitainesBouge.innerText;

                    /* Autre methode pour avoir la variable du nom du capitaine
                    var ChaineCapitainesBouge;
                        ChaineCapitainesBouge = CapitaineBouge.innerText;
                        ChaineCapitainesBouge.toString();
                        */


                    console.log("capitaine bouge:", ChaineCapitainesBouge);



                    /*//////////////// Recuperation de la liste DES capitaines/////////////////*/

                    var ChaineCapitaines;
                    var NomsCapitainesAenvoyer = clonedElement.parentElement;

                    /*Je recupere le contenu texte de tout ce qu'il y a dans mon DIV qui contient mes capitaines.
                    Je me retrouve avec une chaine de caractere pourrie qu'il faut mettre en forme.
                    */
                    ChaineCapitaines = NomsCapitainesAenvoyer.innerText;

                    //On vire les retourts a la ligne que je remplace par des ; pour marquer la separation entre les capitaines
                    ChaineCapitaines = ChaineCapitaines.replace(/(\r\n|\n|\r)/gm,";");
                    //On vire les espaces trop longs
                    ChaineCapitaines = ChaineCapitaines.replace(/\s+/g," ");
                    //On fout tout ca dans un tableau qui va contenir quelques entrees vides " "
                    TableauxCapitaines = ChaineCapitaines.split(';');
                    //On vire ces entrees vides du tableau
                    for (var k = 0; k < TableauxCapitaines.length; k++) {

                        if (TableauxCapitaines[k] === " "){
                            TableauxCapitaines.splice(k, 1);
                        }
                    }




                    divPagePrincipal.style.display = 'none';

                    //var xhrEcriture = new getXMLHttpRequest();
                    var xhrEcriture = new XMLHttpRequest();


                    var LaDate = encodeURIComponent(Date);
                    var LaDateAncienne = encodeURIComponent(DateAncienne);
                    //var LesCapitaines = encodeURIComponent(TableauxCapitaines);


                    xhrEcriture.open("GET", "MAJcapitaines.php?Date=" + LaDate + "&DateAncienne=" + LaDateAncienne + "&CapitaineBouge=" + ChaineCapitainesBouge + "&ClassOrigine=" + ClassOrigine + "&ClassDestination=" + ClassDestination);
                    //Cette ligne permet d'empecher l'utilisation du cache du navigateur pour la requete xhr - Sans ca j'ai un bug qui m'empeche de deplacer des capitaines sur les cases ou il a ete recement positionne
                    xhrEcriture.setRequestHeader("Cache-Control","no-cache");
                    xhrEcriture.send(null);   //envoi des données vers le fichier MAJcapitaines.php



                    xhrEcriture.addEventListener('readystatechange', function() {
                        if (xhrEcriture.readyState === XMLHttpRequest.DONE) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale


                                 //alert(e.target.responseText);
                                var response = JSON.parse(xhrEcriture.responseText);             //je récupere mes echo du fichier LectureComPHP et la fonction JSON.parse soccupe de tout foutre en ordre dans un objet

                                console.log("La classe origine est", response.ClasseOrig);
                                console.log("La classe destination est", response.ClasseDest);

                                console.log("Le capitaine est", response.Capitaine);

                                console.log("nb entrees Tab Ancien Capitaines", response.CountArrayRequeteAncienCapitaines);
                                console.log("nb entrees Tab Ancien Bricolage", response.CountArrayRequeteAncienBricolage);
                                console.log("nb entrees Tab Nouveau Capitaines", response.CountArrayRequeteNouveauCapitaines);
                                console.log("nb entrees Tab Nouveau Bricolage", response.CountArrayRequeteNouveauBricolage);

                                console.log("test bricolage:", response.TestBricolage);
                                console.log("Nb Cap a bouger:", response.NbCapAbouger);

                                console.log("Donnees a afficher", response.ArrayInsertionNouveauCapitaines);

                                 //alert(response.date);

                            divPagePrincipal.style.display = 'block';
                            location.assign(location.href);

                        }
                    });

                });  
            }
        };
        
/*
        var elements = document.querySelectorAll('.draggable'),
            elementsLen = elements.length;
 */           

    if(AdminConnecte != null){

        var DivDeplace = document.getElementsByClassName('divContenantCapitainesEtIconeSuppression');
       
        // Application des paramètres nécessaires aux éléments déplaçables
        for (var i = 0; i < DivDeplace.length; i++) {
            dndHandler.applyDragEvents(DivDeplace[i]); 
        }


        // Application des événements nécessaires aux zones de drop
        for (var i = 0; i < DivAutoriseDrop1.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDrop1[i], 'VanBooke1'); 
        }
        for (var i = 0; i < DivAutoriseDropNone1.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDropNone1[i], 'VanNone1'); 
        }
        for (var i = 0; i < DivAutoriseDropFull1.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDropFull1[i], 'VanFull1'); 
        }
        for (var i = 0; i < DivAutoriseDrop2.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDrop2[i], 'VanBooke2'); 
        }
        for (var i = 0; i < DivAutoriseDropNone2.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDropNone2[i], 'VanNone2'); 
        }
        for (var i = 0; i < DivAutoriseDropFull2.length; i++) {
            dndHandler.applyDropEvents(DivAutoriseDropFull2[i], 'VanFull2'); 
        }
        
    }
        

    })();
    
}


////////////////////////////////////////////////////////////////////////////////
/////////////////// Gestion des evenements pour TACTILE ////////////////////////
////////////////////////////////////////////////////////////////////////////////


if (isDesign("tablet") || isDesign("mobile") || isDesign("touch")){
    
    /*////////////////////////////////////////////////////////////////////////////*/
    /*///////////////////// SUPPRESSION CAPITAINES  //////////////////////////////*/
    /*////////////////////////////////////////////////////////////////////////////*/

    var SupVan1 = document.getElementsByClassName('imageDe11');
    var SupVan2 = document.getElementsByClassName('imageDel2');
    var divFormulaireCacheDEL = document.getElementById('divFormulaireCacheDEL');
    var PafficheDateDEL = document.getElementById('AfficheDateDEL');

    var NumVanEnvoieVanDEL = document.getElementById('inputEnvoieVanDEL');
    var dateVanDEL = document.getElementById('dateVanDEL');
    var NomCapitaineDEL = document.getElementById('NomCapitaineDEL');

    function DelVan1 (SupVan, i, NumVan) { 
        SupVan.item(i).addEventListener('touchstart', function(event) {

            event.stopPropagation();    //evite d'executer l'evenement lie au div et a l'ajout d'une personne

            var Date = SupVan[i].parentElement;
                Date = Date.parentElement;
                Date = Date.parentElement;
                Date = Date.previousElementSibling.innerHTML;
                console.log("la date est: ", Date);


            var NomCapitaine = SupVan[i].parentElement;
                //NomCapitaine = NomCapitaine.parentElement;
                NomCapitaine = NomCapitaine.previousElementSibling;
                NomCapitaine = NomCapitaine.previousElementSibling.textContent;
                console.log("le capitaine est: ", NomCapitaine);


            PafficheDateDEL.innerHTML = Date;

            divPagePrincipal.style.display = 'none';
            divFormulaireCacheDEL.style.display = 'flex';
            divFormulaireCacheDEL.style.flexDirection = 'column';
            divFormulaireCacheDEL.style.justifyContent = 'center';
            divFormulaireCacheDEL.style.alignItems = 'center';

            dateVanDEL.value = Date;
            console.log("le van est: ", NumVan);

            NumVanEnvoieVanDEL.value = NumVan;
            NomCapitaineDEL.value = NomCapitaine;
        });
    }

    function DelVan2 (SupVan, i, NumVan) { 
        SupVan.item(i).addEventListener('touchstart', function() {

        event.stopPropagation();    //evite d'executer l'evenement lie au div et a l'ajout d'une personne

        var Date = SupVan[i].parentElement;
            Date = Date.parentElement;
            Date = Date.parentElement;
            Date = Date.previousElementSibling;
            Date = Date.previousElementSibling.innerHTML;
            console.log("la date est: ", Date);


        var NomCapitaine = SupVan[i].parentElement;
            //NomCapitaine = NomCapitaine.parentElement;
            NomCapitaine = NomCapitaine.previousElementSibling;
            NomCapitaine = NomCapitaine.previousElementSibling.textContent;
            console.log("le capitaine est: ", NomCapitaine);

        PafficheDateDEL.innerHTML = Date;

        divPagePrincipal.style.display = 'none';
        divFormulaireCacheDEL.style.display = 'flex';
        divFormulaireCacheDEL.style.flexDirection = 'column';
        divFormulaireCacheDEL.style.justifyContent = 'center';
        divFormulaireCacheDEL.style.alignItems = 'center';

        console.log("le van est: ", NumVan);

        dateVanDEL.value = Date;
        NumVanEnvoieVanDEL.value = NumVan;
        NomCapitaineDEL.value = NomCapitaine;
        });
    }
    
    
    
/*////////////////////////////////////////////////////////////////////////////*/
/*////////////////////////////// DRAG AND DROP////////////////////////////////*/
/*////////////////////////////////////////////////////////////////////////////*/

var DivAutoriseDrop1 = document.getElementsByClassName('VanBooke1');
var DivAutoriseDropNone1 = document.getElementsByClassName('VanNone1');
var DivAutoriseDropFull1 = document.getElementsByClassName('VanFull1');
var DivAutoriseDrop2 = document.getElementsByClassName('VanBooke2');
var DivAutoriseDropNone2 = document.getElementsByClassName('VanNone2');
var DivAutoriseDropFull2 = document.getElementsByClassName('VanFull2');



(function() {
    
    function _(id) {
        return document.getElementById(id);
    }
    var dndHandler = {

        draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

        applyDragEvents: function(element) {

            console.log("l'element est: ", element);

            element.draggable = true;

            var dndHandler = this; // Cette variable est nécessaire pour que l'événement « dragstart » ci-dessous accède facilement au namespace « dndHandler »

        },

        applyDropEvents: function(MonElement) {
            
            var activeEvent = '';
            var originalX = '';
            var originalY = '';


            var PositionObjetX = '';

            // function handleTouchStart(e) {
            MonElement.addEventListener('touchstart', function(e) {
              //  _('app_status').innerHTML = "Touch start with element " + e
              //  .target
             //   .className;
                console.log("e.target est: ", e.target);
                dndHandler.draggedElement = e.target;
                dndHandler.DateAncienne = '';
                dndHandler.ClassOrigine = '';
                
                ////// Recup du CLASSNAME ORIGINE //////
                
                // Nom de classe d'origine - On utilise pour cela un formulaire bidon que j'ai place dans l'element deplace pour recuperer la valeur de la classe d'origine
                dndHandler.ClassOrigine = dndHandler.draggedElement.getElementsByClassName("FormVariables");
                dndHandler.ClassOrigine = dndHandler.ClassOrigine[0].firstElementChild;
                dndHandler.ClassOrigine = dndHandler.ClassOrigine.firstElementChild;
                dndHandler.ClassOrigine = dndHandler.ClassOrigine.value;
                console.log("classe ORIGINE:", dndHandler.ClassOrigine);
                
                ////////////////////////////////////////////
                
                ////// Recup DATE ORIGINE //////
                
                var TestPlacementAncienElement = dndHandler.draggedElement.parentElement;
                    TestPlacementAncienElement = TestPlacementAncienElement.previousElementSibling;
                    console.log(TestPlacementAncienElement.className);

                //On teste voir si on est cote Van1 ou Van2. Selon l'un ou l'autre l'arbre des elements HTML est legerement different pour recuperer l'info
                if (TestPlacementAncienElement.className == "Date"){
                    dndHandler.DateAncienne = dndHandler.draggedElement.parentElement;
                    dndHandler.DateAncienne = dndHandler.DateAncienne.previousElementSibling.innerText;
                    console.log("la date ANCIENNE est: ", dndHandler.DateAncienne);
                }
                else {
                        //console.log("je rentre ds la boucle");
                        dndHandler.DateAncienne = dndHandler.draggedElement.parentElement;
                            dndHandler.DateAncienne = dndHandler.DateAncienne.previousElementSibling;
                            dndHandler.DateAncienne = dndHandler.DateAncienne.previousElementSibling.innerText;
                        console.log("la date ANCIENNE2 est: ", dndHandler.DateAncienne);
                    }
               
                //////////////////////////////////////////////
                

                console.log("dndHandler.draggedElement est: ", dndHandler.draggedElement);

                originalX = (e.target.offsetLeft - 10) + "px";
                originalY = (e.target.offsetTop - 10) + "px";
                activeEvent = 'start';
            }, false);
            /////////////////

            //function handleTouchMove(e) {
            MonElement.addEventListener('touchmove', function(e) {
                
                event.preventDefault();
                
                
                
              //  console.log("l'element bouge est: ", e.target);
                var touchLocation = e.targetTouches[0];
                var pageX = (touchLocation.pageX - 50) + "px";
                var pageY = (touchLocation.pageY - 50) + "px";
                //_('app_status').innerHTML = "Touch x " + pageX + " Touch y " + pageY;
                e.target.style.position = "absolute";
                e.target.style.left = pageX;
                e.target.style.top = pageY;
             //   console.log("coordenonnes x: ", e.target.left);
              //  console.log("coordonnees y: ", e.target.top);
                activeEvent = 'move';
            }, false);
            ///////////////

            //function handleTouchEnd(e) {
            MonElement.addEventListener('touchend', function(e) {
            e.preventDefault();
                if (activeEvent === 'move') {

                    var Testdropzone = 0;
                    var compte = 0;
                    
                    console.log("je suis hors boucle FOR");
                    for(k=0 ; k<DivAutoriseDrop1.length ; k++)
                    {
                        dropZone = DivAutoriseDrop1[k];

                        //console.log("compte drop zone: ", DivAutoriseDrop1.length);

                        console.log("compte dans la boucle: ", compte);
                        console.log("e.target.style.left: ", e.target.style.left);
                        console.log("e.target.style.top: ", e.target.style.top);

                        var pageX = (parseInt(e.target.style.left));
                        var pageY = (parseInt(e.target.style.top));

                        var offsetDiv2Width = e.target.offsetWidth / 2;
                        var offsetDiv2Height = e.target.offsetHeight / 2;

                        var CentreX = pageX + offsetDiv2Width;
                        var CentreY = pageY + offsetDiv2Height;

                        var DropXcourt = dropZone.offsetLeft;
                        var DropXlong = DropXcourt + dropZone.offsetWidth;

                        var DropYcourt = dropZone.offsetTop;
                        var DropYlong = DropYcourt + dropZone.offsetHeight;

                        if (detectTouchEnd(CentreX, CentreY, DropXcourt, DropXlong, DropYcourt, DropYlong)) {
                            dropZoneMATCH = DivAutoriseDrop1[k];
                            console.log("ON A UN MATCH");
                            Testdropzone = 1;
                        }
                    }
                    for(k=0 ; k<DivAutoriseDropNone1.length ; k++)
                    {
                        dropZone = DivAutoriseDropNone1[k];

                        //console.log("compte drop zone: ", DivAutoriseDropNone1.length);

                        console.log("compte dans la boucle: ", compte);
                        console.log("e.target.style.left: ", e.target.style.left);
                        console.log("e.target.style.top: ", e.target.style.top);

                        var pageX = (parseInt(e.target.style.left));
                        var pageY = (parseInt(e.target.style.top));

                        var offsetDiv2Width = e.target.offsetWidth / 2;
                        var offsetDiv2Height = e.target.offsetHeight / 2;

                        var CentreX = pageX + offsetDiv2Width;
                        var CentreY = pageY + offsetDiv2Height;

                        var DropXcourt = dropZone.offsetLeft;
                        var DropXlong = DropXcourt + dropZone.offsetWidth;

                        var DropYcourt = dropZone.offsetTop;
                        var DropYlong = DropYcourt + dropZone.offsetHeight;

                        if (detectTouchEnd(CentreX, CentreY, DropXcourt, DropXlong, DropYcourt, DropYlong)) {
                            dropZoneMATCH = DivAutoriseDropNone1[k];
                            console.log("ON A UN MATCH");
                            Testdropzone = 1;
                        }
                    }
                    for(k=0 ; k<DivAutoriseDrop2.length ; k++)
                    {
                        dropZone = DivAutoriseDrop2[k];

                        //console.log("compte drop zone: ", DivAutoriseDrop2.length);

                        console.log("compte dans la boucle: ", compte);
                        console.log("e.target.style.left: ", e.target.style.left);
                        console.log("e.target.style.top: ", e.target.style.top);

                        var pageX = (parseInt(e.target.style.left));
                        var pageY = (parseInt(e.target.style.top));

                        var offsetDiv2Width = e.target.offsetWidth / 2;
                        var offsetDiv2Height = e.target.offsetHeight / 2;

                        var CentreX = pageX + offsetDiv2Width;
                        var CentreY = pageY + offsetDiv2Height;

                        var DropXcourt = dropZone.offsetLeft;
                        var DropXlong = DropXcourt + dropZone.offsetWidth;

                        var DropYcourt = dropZone.offsetTop;
                        var DropYlong = DropYcourt + dropZone.offsetHeight;

                        if (detectTouchEnd(CentreX, CentreY, DropXcourt, DropXlong, DropYcourt, DropYlong)) {
                            dropZoneMATCH = DivAutoriseDrop2[k];
                            console.log("ON A UN MATCH");
                            Testdropzone = 1;
                        }
                    }
                    for(k=0 ; k<DivAutoriseDropNone2.length ; k++)
                    {
                        dropZone = DivAutoriseDropNone2[k];

                        //console.log("compte drop zone: ", DivAutoriseDropNone2.length);

                        console.log("compte dans la boucle: ", compte);
                        console.log("e.target.style.left: ", e.target.style.left);
                        console.log("e.target.style.top: ", e.target.style.top);

                        var pageX = (parseInt(e.target.style.left));
                        var pageY = (parseInt(e.target.style.top));

                        var offsetDiv2Width = e.target.offsetWidth / 2;
                        var offsetDiv2Height = e.target.offsetHeight / 2;

                        var CentreX = pageX + offsetDiv2Width;
                        var CentreY = pageY + offsetDiv2Height;

                        var DropXcourt = dropZone.offsetLeft;
                        var DropXlong = DropXcourt + dropZone.offsetWidth;

                        var DropYcourt = dropZone.offsetTop;
                        var DropYlong = DropYcourt + dropZone.offsetHeight;

                        if (detectTouchEnd(CentreX, CentreY, DropXcourt, DropXlong, DropYcourt, DropYlong)) {
                            dropZoneMATCH = DivAutoriseDropNone2[k];
                            console.log("ON A UN MATCH");
                            Testdropzone = 1;
                        }
                    }
                    
                    
                    if (Testdropzone == 1)
                    {
                        console.log("compte: ", compte)
                          //  console.log("Element position depuis la gauche: ", pageX);
                         //   console.log("Element position depuis le haut: ", pageY);


                            console.log("DropZone position depuis la gauche: ", dropZoneMATCH.offsetLeft);
                            console.log("DropZone position depuis le haut: ", dropZoneMATCH.offsetTop);
                            console.log("DropZone largeur: ", dropZoneMATCH.offsetWidth);
                            console.log("DropZone hauteur: ", dropZoneMATCH.offsetHeight);

                            var clonedElement = dropZoneMATCH.appendChild(e.target);
                            e.target.style.position = "initial";
                           
                           
                           
           

                            /////////////////////// Recup des ClassName DESTINATION ////////////////////////////

                            
                            // Pour la classe de destination on peut utiliser l'objet qui a ete depose au nouvel endroit
                            var ClassDestination = clonedElement.parentElement;
                            ClassDestination = ClassDestination.className;
                            console.log("classe Destination:", ClassDestination);
                            
                            ////////////////////////////////////////////////////////////////////////////////////
                            
                            /////////////////////// Recup date DESTINATION ////////////////////////////
                            

                            /*RECUP DE LA DATE: Je fais un test pour connaitre la classe du premier sibling du parent de l'objet pour savoir si c'est DATE
                            Si ce n'est pas le cas ca veut dire que je suis sur Van2 et qu'il faut reculer d'un sibling de plus pour avoir la date
                            */
                            var TestPlacement = clonedElement.parentElement;
                                TestPlacement = TestPlacement.previousElementSibling;
                                console.log(TestPlacement.className);


                            if (TestPlacement.className == "Date"){
                                var Date = clonedElement.parentElement;
                                Date = Date.previousElementSibling.innerText;
                                console.log("la date est: ", Date);
                                console.log("class: ", dropZoneMATCH.className);
                            }
                            else {
                                    //console.log("je rentre ds la boucle");
                                    var Date = clonedElement.parentElement;
                                        Date = Date.previousElementSibling;
                                        Date = Date.previousElementSibling.innerText;
                                    console.log("la date est: ", Date);
                                    console.log("class: ", dropZoneMATCH.className);
                                }
                                
                            ////////////////////////////////////////////////////////////////////////////////////
                                
                                
                            ///////////////////// Recup du nom DU capitains que l'on bouge ////////////////////////////
                            
                            var ChaineCapitainesBouge = clonedElement.firstElementChild;
                              //  ChaineCapitainesBouge = ChaineCapitainesBouge.firstElementChild;
                                ChaineCapitainesBouge = ChaineCapitainesBouge.innerText;

                            /* Autre methode pour avoir la variable du nom du capitaine
                            var ChaineCapitainesBouge;
                                ChaineCapitainesBouge = CapitaineBouge.innerText;
                                ChaineCapitainesBouge.toString();
                                */


                            console.log("capitaine bouge:", ChaineCapitainesBouge);



                            /*//////////////// Recuperation de la liste DES capitaines/////////////////*/

                            var ChaineCapitaines;
                            var NomsCapitainesAenvoyer = clonedElement.parentElement;

                            /*Je recupere le contenu texte de tout ce qu'il y a dans mon DIV qui contient mes capitaines.
                            Je me retrouve avec une chaine de caractere pourrie qu'il faut mettre en forme.
                            */
                            ChaineCapitaines = NomsCapitainesAenvoyer.innerText;

                            //On vire les retourts a la ligne que je remplace par des ; pour marquer la separation entre les capitaines
                            ChaineCapitaines = ChaineCapitaines.replace(/(\r\n|\n|\r)/gm,";");
                            //On vire les espaces trop longs
                            ChaineCapitaines = ChaineCapitaines.replace(/\s+/g," ");
                            //On fout tout ca dans un tableau qui va contenir quelques entrees vides " "
                            TableauxCapitaines = ChaineCapitaines.split(';');
                            //On vire ces entrees vides du tableau
                            for (var k = 0; k < TableauxCapitaines.length; k++) {

                                if (TableauxCapitaines[k] === " "){
                                    TableauxCapitaines.splice(k, 1);
                                }
                            }


                            

                            divPagePrincipal.style.display = 'none';

                            //var xhrEcriture = new getXMLHttpRequest();
                            var xhrEcriture = new XMLHttpRequest();


                            var LaDate = encodeURIComponent(Date);
                            var LaDateAncienne = encodeURIComponent(dndHandler.DateAncienne);
                            //var LesCapitaines = encodeURIComponent(TableauxCapitaines);


                            xhrEcriture.open("GET", "MAJcapitaines.php?Date=" + LaDate + "&DateAncienne=" + LaDateAncienne + "&CapitaineBouge=" + ChaineCapitainesBouge + "&ClassOrigine=" + dndHandler.ClassOrigine + "&ClassDestination=" + ClassDestination);
                            //Cette ligne permet d'empecher l'utilisation du cache du navigateur pour la requete xhr - Sans ca j'ai un bug qui m'empeche de deplacer des capitaines sur les cases ou il a ete recement positionne
                            xhrEcriture.setRequestHeader("Cache-Control","no-cache");
                            xhrEcriture.send(null);   //envoi des données vers le fichier MAJcapitaines.php



                            xhrEcriture.addEventListener('readystatechange', function(e) {
                            if (xhrEcriture.readyState === XMLHttpRequest.DONE) { // La constante DONE appartient à l'objet XMLHttpRequest, elle n'est pas globale


                                     //alert(e.target.responseText);
                                    var response = JSON.parse(xhrEcriture.responseText);             //je récupere mes echo du fichier LectureComPHP et la fonction JSON.parse soccupe de tout foutre en ordre dans un objet

                                    console.log("La classe origine est", response.ClasseOrig);
                                    console.log("La classe destination est", response.ClasseDest);

                                    console.log("Le capitaine est", response.Capitaine);

                                    console.log("nb entrees Tab Ancien Capitaines", response.CountArrayRequeteAncienCapitaines);
                                    console.log("nb entrees Tab Ancien Bricolage", response.CountArrayRequeteAncienBricolage);
                                    console.log("nb entrees Tab Nouveau Capitaines", response.CountArrayRequeteNouveauCapitaines);
                                    console.log("nb entrees Tab Nouveau Bricolage", response.CountArrayRequeteNouveauBricolage);

                                    console.log("test bricolage:", response.TestBricolage);
                                    console.log("Nb Cap a bouger:", response.NbCapAbouger);

                                    console.log("Donnees a afficher", response.ArrayInsertionNouveauCapitaines);

                                     //alert(response.date);

                                divPagePrincipal.style.display = 'block';
                                location.assign(location.href);

                            }
                            });





                        
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                    // Si l'element dragge n'a pas ete place sur une zone de DROP, on le re-integre la ou il se trouvait
                    } else {
                        e.target.style.left = originalX;
                        e.target.style.top = originalY;
                      //  _('app_status').innerHTML = "You let the " + e
                       //     .target
                        //    .className + " go.";
                    
                           // var cible = e.target;
                    
                        console.log("element parent: ", dndHandler.draggedElement.parentNode);
                        var Parent = dndHandler.draggedElement.parentNode;
                    
                        console.log("e.target est: ", e.target);
                        e.target.style.position = "initial";
                        
                        //draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                        //clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément
                        
                        Parent.appendChild(e.target);
                        //Parent.innerHTML = 'toto';
                        //Parent.appendChild(dndHandler.draggedElement);
                    }
                }
                
            }, false);

            function detectTouchEnd(CentreX, CentreY, DropXcourt, DropXlong, DropYcourt, DropYlong) {
                //Very simple detection here
                if ((CentreX > DropXcourt) && (CentreX < DropXlong) && (CentreY > DropYcourt) && (CentreY < DropYlong)){
                    return true;
                }
            }
        },
    };
    
    if(AdminConnecte != null){
        
    
        var DivDeplace = document.getElementsByClassName('divContenantCapitainesEtIconeSuppression');

        for(k=0 ; k<DivDeplace.length ; k++)
        { 
            dndHandler.applyDropEvents(DivDeplace[k]);
        }
            
    }
    
    })(); 
    
    
}









 


function CreaEventVan1 (VanBooke, i, NumVan) {    
    
    
        var Date = VanBooke[i].previousElementSibling.innerHTML;
        //console.log("la date est: ", Date);

        //console("Est ecrit:", VanBooke.item(i));

    VanBooke.item(i).addEventListener('click', function() {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';

        divPagePrincipal.style.display = 'none';

        divFormulaireCache.style.display = 'flex';
        divFormulaireCache.style.flexDirection = 'column';
        divFormulaireCache.style.justifyContent = 'center';
        divFormulaireCache.style.alignItems = 'center';

        dateVan.value = Date;
        inputEnvoieVan.value = NumVan;
    
    })
}

function CreaEventVan1Gris (VanBooke, i, NumVan) {    
    
        var Date = VanBooke[i].previousElementSibling.innerHTML;
        //console.log("la date est: ", Date);

        //console("Est ecrit:", VanBooke.item(i));

    VanBooke.item(i).addEventListener('click', function() {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';

        divPagePrincipal.style.display = 'none';

        divFormulaireCache.style.display = 'flex';
        divFormulaireCache.style.flexDirection = 'column';
        divFormulaireCache.style.justifyContent = 'center';
        divFormulaireCache.style.alignItems = 'center';

        dateVan.value = Date;
        inputEnvoieVan.value = NumVan;
        
    })
    
    ////// VAN GRIS
}


function CreaEventVan2 (VanBooke, i, NumVan) {    
    
        var Date = VanBooke[i].previousElementSibling;
        Date = Date.previousElementSibling.innerHTML;
        //console.log("la date est: ", Date);

        //console("Est ecrit:", VanBooke.item(i));

    VanBooke.item(i).addEventListener('click', function(event) {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';

        divPagePrincipal.style.display = 'none';

        divFormulaireCache.style.display = 'flex';
        divFormulaireCache.style.flexDirection = 'column';
        divFormulaireCache.style.justifyContent = 'center';
        divFormulaireCache.style.alignItems = 'center';

        dateVan.value = Date;
        inputEnvoieVan.value = NumVan;
        
    })
}



function CreaEventVan2Gris (VanBooke, i, NumVan) {    
    
        var Date = VanBooke[i].previousElementSibling;
        Date = Date.previousElementSibling.innerHTML;
        //console.log("la date est: ", Date);

        //console("Est ecrit:", VanBooke.item(i));

    VanBooke.item(i).addEventListener('click', function(event) {

        //var test =VanBooke.item(i).getElementsByTagName("P")[0].className;
        //console.log("la date est: ", IdDate.item(i).innerHTML);

        //DivBaniere.style.backgroundColor = 'rgba(255,101,80,0.48)';

        divPagePrincipal.style.display = 'none';

        divFormulaireCache.style.display = 'flex';
        divFormulaireCache.style.flexDirection = 'column';
        divFormulaireCache.style.justifyContent = 'center';
        divFormulaireCache.style.alignItems = 'center';

        dateVan.value = Date;
        inputEnvoieVan.value = NumVan;
        
    })
}

//Creation des evenements OnClick pour booker une place sur un van

for(j=0 ; j<VanBooke1.length ; j++)
{
        CreaEventVan1 (VanBooke1, j, NumVan="VanBooke1");
}
for(j=0 ; j<Gris1.length ; j++)
{
        CreaEventVan1Gris (Gris1, j, NumVanGris="VanNone1");
}
    
for(i=0 ; i<VanBooke2.length ; i++)
{
        CreaEventVan2 (VanBooke2, i, NumVan="VanBooke2")
}

for(i=0 ; i<Gris2.length ; i++)
{
        CreaEventVan2Gris (Gris2, i, NumVan="VanNone2")
}



////////////////////////////////////////////////////////////////////////////////
///////////////////// Suppression des capitaines ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

for(j=0 ; j<SupVan1.length ; j++)
{
    DelVan1(SupVan1, j, NumVan="VanBooke1");
}

   
for(j=0 ; j<SupVan2.length ; j++)
{
    DelVan2(SupVan2, j, NumVan="VanBooke2");
}

/////////////////////////// FIN SUPPRESSION ////////////////////////////////////

