<?php
include "connexion.php";
require "class.phpmailer.php";
require "class.smtp.php";

$mail = new PHPmailer();
//ici ce qui t'interesse
$mail->IsSMTP();
$mail->Host = "mail.travelwithnico.com";
$mail->SMTPAuth = true;
$mail->CharSet = 'UTF-8';
$mail->Username = 'nico.degouve@travelwithnico.com';
$mail->Password = 'F@nette05';
$mail->Port = 25;
$mail->FromName = 'Travel with Nico';
$mail->From='nico.degouve@travelwithnico.com';
$mail->AddAddress('neo.degouve@laposte.net');
//$mail->AddReplyTo('votre@adresse');	
//$mail->Subject='Exemple trouvé sur DVP';
//$mail->Body='Voici un exemple d\'e-mail au format Texte';
$mail->Body = "coucou";                        //Création du corps du mail qui sera envoyé
$mail->Subject = "Nico";  //Création du sujet du mail qui sera envoyé        
$mail->Send();                                              //On s'envoie le petit email pour etre tenu informé de l'ajout d'un nouveau commentaire
$mail->SmtpClose();                                         //Fermeture de la connection SMTP
unset($mail);

try
{
        $bdd = new PDO("mysql:host=$hote;dbname=$nomBase;charset=utf8", $user, $passe);
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
    
    // Variable issues du Javascript
    $dateVan = $_GET['Date'];
    $dateVan = substr($dateVan, -10);
    $dateVanAncienne = $_GET['DateAncienne'];
    $dateVanAncienne = substr($dateVanAncienne, -10);
    $Capitaines = $_GET['Capitaines'];
    $CapitaineBouge = $_GET['CapitaineBouge'];  
    $NomClassOrigine = $_GET['ClassOrigine'];  
    $NomClassDestination = $_GET['ClassDestination'];  

    $ArrayRequeteAncienCapitaines = array();
    $ArrayRequeteAncienBricolage = array();
    $ArrayRequeteNouveauCapitaines = array();
    $ArrayRequeteNouveauBricolage = array();
    
    $ArrayInsertionAncienCapitaines = array();
    $ArrayInsertionAncienBricolage = array();
    $ArrayInsertionNouveauCapitaines = array();
    $ArrayInsertionNouveauBricolage = array();
    
    $TestBricolageAncien = 0; //Pour savoir si notre capitaine avait l'option bricolage
    $NbCaptAbouger = 0; //Pour savoir cb de capitaine du meme nom doivent etre deplaces
    
    
    //Je prepare mes variables pour les requetes SQL
    if($NomClassOrigine == "VanBooke1" || $NomClassOrigine == "VanNone1" || $NomClassOrigine == "VanFull1"){
        $NomClassOrigine = "capitainesVan1";
    }
    elseif ($NomClassOrigine == "VanBooke2" || $NomClassOrigine == "VanNone2" || $NomClassOrigine == "VanFull2") {
        $NomClassOrigine = "capitainesVan2";
    }
    
    if($NomClassDestination == "VanBooke1" || $NomClassDestination == "VanNone1" || $NomClassDestination == "VanFull1"){
        $NomClassDestination = "capitainesVan1";
    }
    elseif ($NomClassDestination == "VanBooke2" || $NomClassDestination == "VanNone2" || $NomClassDestination == "VanFull2") {
        $NomClassDestination = "capitainesVan2";
    }
    
    
    
    
    echo '{ 
        "date Ancienne": "' . $dateVanAncienne . '", ';
    
    echo '"ClasseOrig": "' . $NomClassOrigine . '", ';
    echo '"ClasseDest": "' . $NomClassDestination . '", ';
    
    echo '"Capitaine": "' . $CapitaineBouge . '", ';

    $requeteAncienElement = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $dateVanAncienne . '\'');
    while ($DonneesRequeteAncienElement = $requeteAncienElement->fetch()){
        $ArrayRequeteAncienCapitaines = unserialize($DonneesRequeteAncienElement[$NomClassOrigine]);
        $ArrayRequeteAncienBricolage = unserialize($DonneesRequeteAncienElement['bricolage']);
    }
    
    $requeteNouveauElement = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $dateVan . '\'');
    while ($DonneesRequeteNouveauElement = $requeteNouveauElement->fetch()){
        $ArrayRequeteNouveauCapitaines = unserialize($DonneesRequeteNouveauElement[$NomClassDestination]);
        $ArrayRequeteNouveauBricolage = unserialize($DonneesRequeteNouveauElement['bricolage']);
    }
   
    
    echo '"CountArrayRequeteAncienCapitaines": "' . count($ArrayRequeteAncienCapitaines) . '", ';
    echo '"CountArrayRequeteAncienBricolage": "' . count($ArrayRequeteAncienBricolage) . '", ';
    echo '"CountArrayRequeteNouveauCapitaines": "' . count($ArrayRequeteNouveauCapitaines) . '", ';
    echo '"CountArrayRequeteNouveauBricolage": "' . count($ArrayRequeteNouveauBricolage) . '", ';
    
    
    //On teste pour voir si le capitaine fait parti de la liste ANCIENNE du BRICOLAGE
    if ($ArrayRequeteAncienBricolage != ""){
        if (in_array($CapitaineBouge, $ArrayRequeteAncienBricolage)){
            $TestBricolageAncien = 1;
        }
    }
    echo '"TestBricolage": "' . $TestBricolageAncien . '", ';
    
    //on teste pour voir si il y a plusieur capitaines a bouger
    foreach ($ArrayRequeteAncienCapitaines as $element){
        if($element == $CapitaineBouge){
            $NbCaptAbouger++;
        }
    }
    echo '"NbCapAbouger": "' . $NbCaptAbouger . '", ';
    
    //Dans le cas ou on bouge un capitaine qui n'EST PAS dans BRICOLAGE
    if ($TestBricolageAncien == 0){
        
        //On prepare notre ancien tableau
        foreach ($ArrayRequeteAncienCapitaines as $element){
            if($element != $CapitaineBouge){
                $ArrayInsertionAncienCapitaines[] = $element;
            }
        }
        
        //On prepare notre nouveau tableau en rajoutant simplement nos nouvelles entrees a la suite
        $ArrayInsertionNouveauCapitaines = $ArrayRequeteNouveauCapitaines;  //On utilise juste un nouveau tableau pour faire plus propre
        for ($i=0; $i<$NbCaptAbouger; $i++){
            $ArrayInsertionNouveauCapitaines[] = $CapitaineBouge;
        }
        
        $serializeBricolageAncien = serialize($ArrayRequeteAncienBricolage);
        $serializeBricolageNouveau = serialize($ArrayRequeteNouveauBricolage);
        $serializeCapitainesAncien = serialize($ArrayInsertionAncienCapitaines);
        $serializeCapitainesNouveau = serialize($ArrayInsertionNouveauCapitaines);
        
    }
    //Dans le cas ou on bouge un capitaine qui EST dans BRICOLAGE
    else{
        
        //On s'occupe de la partie CAPITAINE
        
        //On prepare notre ancien tableau
        foreach ($ArrayRequeteAncienCapitaines as $element){
            if($element != $CapitaineBouge){
                $ArrayInsertionAncienCapitaines[] = $element;
            }
        }
        
        //On prepare notre nouveau tableau en rajoutant simplement nos nouvelles entrees a la suite
        $ArrayInsertionNouveauCapitaines = $ArrayRequeteNouveauCapitaines;  //On utilise juste un nouveau tableau pour faire plus propre
        for ($i=0; $i<$NbCaptAbouger; $i++){
            $ArrayInsertionNouveauCapitaines[] = $CapitaineBouge;
        }
        
        //On s'occupe de la partie BRICOLAGE
        
        //On prepare notre ancien tableau
        foreach ($ArrayRequeteAncienBricolage as $element){
            if($element != $CapitaineBouge){
                $ArrayInsertionAncienBricolage[] = $element;
            }
        }
        
        //On prepare notre nouveau tableau en rajoutant simplement nos nouvelles entrees a la suite
        $ArrayInsertionNouveauBricolage = $ArrayRequeteNouveauBricolage;  //On utilise juste un nouveau tableau pour faire plus propre
        $ArrayInsertionNouveauBricolage[] = $CapitaineBouge;
        
        $serializeCapitainesAncien = serialize($ArrayInsertionAncienCapitaines);
        $serializeBricolageAncien = serialize($ArrayInsertionAncienBricolage);

        $serializeCapitainesNouveau = serialize($ArrayInsertionNouveauCapitaines);
        $serializeBricolageNouveau = serialize($ArrayInsertionNouveauBricolage);
    }
    
    
    //On se prepare pour inserer en base de donnees - Preparation des tableaux
    
    //Petit traitement pour supprimer les entrees residuelles dans la base de donnes lorsqu'un tableau ne contient plus de donnees
    $TestUnserializeCapitainesAncien = unserialize($serializeCapitainesAncien);
    $TestUnserializeBricolageAncien = unserialize($serializeBricolageAncien);
    if(isset($TestUnserializeCapitainesAncien[0]) == ""){
        //On  met explicitement pas de valeur
        $serializeCapitainesAncien = "";
    }
    if(isset($TestUnserializeBricolageAncien[0]) == ""){
        //On  met explicitement pas de valeur
        $serializeBricolageAncien = "";
    }
    
    
    //Ancienne date
    $req = $bdd->prepare('UPDATE resavan SET ' . $NomClassOrigine . ' = :capitainesVan, bricolage = :bricolage WHERE date =  \'' . $dateVanAncienne . '\'');
    $req->execute(array(
        'capitainesVan' => $serializeCapitainesAncien,
        'bricolage' => $serializeBricolageAncien
        ));
    
    //Nouvelle date
    $req = $bdd->prepare('UPDATE resavan SET ' . $NomClassDestination . ' = :capitainesVan, bricolage = :bricolage WHERE date =  \'' . $dateVan . '\'');
    $req->execute(array(
        'capitainesVan' => $serializeCapitainesNouveau,
        'bricolage' => $serializeBricolageNouveau
        ));
    
   
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////// Lecture des infos ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    //echo '"ArrayInsertionNouveauCapitaines": "' . $serializeCapitainesNouveau . '", ';
    
    
    $fin = "FIN";
    echo '"fin": "' . $fin . '"';
    echo '}';