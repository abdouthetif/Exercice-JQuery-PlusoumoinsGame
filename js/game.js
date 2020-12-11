/**
 * PLUS OU MOINS
 * -------------------------------------
 */


// Attends que le DOM soit chargé
$(function() {

    // Nombre d'essais max.
    localStorage[`nbEssais`] = 4;

    // Génération d'un nombre aléatoire
    localStorage["randomNumber"] = Math.floor(Math.random() * 100) + 1;

    console.log(localStorage["randomNumber"]);

    // Écouteurs d'évènements
    $("#formGame").on("submit", inGame);
	$("#rejouer").on("click", rejouer);
});

// Restart
function rejouer()
{
	// Rafraichit la page courante
	location.reload();
}

// Logique du jeu (ou "logique métier")
function inGame(event)
{
    // Annule l'action "primaire" du formulaire
    event.preventDefault();

    // Récupération dans une variable du nombre d'essais
    let essais = localStorage["nbEssais"];

    // Récupération de la balise "DIV" qui contiendra les indices du jeu
    let phrase = $("#phrase");

    // Récupération du champs "number" en lui indiquant l'index du tableau voulu
    let number = $("#nombre").val();
    
    // Stockage de la valeur aléatoire dans une variable
	let randomNumber = localStorage["randomNumber"];

    // Vérifie s'il reste des essais
    if (essais != 0) {
        
        // Compare la valeur du champs texte "number.value" avec le nombre généré
        // par notre script et stocké dans le localStorage : "localStorage["randomNumber"]"
        if (number < Number(randomNumber)) {
            // console.log('plus grand');
            phrase.html("<h4>Le nombre à trouver est plus grand</h4>");
        }
        else if (number > Number(randomNumber)) {
            //console.log('plus petit');
            phrase.html("<h4>Le nombre à trouver est plus petit</h4>");
        }
        else {
            //console.log('gagné !');
            phrase.html("<h2 class=\"text-success\">Bravo, tu as gagné !</h2>");

            // Vider complétement le localStorage
            localStorage.clear();
		}
        
        // affiche le nombre choisi dans l'historique
        $("#historique").prepend(`<p>${number}</p>`);

        // Stockage de la nouvelle valeur dans le localStorage
        localStorage["nbEssais"] = essais - 1;

        // Affiche le nombre d'essais restants ou le dernier essai
        if (essais > 1) {
		    $("#compteur").html(`<p>Il vous reste ${essais} essais</p>`);
        }
        else {
            $("#compteur").html(`<p>C'est votre dernier essai</p>`);
        }
    }
    
    // S'il ne reste plus d'essais
	else {
        $("#compteur").addClass("d-none");
        $("#formGame").addClass("d-none");
        $("#historique").prepend(`<p>${number}</p>`);
		phrase.html("<h2 class=\"text-danger\">Perdu, tu as fais trop d'essais !</h2>");
        phrase.append(`<p>Le nombre à trouver était ${randomNumber}`)
    }
}