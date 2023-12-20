/* login.js */
import { login } from './api.js';
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Récupération des informations du formulaire ici
        const formData = new FormData(event.target); // Récupère les données du formulaire
        const email = formData.get('email');
        const password = formData.get('password');

        // Vérification du format de l'adresse e-mail avec une expression régulière
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const emailAlert = document.getElementById('emailAlert');

        if (!isEmailValid) {
            emailAlert.style.display = 'block';
            return;
        }

        // Vérification du format du mot de passe avec une expression régulière
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const isPasswordValid = passwordRegex.test(password);
        const passwordAlert = document.getElementById('passwordAlert');

        if (!isPasswordValid) {
            passwordAlert.style.display = 'block';
            return;
        }

        // Crée un objet credentials avec les informations de connexion
        const credentials = {
            username: email,
            password: password
        };

        try {
            const response = await login(credentials);
            // Redirection vers la page d'accueil après connexion réussie
            window.location.href = '/index.html';
            // Stocke le token dans le localStorage
            window.localStorage.setItem('token', response.token);
            // Stocke le token dans le localStorage
            window.localStorage.setItem('token', response.token);
            // Nettoie les informations sensibles stockées temporairement après la connexion
            window.localStorage.removeItem('temporaryUserInformation');
            // Cache les liens des catégories
            document.querySelector('.categories').style.display = 'none';
            // Change le texte du lien "log in" en "log out"
            document.getElementById('login').textContent = 'Log out';


        } catch (error) {
            // Gère les erreurs survenues lors de la connexion
            // Utilise showError ou une autre méthode pour afficher les messages d'erreur
            showError("Mot de passe incorrect");
        }
    });
});

