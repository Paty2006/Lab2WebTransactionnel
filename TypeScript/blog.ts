/**
 * Fonction asynchrone pour charger une publication spécifique depuis l'API
 * @param {string} idPublication - L'ID de la publication à charger
 * @returns {Promise<any>} - Retourne la publication ou null en cas d'erreur
 */
async function chargerPublication(idPublication: string): Promise<any> {
    try {
        // Effectue une requête GET vers l'API pour récupérer une publication spécifique
        const response = await fetch('http://localhost:3000/publications/' + idPublication);
        
        // Vérifie si la réponse est valide
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        // Convertit la réponse JSON en objet JavaScript
        const json = await response.json();
        return json;
    } catch (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors du chargement de la publication :', error);
        return null;
    }
}

/**
 * Fonction asynchrone pour charger tous les commentaires d'une publication spécifique
 * @param {string} idPublication - L'ID de la publication dont on veut les commentaires
 * @returns {Promise<any>} - Retourne un tableau de commentaires ou null en cas d'erreur
 */
async function chargerCommentaires(idPublication: string): Promise<any> {
    try {
        // Effectue une requête GET pour récupérer tous les commentaires
        const response = await fetch('http://localhost:3000/commentaires');
        
        // Vérifie si la réponse est valide
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        // Convertit la réponse JSON en objet JavaScript
        const json = await response.json();
        
        // Filtre les commentaires pour ne garder que ceux de la publication actuelle
        const commentairesFiltres = json.filter((commentaire: any) => commentaire.publicationId === idPublication);
        
        return commentairesFiltres;
    } catch (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors du chargement des commentaires :', error);
        return null;
    }
}

/**
 * Fonction asynchrone pour afficher tous les commentaires d'une publication
 * @param {string} idPublication - L'ID de la publication dont on veut afficher les commentaires
 */
async function afficherCommentaires(idPublication: string) {
    // Charge les commentaires depuis l'API
    const commentaires = await chargerCommentaires(idPublication);
    
    if (commentaires) {
        let htmlContent = ""; // Variable qui contiendra le HTML généré
        let decalage = 10;
        // Parcourt chaque commentaire et génère le HTML correspondant
        commentaires.forEach((commentaire: any) => {
            htmlContent += `<div class="row justify-content-end align-items-start">
                                <img src="images/profil.png" class="img-fluid m-2 col-1 img-thumbnail" style="box-shadow: 0 4px 6px rgba(255, 255, 255, 0.5);" width="200" height="200" alt="image de couverture">
                                <div class="col-${decalage}">
                                    <p>${commentaire.contenu}</p>
                                    <p>Posté le ${commentaire.dateCommentaire}</p>
                                </div>
                            </div>`;
      if(decalage >=5)
        decalage--;
        });
        
        // Insère le HTML généré dans le conteneur des commentaires
        $("#commentaires").html(htmlContent);
    } else {
        console.error("Impossible de charger les commentaires.");
    }
}

/**
 * Fonction asynchrone pour afficher une publication complète avec son formulaire de commentaire
 * @param {string} idContainer - L'ID du conteneur HTML où afficher la publication
 * @param {string} idPublication - L'ID de la publication à afficher
 */
async function afficherPublication(idContainer: string, idPublication: string) {
    // Charge la publication depuis l'API
    const json = await chargerPublication(idPublication);
    
    if (json) {
        // Génère le HTML complet de la page de publication
        let htmlContent = `
                <div class="d-flex justify-content-center">
      <img src="images/${json.id}.jpg" class="img-fluid w-auto m-2" alt="image de couverture">
    </div>
    <h1 class="text-center fw-bold my-4 text-white" style="font-family: 'Lora', serif;">
    ${json.titre}
    </h1>
    <p class="row text-white" style="font-family: 'Open Sans', sans-serif;"> 
    Publié par ${json.auteur} le ${json.datePublication}
    </p>
    <div class="row d-flex justify-content-center">
      <img src="images/${json.id}.jpg" class="img-fluid w-50  w-lg-33 m-2" alt="Image responsive">
    </div>
    <p class="row text-white" style="font-family: 'Open Sans', sans-serif;">${json.contenu}
    </p>
    <!-- Formulaire pour ajouter un nouveau commentaire -->
    <form id="commentaireForm" class="row">
      <div class="m-0 d-flex align-items-start justify-content-start">
        <label for="commentaire" class="form-label row">Commentaires</label>
      </div>
      <textarea class="form-control m-0 w-100" id="commentaire" rows="5"></textarea>
      <div class="col justify-content-end d-flex">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <div class="container m-2" id="commentaires">
     <!-- Les commentaires seront affichés ici -->
    </div>`;

        // Insère le HTML dans le conteneur spécifié
        await $(`#${idContainer}`).html(htmlContent);
        
        // Affiche les commentaires existants
        await afficherCommentaires(idPublication);
        
        // Ajoute un gestionnaire d'événements pour le formulaire de commentaire
        $("#commentaireForm").on('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page
            ajouterCommentaire(idPublication); // Appelle la fonction pour ajouter le commentaire
        });
    } else {
        console.error("Impossible de charger les données.");
    }
}

/**
 * Fonction pour ajouter un nouveau commentaire à la base de données via l'API
 * @param {string} idPublication - L'ID de la publication à laquelle on ajoute le commentaire
 */
function ajouterCommentaire(idPublication: string) {
    // Récupère le contenu du commentaire saisi par l'utilisateur
    const contenuCommentaire = $("#commentaire").val() as string;
    
    // Vérifie que le commentaire n'est pas vide
    if (!contenuCommentaire || contenuCommentaire.trim() === "") {
        console.log("Veuillez écrire un commentaire avant de soumettre !");
        return; // Arrête l'exécution si le commentaire est vide
    }
    
    // Obtient la date actuelle au format ISO (YYYY-MM-DD)
    const dateActuelle = new Date().toISOString().split('T')[0];
    
    // Envoie une requête POST à l'API pour ajouter le nouveau commentaire
    fetch('http://localhost:3000/commentaires', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indique que les données sont au format JSON
        },
        body: JSON.stringify({
            publicationId: idPublication,
            dateCommentaire: dateActuelle,
            contenu: contenuCommentaire
        })
    })
    .then(response => response.json()) // Convertit la réponse en objet JavaScript
    .then(json => {
        console.log('Commentaire ajouté avec succès :', json);
        
        // Vide le champ textarea après l'ajout réussi
        $("#commentaire").val('');
        
        // Recharge les commentaires pour afficher le nouveau
        afficherCommentaires(idPublication);
        
        console.log('Commentaire ajouté avec succès !');
    })
    .catch(error => {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors de l\'ajout du commentaire :', error);
    });
}

// Récupère l'ID de la publication depuis l'URL (paramètre GET)
const params = new URLSearchParams(window.location.search);
const idPublication = params.get('id');

// Affiche la publication correspondant à l'ID récupéré
afficherPublication("publication", idPublication);

