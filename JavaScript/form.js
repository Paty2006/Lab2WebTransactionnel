/**
 * Fonction pour ajouter une nouvelle publication à la base de données via l'API
 * @param {string} titre - Le titre de la publication
 * @param {string} auteur - L'auteur de la publication
 * @param {string} date - La date de publication
 * @param {string} contenu - Le contenu de la publication
 */
function ajouterPublication(titre, auteur, date, contenu) {
    // Envoie une requête POST à l'API pour ajouter une nouvelle publication
    fetch('http://localhost:3000/publications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indique que les données envoyées sont au format JSON
        },
        body: JSON.stringify({
            titre: titre,
            auteur: auteur,
            datePublication: date,
            contenu: contenu
        })
    })
        .then(function (response) { return response.json(); }) // Convertit la réponse en objet JavaScript
        .then(function (json) {
        // Affiche un message de succès dans la console
        console.log('Publication ajoutée avec succès :', json);
        console.log('Redirection vers index.html...');
        // Redirige l'utilisateur vers la page d'accueil après l'ajout
        window.location.href = "index.html";
    })
        .catch(function (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors de l\'ajout de la publication :', error);
    });
}
// Exécute le code lorsque le DOM est complètement chargé
$(document).ready(function () {
    /**
     * Initialise la boîte de dialogue jQuery UI pour confirmer l'envoi du formulaire
     */
    $("#confirmDialog").dialog({
        autoOpen: false, // La boîte ne s'ouvre pas automatiquement
        modal: true, // Bloque les interactions avec le reste de la page
        resizable: false, // Empêche le redimensionnement de la boîte
        width: 400, // Largeur de la boîte de dialogue
        buttons: {
            // Bouton "Confirmer" : soumet le formulaire
            "Confirmer": function () {
                // Ferme la boîte de dialogue
                $(this).dialog("close");
                // Récupère les valeurs saisies dans le formulaire
                var titre = $("#titre").val();
                var auteur = $("#auteur").val();
                var date = $("#date").val();
                var contenu = $("#contenu").val();
                console.log('Confirmation de l\'envoi de la publication...');
                // Appelle la fonction pour ajouter la publication à la base de données
                ajouterPublication(titre, auteur, date, contenu);
            },
            // Bouton "Annuler" : ferme la boîte sans soumettre
            "Annuler": function () {
                console.log('Envoi du formulaire annulé');
                $(this).dialog("close");
            }
        }
    });
    /**
     * Intercepte l'envoi du formulaire pour afficher la boîte de confirmation
     */
    $("#publicationForm").on('submit', function (event) {
        // Empêche l'envoi par défaut du formulaire (pas de rechargement de page)
        event.preventDefault();
        // Récupère les valeurs des champs du formulaire
        var titre = $("#titre").val();
        var auteur = $("#auteur").val();
        var date = $("#date").val();
        var contenu = $("#contenu").val();
        // Vérifie que tous les champs sont remplis
        if (!titre || !auteur || !date || !contenu) {
            console.log("Erreur : Tous les champs doivent être remplis !");
            return; // Arrête l'exécution si un champ est vide
        }
        // Ouvre la boîte de dialogue de confirmation
        console.log('Ouverture de la boîte de dialogue de confirmation...');
        $("#confirmDialog").dialog("open");
    });
});
