/**
 * Fonction asynchrone pour charger toutes les publications depuis l'API
 * @returns {Promise<any>} - Retourne un tableau de publications ou null en cas d'erreur
 */
async function chargerPublications(): Promise<any> {
    try {
        // Effectue une requête GET vers l'API pour récupérer les publications
        const response = await fetch('http://localhost:3000/publications');
        
        // Vérifie si la réponse est valide (code HTTP 200-299)
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        // Convertit la réponse JSON en objet JavaScript
        const json = await response.json();
        return json;
    } catch (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors du chargement des données :', error);
        return null;
    }
}

/**
 * Fonction asynchrone pour afficher toutes les publications dans le conteneur HTML spécifié
 * @param {string} idContainer - L'ID du conteneur HTML où afficher les publications
 */
async function afficherPublications(idContainer: string) {
    // Charge les publications depuis l'API
    const json = await chargerPublications();
    
    if (json) {
        let htmlContent = ""; // Variable qui contiendra le HTML généré
        
        // Parcourt chaque publication et génère le HTML correspondant
        json.forEach((element: any) => {
            // Vérifie que tous les champs nécessaires sont présents
            if(element.titre != null && element.auteur != null && element.datePublication != null && element.contenu != null) {
                // Début de la carte Bootstrap pour la publication
                htmlContent += `
                <div class='col-lg-4'>
                    <div id='card${element.id}' class='card card-hover h-100 border border-primary'>
                        <img src='images/`;
                        
                // Utilise l'image correspondant à l'ID si elle existe, sinon utilise l'image par défaut
                if(element.id < '8')
                    htmlContent += element.id;
                else
                    htmlContent += `no-image`;
                    
                htmlContent += `.jpg' class='card-img-top h-50' alt='${element.titre}'>
                        <div class='card-body'>
                            <h5 class='card-title bg-dark text-white p-2 custom-title'>${element.titre}</h5>
                            <p class='card-text'>${element.contenu.slice(0, 300)}...</p>
                            <a href='blog.html?id=${element.id}' class='stretched-link'></a>
                        </div>
                    </div>
                </div>`;
            }
        });

        // Insère le HTML généré dans le conteneur spécifié
        $(`#${idContainer}`).html(htmlContent);
    } else {
        console.error("Impossible de charger les données.");
    }
}

// Exécute le code lorsque le DOM est complètement chargé
$(document).ready(function() {
    // Affiche toutes les publications dans le conteneur avec l'ID "publications"
    afficherPublications("publications");
});






