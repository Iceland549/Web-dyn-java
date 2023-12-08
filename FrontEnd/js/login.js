
// Supposons que tu récupères les informations du formulaire dans ces variables
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

// Crée un objet credentials avec les informations de connexion
const credentials = {
    username: username,
    password: password
};

// Appel de la fonction login du fichier api.js avec les informations d'identification
login(credentials)
    .then(response => {
        // Gère la réponse après la tentative de connexion
        // Par exemple, redirige l'utilisateur vers une autre page si la connexion est réussie
    })
    .catch(error => {
        // Gère les erreurs survenues lors de la connexion
        // Utilise showError ou une autre méthode pour afficher les messages d'erreur
        showError("Mot de passe incorrect");
    });
