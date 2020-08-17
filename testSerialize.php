
<?php 

include "connexion.php";

try
{
        $bdd = new PDO("mysql:host=$hote;dbname=$nomBase;charset=utf8", $user, $passe);
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}


$Test = array();
$dateVan = "01/05/2020";

$var1 = "thera";
$var2 = "elle";
$var3 = "lui";


$Test[] = $var1;
$Test[] = $var2;
$Test[] = $var3;

$Aenvoyer = serialize($Test);



$req = $bdd->prepare('UPDATE resavan SET capitainesVan1 = :capitainesVan WHERE date =  \'' . $dateVan . '\'');
        $req->execute(array(
        'capitainesVan' => $Aenvoyer
        ));
        
        
        
$requete = $bdd->query('SELECT * FROM resavan WHERE date = \'' . $dateVan . '\'');
    while ($donnees = $requete->fetch()){
        $Unser = unserialize($donnees['capitainesVan1']);
    }
    
var_dump($Unser);
echo "<br>";
print_r($Unser);