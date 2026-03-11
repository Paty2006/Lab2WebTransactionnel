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
 * Fonction asynchrone pour charger toutes les publications depuis l'API
 * @returns {Promise<any>} - Retourne un tableau de publications ou null en cas d'erreur
 */
function chargerPublications() {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:3000/publications')];
                case 1:
                    response = _a.sent();
                    // Vérifie si la réponse est valide (code HTTP 200-299)
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
                    console.error('Erreur lors du chargement des données :', error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fonction asynchrone pour afficher toutes les publications dans le conteneur HTML spécifié
 * @param {string} idContainer - L'ID du conteneur HTML où afficher les publications
 */
function afficherPublications(idContainer) {
    return __awaiter(this, void 0, void 0, function () {
        var json, htmlContent_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chargerPublications()];
                case 1:
                    json = _a.sent();
                    if (json) {
                        htmlContent_1 = "";
                        // Parcourt chaque publication et génère le HTML correspondant
                        json.forEach(function (element) {
                            // Vérifie que tous les champs nécessaires sont présents
                            if (element.titre != null && element.auteur != null && element.datePublication != null && element.contenu != null) {
                                // Début de la carte Bootstrap pour la publication
                                htmlContent_1 += "\n                <div class='col-lg-4'>\n                    <div id='card".concat(element.id, "' class='card card-hover h-100 border border-primary'>\n                        <img src='images/");
                                // Utilise l'image correspondant à l'ID si elle existe, sinon utilise l'image par défaut
                                if (element.id < '8')
                                    htmlContent_1 += element.id;
                                else
                                    htmlContent_1 += "no-image";
                                htmlContent_1 += ".jpg' class='card-img-top h-50' alt='".concat(element.titre, "'>\n                        <div class='card-body'>\n                            <h5 class='card-title bg-dark text-white p-2 custom-title'>").concat(element.titre, "</h5>\n                            <p class='card-text'>").concat(element.contenu.slice(0, 300), "...</p>\n                            <a href='blog.html?id=").concat(element.id, "' class='stretched-link'></a>\n                        </div>\n                    </div>\n                </div>");
                            }
                        });
                        // Insère le HTML généré dans le conteneur spécifié
                        $("#".concat(idContainer)).html(htmlContent_1);
                    }
                    else {
                        console.error("Impossible de charger les données.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Exécute le code lorsque le DOM est complètement chargé
$(document).ready(function () {
    // Affiche toutes les publications dans le conteneur avec l'ID "publications"
    afficherPublications("publications");
});
