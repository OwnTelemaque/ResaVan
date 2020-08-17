<?php 
session_start();

include "baniere.php";
include "connexion.php";

// Variables Ajout capitaine
$ArrayRequeteNouveauCapitaines = array();
$ArrayRequeteNouveauBricolage = array();
$ArrayInsertionNouveauCapitaines = array();
$ArrayInsertionNouveauBricolage = array();

// Variables Suppression capitaine
$ArrayRequeteAncienCapitaines = array();
$ArrayRequeteAncienBricolage = array();
$ArrayInsertionAncienCapitaines = array();
$ArrayInsertionAncienBricolage = array();


$NbCapitainesMax = 5;
$TableauInsertionCapitaines = array();
$TableauSuppressionCapitaine = array();
$TableauSuppressionBricolage = array();
$TableauListeDatesCrees = array();
$TableauListeDates14jours = array();
$arrayBricolage = array();
$testEntreeExisteBDD = 0;
$testAuthorisationAjoutCapitaines = 1;
$TableauNomsCapitainesVan1 = "";
$TableauNomsCapitainesVan2 = "";
$dateVan = "";
$van1 = "VanNone1";
$van2 = "VanNone2";
$dateVan = "";
$dateTest1 = 0;
$dateTest2 = 0;

$NbJoursAafficher = 14;
$Tomorrow = time() - 28800;    //initialisation d'une variable pour permettre d'afficher les jours de la semaine sur 2 semaines (28800 serveur fr avec 8h de plus)
$TomorrowDEL = time() - 28800;



if (isset($_POST['SessionBateau']))
{
    $_SESSION['SessionBateau']=$_POST['SessionBateau'];                                 //je crée ma variable de session pour pouvoir resté connecté tant que je ne clique pas sur déconnecter
}

if(!isset($_SESSION['SessionBateau'])) {
    ?>
    <meta http-equiv="refresh" content="0; url=http://travelwithnico.com/sousdomaines/RoatanLockdown/index.php" />
    <?php
    exit(); //empeche de charger le reste de la page
}

$prenoms = array ('Thera', 'Lagniappe', 'moody');


//echo $dateJourSemaine = date("l");
//echo $dateJourNumerique = date("d/m/Y");
//date de demain:
//echo $dateFullDemain = date("l d/m/Y", strtotime('+1 day'));

try
{
        $bdd = new PDO("mysql:host=$hote;dbname=$nomBase;charset=utf8", $user, $passe);
//	#$bdd = new PDO('mysql:host=clm02.evxonline.net;dbname=traveldivebase;charset=utf8', 'traveldive', 'F@nette05');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

/*
$serialize = serialize($prenoms);

$req = $bdd->prepare('UPDATE resavan SET capitainesVan1 = :capitainesVan1 WHERE date = :date');
$req->execute(array(
    'capitainesVan1' => $serialize,
    'date' => "20/04/2020"
    ));
*/


/*//////////////////////////////////////////////////////////////////////////////
/////////////////////////// Creation bdd manquant///////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/

//A l'ouverture de la page, si on voit dans la base de donnee que des jours de la semaine ne sont pas crees parmis les 14 prochains, on les cree.

$requeteCreaBDD = $bdd->query('SELECT * FROM resavan');

while ($donneesCreaBDD = $requeteCreaBDD->fetch())
{
    $TableauListeDatesCrees[] = $donneesCreaBDD['date'];
}

for ($i=0; $i<$NbJoursAafficher; $i++)
{
    $TableauListeDates14jours[] = date("d/m/Y", $TomorrowDEL);
    $TomorrowDEL = $TomorrowDEL + 86400;  // il y a 86400 sec dans 24h
}
//print_r($TableauListeDates14jours);
for ($i=0; $i<count($TableauListeDates14jours); $i++)
{
    if (!in_array($TableauListeDates14jours[$i], $TableauListeDatesCrees))
    {
        //echo ("il manque: "), $TableauListeDates14jours[$i];
        //echo "<br>";
        
        $req = $bdd->prepare('INSERT INTO resavan(date, van1, van2, capitainesVan1, capitainesVan2, bricolage) VALUES(:date, :van1, :van2, :capitaines1, :capitaines2, :bricolage)');
            $req->execute(array(
                'date' => $TableauListeDates14jours[$i],
                'van1' => 0,
                'van2' => 0,
                'capitaines1' => "",
                'capitaines2' => "",
                'bricolage' => ""
                ));
    }
}

/*//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Ajout Capitaine////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/


if (isset($_POST['TestEnvoiBooking']))
{
    //echo $_POST['NomCapitaine'];
    //echo "<br>";
    //echo $_POST['NbSeatBook'];
    //echo "<br>";
    //echo $_POST['inputEnvoieVan'];
    //echo "<br>";
    //echo $_POST['hardware'];
    //echo "<br>";

    $dateVan = substr($_POST['dateVan'], -15);
    $dateVan = substr($dateVan, 0, -5);
    //echo $dateVan;
    //echo "<br>";
    
    $NomClassOrigine = $_POST['inputEnvoieVan'];
    
    //Je prepare mes variables pour les requetes SQL
    if($NomClassOrigine == "VanBooke1" || $NomClassOrigine == "VanNone1"){
        $NomClassOrigine = "capitainesVan1";
    }
    elseif ($NomClassOrigine == "VanBooke2" || $NomClassOrigine == "VanNone2") {
        $NomClassOrigine = "capitainesVan2";
    }
    
    $requeteNouveauElement = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $dateVan . '\'');
    while ($DonneesRequeteNouveauElement = $requeteNouveauElement->fetch()){
        $ArrayRequeteNouveauCapitaines = unserialize($DonneesRequeteNouveauElement[$NomClassOrigine]);
        $ArrayRequeteNouveauBricolage = unserialize($DonneesRequeteNouveauElement['bricolage']);
    }
    
    //echo "Nb de capitainesss dans la liste:", count($ArrayRequeteNouveauCapitaines);
    //echo "<br>";
    
    $compteCapitaines = 0;
     //Test du nombre de capitaines deja enregistre en bdd (car meme sans entrees le compte deserialise vaut 1)
        if(isset($ArrayRequeteNouveauCapitaines[0]) == ""){
            $compteCapitaines = 0;
        }
        else{
            $compteCapitaines = count($ArrayRequeteNouveauCapitaines) + $_POST['NbSeatBook'];
        }
    //echo "Compte capitaines:", $compteCapitaines;
    //echo "<br>";
    
    //On verifie que l'on peut rajouter un nouveau capitaine
    if($compteCapitaines <= $NbCapitainesMax){
        
        //echo "Je vais rajouter en bdd";
        
        //On va travailler sur des noms de variables plus propres
        $ArrayInsertionNouveauCapitaines = $ArrayRequeteNouveauCapitaines;  //On utilise juste un nouveau tableau pour faire plus propre
        $ArrayInsertionNouveauBricolage = $ArrayRequeteNouveauBricolage;  //On utilise juste un nouveau tableau pour faire plus propre
        
        //On prepare notre nouveau tableau en rajoutant simplement nos nouvelles entrees a la suite en fonction du nombre de capitaines que l'on a demande d'ajouter
        for($i=0; $i < $_POST['NbSeatBook']; $i++){
            $ArrayInsertionNouveauCapitaines[] = $_POST['NomCapitaine'];
        }
        
        //Si le capitaine demande a faire parti du bricolage
        if($_POST['hardware'] == 1){
            //On prepare notre nouveau tableau en rajoutant simplement nos nouvelles entrees a la suite
            $ArrayInsertionNouveauBricolage[] = $_POST['NomCapitaine'];
        }
        
        //Preparation des variables avant injection dans la bdd
        $serializeCapitainesNouveau = serialize($ArrayInsertionNouveauCapitaines);
        $serializeBricolageNouveau = serialize($ArrayInsertionNouveauBricolage);
        
        //Petit traitement pour supprimer les entrees residuelles dans la base de donnes lorsqu'un tableau ne contient plus de donnees
        $TestUnserializeBricolageNouveau = unserialize($serializeBricolageNouveau);
        if(isset($TestUnserializeBricolageNouveau[0]) == ""){
            //On  met explicitement pas de valeur
            $serializeBricolageNouveau = "";
        }
        //fin traitement
        
        $req = $bdd->prepare('UPDATE resavan SET ' . $NomClassOrigine . ' = :capitainesVan, bricolage = :bricolage WHERE date =  \'' . $dateVan . '\'');
        $req->execute(array(
        'capitainesVan' => $serializeCapitainesNouveau,
        'bricolage' => $serializeBricolageNouveau
        ));
    }
    else{ 
        echo '<script type="text/javascript">alert("We can have only 5 people per van");</script>';
        //echo "We can have only 5 people per van";
    }
} 
/*//////////////////////////////// Fin resa Van///////////////////////////////*/


/*//////////////////////////////////////////////////////////////////////////////
//////////////////////////////// DEL Capitaine//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/
if (isset($_POST['TestEnvoiDel']))
{
    //echo "Le capitaine a sup est:" . $_POST['NomCapitaineDEL'];
    //echo "<br>";
    $dateVan = substr($_POST['dateVanDEL'], -15);
    $dateVan = substr($dateVan, 0, -5);
    //echo $dateVan;
    //echo "<br>";
    //echo $_POST['inputEnvoieVanDEL'];
    //echo "<br>";
    
    $CapitaineSuppression = $_POST['NomCapitaineDEL'];
    $NomClassOrigine = $_POST['inputEnvoieVanDEL'];
    
    //Je prepare mes variables pour les requetes SQL
    if($NomClassOrigine == "VanBooke1"){
        $NomClassOrigine = "capitainesVan1";
    }
    elseif ($NomClassOrigine == "VanBooke2") {
        $NomClassOrigine = "capitainesVan2";
    }
    
    $requeteNouveauElement = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $dateVan . '\'');
    while ($DonneesRequeteAncienElement = $requeteNouveauElement->fetch()){
        $ArrayRequeteAncienCapitaines = unserialize($DonneesRequeteAncienElement[$NomClassOrigine]);
        $ArrayRequeteAncienBricolage = unserialize($DonneesRequeteAncienElement['bricolage']);
    }
    
    //var_dump($ArrayRequeteAncienBricolage);
    
    //echo "Nb de capitaines dans la liste:", count($ArrayRequeteAncienCapitaines);
    //echo "<br>";
    
    //On recree dans un premier temps le nouveau tableau qui sera injecte en bdd
    foreach ($ArrayRequeteAncienCapitaines as $element){
        if($element != $CapitaineSuppression){
            $ArrayInsertionAncienCapitaines[] = $element;
        }
    }
    
    //Maintenant si on a plusieur capitaines du meme nom a supprimer, on va faire en sorte de n'en virer qu'un
    
    //Je mets dans ce tableau le compte de chaque valeurs presentes dans le tableau
    $ArrayCompteValeurs = array_count_values ($ArrayRequeteAncienCapitaines);
    //echo ("Ce capitaine est present " . $ArrayCompteValeurs[$CapitaineSuppression] . " fois dans cette liste");
    //echo "<br>";
    
    if($ArrayCompteValeurs[$CapitaineSuppression] > 1){
        for($i=0; $i<$ArrayCompteValeurs[$CapitaineSuppression]-1; $i++){
            //echo "je rajoute un autre capitaine";
            //echo "<br>";
            $ArrayInsertionAncienCapitaines[] = $CapitaineSuppression;
        }
    }
    
    //Pour le Bricolage
    //Si la liste n'est pas vide, que le capitaine fait parti de la liste de bricolage et qu'il est le dernier a etre supprime...
    if (($ArrayRequeteAncienBricolage != "") && (in_array($CapitaineSuppression, $ArrayRequeteAncienBricolage)) && ($ArrayCompteValeurs[$CapitaineSuppression] == 1)){
        //echo "je vire de la liste de bricolage";
        
        //Je cree mon tableau Bricolage pour l'insertion dans la bdd
        foreach ($ArrayRequeteAncienBricolage as $element){
            if($element != $CapitaineSuppression){
                $ArrayInsertionAncienBricolage[] = $element;
            }
        }
    }
    else{
        $ArrayInsertionAncienBricolage = $ArrayRequeteAncienBricolage; 
    }
   
    //Preparation des variables avant injection dans la bdd
    $serializeCapitainesAncien = serialize($ArrayInsertionAncienCapitaines);
    $serializeBricolageAncien = serialize($ArrayInsertionAncienBricolage);

    //Petit traitement pour supprimer les entrees residuelles dans la base de donnes lorsqu'un tableau ne contient plus de donnees
    $TestUnserializeCapitainesAncien = unserialize($serializeCapitainesAncien);
    if(isset($TestUnserializeCapitainesAncien[0]) == ""){
        //On  met explicitement pas de valeur
        $serializeCapitainesAncien = "";
        //echo "reinitCapt";
    }
    $TestUnserializeBricolageAncien = unserialize($serializeBricolageAncien);
    if(isset($TestUnserializeBricolageAncien[0]) == ""){
        //On  met explicitement pas de valeur
        $serializeBricolageAncien = "";
        //echo "reinitBrico";
    }
    //fin traitement

    $req = $bdd->prepare('UPDATE resavan SET ' . $NomClassOrigine . ' = :capitainesVan, bricolage = :bricolage WHERE date =  \'' . $dateVan . '\'');
    $req->execute(array(
    'capitainesVan' => $serializeCapitainesAncien,
    'bricolage' => $serializeBricolageAncien
    ));
}

/*//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Ajout d'un van//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/

if (isset($_POST['TestEnvoi']))
{
    //echo "je viens d'envoyer";
    //echo "<br>";
    //echo $_POST['heureVan'];
    //echo "<br>";
    //echo $_POST['dateNewVan'];    
    //echo "<br>";

    //Reformatage de la date
    $jour = substr($_POST['dateNewVan'], -2);
    $annee = substr($_POST['dateNewVan'], 0, -6);
    $mois = substr($_POST['dateNewVan'], 5, -3);
    $datePourBase = $jour . "/" . $mois . "/" . $annee;
    //echo $datePourBase;
    //echo "<br>";

    
    $requeteTest = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $datePourBase . '\'');
    $requeteUpdate = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $datePourBase . '\'');
    
    //On teste voir si l'entree existe deja
    while ($donnees1 = $requeteTest->fetch()) 
    {
        if ($donnees1['date'] == $datePourBase)
        {
            $testEntreeExisteBDD = 1;
        }
    }
    $requeteTest->closeCursor();
    
    if ($_POST['heureVan'] == "Morning")
    {
        //echo "je rajoute mon van du matin";
        if ($testEntreeExisteBDD == 1)
        {
            //echo "je mets a jour le matin";
            while ($donnees = $requeteUpdate->fetch()) 
            {
                //echo "je suis dans la boucle";
                if ($donnees['date'] == $datePourBase && $donnees['van1'] == 0)
                {
                    //echo "je devrais faire la modif";

                    $req = $bdd->prepare('UPDATE resavan SET van1 = :van1 WHERE date =  \'' . $datePourBase . '\'');
                    $req->execute(array(
                        'van1' => 1
                        ));
                }
            }
            $requeteUpdate->closeCursor();
        }
        else
        {
            //echo "je cree le van du matin";
            $req = $bdd->prepare('INSERT INTO resavan(date, van1, van2, capitainesVan1, capitainesVan2, bricolage) VALUES(:date, :van1, :van2, :capitaines1, :capitaines2, :bricolage)');
            $req->execute(array(
                'date' => $datePourBase,
                'van1' => 1,
                'van2' => 0,
                'capitaines1' => "",
                'capitaines2' => "",
                'bricolage' => ""
                ));
        }
    }
    elseif ($_POST['heureVan'] == "Afternoon")
    {
        //echo "j'ajoute l'aprem";
        if ($testEntreeExisteBDD == 1)
        {
            while ($donnees2 = $requeteUpdate->fetch()) 
            {
               // echo "je mets a jour";
                if ($donnees2['date'] == $datePourBase && $donnees2['van2'] == 0)
                {
                    //echo "j'update";
                    $req = $bdd->prepare('UPDATE resavan SET van2 = :van2 WHERE date =  \'' . $datePourBase . '\'');
                    $req->execute(array(
                        'van2' => 1
                        ));
                }
            }
            $requeteUpdate->closeCursor();
        }
        else
        {
            //echo "je cree l'aprem";
            //echo $datePourBase;
            $req = $bdd->prepare('INSERT INTO resavan(date, van1, van2, capitainesVan1, capitainesVan2, bricolage) VALUES(:date, :van1, :van2, :capitaines1, :capitaines2, :bricolage)');
            $req->execute(array(
                'date' => $datePourBase,
                'van1' => 0,
                'van2' => 1,
                'capitaines1' => "",
                'capitaines2' => "",
                'bricolage' => ""
                ));
        }
    }
}
/*//////////////////////////////Fin ajout van/////////////////////////////////*/

/*//////////////////////////////////////////////////////////////////////////////
//////////////////////////// Suppression d'un van///////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/



if (isset($_POST['TestEnvoiDEL']))
{
    
    //echo "je supprime un Van";
    //echo "<br>";
    //echo $_POST['heureVanDEL'];
    //echo "<br>";
    //echo $_POST['dateDELvan'];    
    //echo "<br>";
    
    $requeteDELvan = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $_POST['dateDELvan'] . '\'');
    
    if($_POST['heureVanDEL'] == "Morning"){
        $requeteDELvan = $bdd->prepare('UPDATE resavan SET van1 = :van1 WHERE date =  \'' . $_POST['dateDELvan'] . '\'');
        $requeteDELvan->execute(array(
            'van1' => 0
            ));
    }
    else if($_POST['heureVanDEL'] == "Afternoon"){
        $requeteDELvan = $bdd->prepare('UPDATE resavan SET van2 = :van2 WHERE date =  \'' . $_POST['dateDELvan'] . '\'');
        $requeteDELvan->execute(array(
            'van2' => 0
            ));
    }
}
/*///////////////////////////Fin Suppression van//////////////////////////////*/


/*//////////////////////////////////////////////////////////////////////////////
/////////////////////// FORMULAIRE CACHE AJOUT CAPITAINE////////////////////////
//////////////////////////////////////////////////////////////////////////////*/
?>

<div id="divFormulaireCache">

    <div>
        <form method="post" enctype="multipart/form-data">
            
            <p>How many seats would you like to book?</p>
            <select name="NbSeatBook">
                <?php
                for($i=1; $i<=$NbCapitainesMax; $i++)
                { ?>
                    <option name="<?php echo $i; ?>"><?php echo $i; ?></option>
                <?php
                } ?>
            </select>
            <p>Willing to stop to hardware stores?</p>
            <select name="hardware">
                <option value="0">No</option>
                <option Value="1">Yes</option>
            </select>
      
            <input id="dateVan" name="dateVan" type="hidden"/>
            <input id="inputEnvoieVan" name="inputEnvoieVan" type="hidden"/>
            <input type="hidden" name="TestEnvoiBooking" value="1" />
            <input type="hidden" name="NomCapitaine" value="<?php echo $_SESSION['SessionBateau'] ?>" />
            <br />
            <br />
            <input style="width:100%" type="submit" value="Book" name="Book">
        </form>
        <form>
            <br />
            <br />
            <input style="width:100%" type="submit" value="Cancel" name="Cancel">
        </form>
    </div>

</div>
<!--
/*//////////////////////////////////////////////////////////////////////////////
/////////////////////// FORMULAIRE CACHE DEL CAPITAINE//////////////////////////
//////////////////////////////////////////////////////////////////////////////*/ 
-->
<div id="divFormulaireCacheDEL"> 
    <div>
        <form method="post" enctype="multipart/form-data">
            <p>You are about to cancel you seat for </p><p id="AfficheDateDEL"></p>

            <input type="hidden" id="dateVanDEL" name="dateVanDEL"/>
            <input type="hidden" id="inputEnvoieVanDEL" name="inputEnvoieVanDEL"/>
            <input type="hidden" name="TestEnvoiDel" value="1" />
            <input id="NomCapitaineDEL" type="hidden" name="NomCapitaineDEL" />
            <br />
            <br />
            <input style="width:100%" type="submit" value="Proceed" name="Proceed">
        </form>
        <form>
            <br />
            <br />
            <input style="width:100%" type="submit" value="Cancel" name="Cancel">
        </form>
    </div>
</div>


<!--
/*//////////////////////////////////////////////////////////////////////////////
////////////////////////////// TUTO CACHE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/ 
-->


<div id="divContenantTuto">
    
    
    
    <div id="divTuto1">
        <p>How does this work?
        <br />
        This calendar shows the next 2 weeks with the available spots in vans to go to Eldons or hardware shops.<br />
        <br />
        Understand the use of colors:<br />
        <br />
        </p>
    </div>

    <div class="divContenantImagestexteTuto">
        <div>
            <img class="imgTuto" src="images/vanAvailable.jpg" alt="vanOk" />
        </div>
        <div>
            <p>Blue: A van is already booked by Suzie. Seats still available. Consider it ready to go.</p>
        </div>
    </div>  
    <div class="divContenantImagestexteTuto">
        <div>
            <img class="imgTuto"  src="images/vanPossible.jpg" alt="vanPossible" />
        </div>
        <div>
            <p>Grey: Suzie hasn’t booked anything at that stage but you still can show your will to go that day. Hopefully more people will join you. Ultimately Suzie might have to move you to another spot.</p>
        </div>
    </div>  
    <div class="divContenantImagestexteTuto">
        <div>
            <img class="imgTuto" src="images/vanFull.jpg" alt="vanFull" />
        </div>
        <div>
            <p>Yellow: The van is full.</p>
        </div>
    </div>  

    <div id="divTuto3">
        <p>To book a seat, simply click on the day you wish to go.<br />
            <br />
            Your name will then appear with a red cross <img style="height: 18px;" src="images/del.png" id="iconeHome" alt="home" /> near to it. Use it if you want to cancel your reservation.<br />
        <br />
        Vans to the hardware stores: Suzie tries as much as possible to organize people willing to go on these longer trips together. You can easily see who is already willing to go by spotting the little wrench <img style="height: 15px;" src="images/clefW.png" id="iconeHome" alt="home" /> on the side <br />
        <br />
        </p>
    </div>
        <div id="ReturnTuto">
            <p>RETURN</p>
    </div>
        
</div>



<!--
/*//////////////////////////////////////////////////////////////////////////////
//////////////////////////// DEBUT PAGE WEB/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////*/ 
-->


<div id="divPagePrincipal">
        <div id="Baniere"> 
            
            <div id="DivIconeHome">
                <a href="index.php"><img src="images/home.png" id="iconeHome" alt="home" /></a>
            </div>
            <div id="DivTitrePage">
                <p>Go Shopping, book a van</p>
            </div>
            <div id="DivSousBaniere">
                <div id="welcome">
                    <div> 
                        <p>Welcome <?php echo $_SESSION['SessionBateau']?></p>
                    </div>
                    <div id="DivDeco"><?php if (isset($_SESSION['SessionBateau'])){ ?>
                        <a href="index.php"><p>Sign out</p></a>
                        <?php 
                        } ?>
                    </div>
                </div>
                <div id="divEntreWelcomeFirst"></div>
                <div id="FirstTime">
                    <p style="font-weight:bold;">First time Here?</p>
                </div>
            </div>
            
            
            
        </div>
        
        <div id="DivConteneurPagePrincipale">
            <?php
            if ($_SESSION['SessionBateau'] == "Thera" || $_SESSION['SessionBateau'] == "Suzie Too") 
            {?>
            <div id="divFormulairesAdministrationVANS">
                <div id="divAjoutVan"> <p style="color:black;">Adding a van</p>
                    <form method="post" enctype="multipart/form-data">  
                        <label for="datevan">Date</label>
                            <input type="date" id="datevan" name="dateNewVan">
                        <select name="heureVan">
                            <option name="morning">Morning</option>
                            <option name="afternoon">Afternoon</option>
                        </select>
                        <input type="hidden" name="TestEnvoi" value="1" />
                        <input type="submit" value="Add" name="Add">
                    </form>
                </div>
                <div id="divEntre2Formulaires">
                    <p>&nbsp;</p>
                </div>
                <div id="divAjoutVan"> <p style="color:black;">Removing a van</p>
                    <form method="post" enctype="multipart/form-data">  
                        <label for="datevanDEL">Date</label>
                        <select name="dateDELvan">
                            <option name="---">---</option>
                            <?php
                            $TomorrowDEL = time() - 28800;
                            for ($i=0; $i<$NbJoursAafficher; $i++)
                            {?>
                                <option value="<?php echo date("d/m/Y", $TomorrowDEL); ?>">  <?php echo date("d/m/Y", $TomorrowDEL); ?>  </option>

                            <?php 
                            $TomorrowDEL = $TomorrowDEL + 86400;  // il y a 86400 sec dans 24h
                            }
                            ?>
                        </select>
                        <select name="heureVanDEL">
                            <option name="morning">Morning</option>
                            <option name="afternoon">Afternoon</option>
                        </select>
                        <input type="hidden" name="TestEnvoiDEL" value="1" />
                        <input type="submit" value="Remove" name="Remove">
                    </form>
                </div>
            </div>
            <?php
            } ?>
                <div id="divHautCalendrier"> 
                    <div id="DivCalend1"></div>
                    <div id="DivCalend2"><p>10:00 Van</p></div>
                    <div id="DivCalend3"><p>13:00 Van</p></div>
                </div>
            <?php
            for ($i=0; $i<$NbJoursAafficher; $i++)
            {
                ?>
                <div id="divConteneur3Divs">
                    <div class="Date"><p><?php echo date("l", $Tomorrow) . "<br />" . date("d/m/Y", $Tomorrow); ?></p> </div>

                    <?php
                    
                    $requeteBricolage = $bdd->query('SELECT bricolage FROM resavan WHERE date = \'' . date("d/m/Y", $Tomorrow) . '\'');
                    while ($donnees = $requeteBricolage->fetch()) 
                    {
                    //echo $donnees['bricolage'];
                    
                       // $arrayBricolage = array();
                        $arrayBricolage = unserialize($donnees['bricolage']);
/*
                        foreach($arrayBricolage as $element)
                            {
                            echo $element;
                            }
                    */
                    }
                    
                    $requeteVANS = $bdd->query('SELECT * FROM resavan');
                    while ($donnees = $requeteVANS->fetch()) 
                    {
                        if (($donnees['van1'] == 1 || $donnees['van1'] == 2 || $donnees['van1'] == 0) && $donnees['date'] == date("d/m/Y", $Tomorrow)) 
                        { 
                            $arrayCapitainesVan1 = unserialize($donnees['capitainesVan1']);
                            
                            if(count($arrayCapitainesVan1) >= $NbCapitainesMax)
                            {
                                $van1 = "VanFull1";
                                $dateTest1 = 1;
                            }
                            else if($donnees['van1'] == 1 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                            {
                                $van1 = "VanBooke1"; 
                                $dateTest1 = 1;
                            }
                            else if($donnees['van1'] == 0 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                            {
                                $van1 = "VanNone1"; 
                                $dateTest1 = 1;
                            }
                            //echo $donnees['date'];
                        }
                        elseif ($donnees['van1'] == 2 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                        {
                            $van1 = "VanFul11";
                        }

                                
                        if (($donnees['van2'] == 1 || $donnees['van2'] == 2|| $donnees['van2'] == 0) && $donnees['date'] == date("d/m/Y", $Tomorrow))
                        { 
                            $arrayCapitainesVan2 = unserialize($donnees['capitainesVan2']);
                          
                            if(count($arrayCapitainesVan2) >= $NbCapitainesMax)
                            {
                                $van2 = "VanFull2";
                                $dateTest2 = 1;
                            }
                            else if($donnees['van2'] == 1 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                            {
                                $van2 = "VanBooke2"; 
                                $dateTest2 = 1;
                            }
                            else if($donnees['van2'] == 0 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                            {
                                $van2 = "VanNone2"; 
                                $dateTest2 = 1;
                            }
                        }
                        elseif ($donnees['van2'] == 2 && $donnees['date'] == date("d/m/Y", $Tomorrow))
                        {
                            $van2 = "VanFull2";
                        }
                    }
                    $requeteVANS->closeCursor(); ?>

                    
                    <div class="<?php echo $van1; ?>"> 
                        <?php
                        //echo $van1;
                        if (($van1 == "VanBooke1" || $van1 == "VanFull1" || $van1 == "VanNone1") && $dateTest1 == 1)
                        { 
                            if ($arrayCapitainesVan1 != "")
                            {
                                foreach($arrayCapitainesVan1 as $element)
                                {
                                    if($_SESSION['SessionBateau'] == "Thera" || $_SESSION['SessionBateau'] == "Suzie Too")
                                    {?>
                                        <div draggable="true" class="divContenantCapitainesEtIconeSuppression">
                                    <?php }
                                    else{ ?>
                                        <div draggable="false" class="divContenantCapitainesEtIconeSuppression">
                                    <?php
                                    }?>
                                        <div class="divCapitaineAffiche"><p><?php echo $element;?></p></div>
                                        <div><?php
                                        if ($arrayBricolage != "")
                                            {
                                                if (in_array($element, $arrayBricolage))
                                                { ?>
                                                <div><img src="images/clef.png" class="iconeBricolage" alt="clef" /></div>
                                                    
                                                <?php
                                                }
                                            }?></div>
                                        <?php
                                        if($element == $_SESSION['SessionBateau'] || $_SESSION['SessionBateau'] == "Thera" || $_SESSION['SessionBateau'] == "Suzie Too")
                                        {?>
                                        <div><img src="images/del.png" class="imageDe11" alt="del" /></div>
                                        <?php
                                        }
                                        ?>
                                        <!-- Formulaire bidon pour passer ma valeur de classe d'origine pour etre recuperee par javascript plus tard -->
                                        <div class="FormVariables"> 
                                            <form>
                                                <input type="hidden" value="<?php echo $van1; ?>" />
                                            </form>
                                        </div>
                                        
                                </div>  
                                <?php
                                }
                            }
                        }?>
                    </div>
                    
                    <div class="<?php echo $van2; ?>"> 
                        <?php
                       // echo $van2;
                        //echo count($arrayCapitainesVan2);
                        if (($van2 == "VanBooke2" || $van2 == "VanFull2" || $van2 == "VanNone2") && $dateTest2 == 1)
                        {
                            if ($arrayCapitainesVan2 != "")
                            {
                                foreach($arrayCapitainesVan2 as $element)
                                { 
                                    if($_SESSION['SessionBateau'] == "Thera" || $_SESSION['SessionBateau'] == "Suzie Too")
                                        {?>
                                            <div draggable="true" class="divContenantCapitainesEtIconeSuppression">
                                        <?php }
                                        else{ ?>
                                            <div draggable="false" class="divContenantCapitainesEtIconeSuppression">
                                        <?php
                                    }?>
                                    <div class="divCapitaineAffiche"><p><?php echo $element;?></p></div>
                                        <div><?php
                                        if ($arrayBricolage != "")
                                        {
                                            if (in_array($element, $arrayBricolage))
                                            { ?>
                                                <div><img src="images/clef.png" class="iconeBricolage" alt="clef" /></div>

                                            <?php
                                            }
                                        }?></div>
                                       <?php
                                    if($element == $_SESSION['SessionBateau'] || $_SESSION['SessionBateau'] == "Thera" || $_SESSION['SessionBateau'] == "Suzie Too")
                                    {?> 
                                    <div><img src="images/del.png" class="imageDel2" alt="del" /></div>
                                    <?php
                                    }
                                    ?>
                                        <!-- Formulaire bidon pour passer ma valeur de classe d'origine pour etre recuperee par javascript plus tard -->
                                        <div class="FormVariables"> 
                                            <form>
                                                <input type="hidden" value="<?php echo $van2; ?>" />
                                            </form>
                                        </div>
                                </div>   
                                <?php
                                }
                            }
                        }?>
                    </div>
                </div>
            <?php 
            $van1 = "VanNone1";
            $van2 = "VanNone2";
            $dateTest1 = 0;
            $dateTest2 = 0;
            $nomsCapitainesVan1 = "";
            $TableauNomsCapitainesVan2 = "";
            $dateVan = "";
            $Tomorrow = $Tomorrow + 86400;  // il y a 86400 sec dans 24h
            $arrayBricolage = "";
            }
            ?>   
            
            
            
            
        </div>
        


</div>
<script  src="CodeJavascript.js"></script>
<?php 
include "basPage.php";
?>