var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Fonction asynchrone pour charger une publication spécifique depuis l'API
 * @param {string} idPublication - L'ID de la publication à charger
 * @returns {Promise<any>} - Retourne la publication ou null en cas d'erreur
 */
function chargerPublication(idPublication) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:3000/publications/' + idPublication)];
                case 1:
                    response = _a.sent();
                    // Vérifie si la réponse est valide
                    if (!response.ok) {
                        throw new Error("Erreur HTTP : ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json];
                case 3:
                    error_1 = _a.sent();
                    // Affiche l'erreur dans la console si la requête échoue
                    console.error('Erreur lors du chargement de la publication :', error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fonction asynchrone pour charger tous les commentaires d'une publication spécifique
 * @param {string} idPublication - L'ID de la publication dont on veut les commentaires
 * @returns {Promise<any>} - Retourne un tableau de commentaires ou null en cas d'erreur
 */
function chargerCommentaires(idPublication) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, commentairesFiltres, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:3000/commentaires')];
                case 1:
                    response = _a.sent();
                    // Vérifie si la réponse est valide
                    if (!response.ok) {
                        throw new Error("Erreur HTTP : ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    commentairesFiltres = json.filter(function (commentaire) { return commentaire.publicationId === idPublication; });
                    return [2 /*return*/, commentairesFiltres];
                case 3:
                    error_2 = _a.sent();
                    // Affiche l'erreur dans la console si la requête échoue
                    console.error('Erreur lors du chargement des commentaires :', error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fonction asynchrone pour afficher tous les commentaires d'une publication
 * @param {string} idPublication - L'ID de la publication dont on veut afficher les commentaires
 */
function afficherCommentaires(idPublication) {
    return __awaiter(this, void 0, void 0, function () {
        var commentaires, htmlContent_1, decalage_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chargerCommentaires(idPublication)];
                case 1:
                    commentaires = _a.sent();
                    if (commentaires) {
                        htmlContent_1 = "";
                        decalage_1 = 10;
                        // Parcourt chaque commentaire et génère le HTML correspondant
                        commentaires.forEach(function (commentaire) {
                            htmlContent_1 += "<div class=\"row justify-content-end align-items-start\">\n                                <img src=\"images/profil.png\" class=\"img-fluid m-2 col-1 img-thumbnail\" style=\"box-shadow: 0 4px 6px rgba(255, 255, 255, 0.5);\" width=\"200\" height=\"200\" alt=\"image de couverture\">\n                                <div class=\"col-".concat(decalage_1, "\">\n                                    <p>").concat(commentaire.contenu, "</p>\n                                    <p>Post\u00E9 le ").concat(commentaire.dateCommentaire, "</p>\n                                </div>\n                            </div>");
                            if (decalage_1 >= 5)
                                decalage_1--;
                        });
                        // Insère le HTML généré dans le conteneur des commentaires
                        $("#commentaires").html(htmlContent_1);
                    }
                    else {
                        console.error("Impossible de charger les commentaires.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Fonction asynchrone pour afficher une publication complète avec son formulaire de commentaire
 * @param {string} idContainer - L'ID du conteneur HTML où afficher la publication
 * @param {string} idPublication - L'ID de la publication à afficher
 */
function afficherPublication(idContainer, idPublication) {
    return __awaiter(this, void 0, void 0, function () {
        var json, htmlContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chargerPublication(idPublication)];
                case 1:
                    json = _a.sent();
                    if (!json) return [3 /*break*/, 4];
                    htmlContent = "\n                <div class=\"d-flex justify-content-center\">\n      <img src=\"images/".concat(json.id, ".jpg\" class=\"img-fluid w-auto m-2\" alt=\"image de couverture\">\n    </div>\n    <h1 class=\"text-center fw-bold my-4 text-white\" style=\"font-family: 'Lora', serif;\">\n    ").concat(json.titre, "\n    </h1>\n    <p class=\"row text-white\" style=\"font-family: 'Open Sans', sans-serif;\"> \n    Publi\u00E9 par ").concat(json.auteur, " le ").concat(json.datePublication, "\n    </p>\n    <div class=\"row d-flex justify-content-center\">\n      <img src=\"images/").concat(json.id, ".jpg\" class=\"img-fluid w-50  w-lg-33 m-2\" alt=\"Image responsive\">\n    </div>\n    <p class=\"row text-white\" style=\"font-family: 'Open Sans', sans-serif;\">").concat(json.contenu, "\n    </p>\n    <!-- Formulaire pour ajouter un nouveau commentaire -->\n    <form id=\"commentaireForm\" class=\"row\">\n      <div class=\"m-0 d-flex align-items-start justify-content-start\">\n        <label for=\"commentaire\" class=\"form-label row\">Commentaires</label>\n      </div>\n      <textarea class=\"form-control m-0 w-100\" id=\"commentaire\" rows=\"5\"></textarea>\n      <div class=\"col justify-content-end d-flex\">\n        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n      </div>\n    </form>\n    <div class=\"container m-2\" id=\"commentaires\">\n     <!-- Les commentaires seront affich\u00E9s ici -->\n    </div>");
                    // Insère le HTML dans le conteneur spécifié
                    return [4 /*yield*/, $("#".concat(idContainer)).html(htmlContent)];
                case 2:
                    // Insère le HTML dans le conteneur spécifié
                    _a.sent();
                    // Affiche les commentaires existants
                    return [4 /*yield*/, afficherCommentaires(idPublication)];
                case 3:
                    // Affiche les commentaires existants
                    _a.sent();
                    // Ajoute un gestionnaire d'événements pour le formulaire de commentaire
                    $("#commentaireForm").on('submit', function (event) {
                        event.preventDefault(); // Empêche le rechargement de la page
                        ajouterCommentaire(idPublication); // Appelle la fonction pour ajouter le commentaire
                    });
                    return [3 /*break*/, 5];
                case 4:
                    console.error("Impossible de charger les données.");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fonction pour ajouter un nouveau commentaire à la base de données via l'API
 * @param {string} idPublication - L'ID de la publication à laquelle on ajoute le commentaire
 */
function ajouterCommentaire(idPublication) {
    // Récupère le contenu du commentaire saisi par l'utilisateur
    var contenuCommentaire = $("#commentaire").val();
    // Vérifie que le commentaire n'est pas vide
    if (!contenuCommentaire || contenuCommentaire.trim() === "") {
        console.log("Veuillez écrire un commentaire avant de soumettre !");
        return; // Arrête l'exécution si le commentaire est vide
    }
    // Obtient la date actuelle au format ISO (YYYY-MM-DD)
    var dateActuelle = new Date().toISOString().split('T')[0];
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
        .then(function (response) { return response.json(); }) // Convertit la réponse en objet JavaScript
        .then(function (json) {
        console.log('Commentaire ajouté avec succès :', json);
        // Vide le champ textarea après l'ajout réussi
        $("#commentaire").val('');
        // Recharge les commentaires pour afficher le nouveau
        afficherCommentaires(idPublication);
        console.log('Commentaire ajouté avec succès !');
    })
        .catch(function (error) {
        // Affiche l'erreur dans la console si la requête échoue
        console.error('Erreur lors de l\'ajout du commentaire :', error);
    });
}
// Récupère l'ID de la publication depuis l'URL (paramètre GET)
var params = new URLSearchParams(window.location.search);
var idPublication = params.get('id');
// Affiche la publication correspondant à l'ID récupéré
afficherPublication("publication", idPublication);
