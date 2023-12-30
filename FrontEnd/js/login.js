/* login.js */
import { loginUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const erreurMessage = document.querySelector('.erreur_message');

        try {
            const response = await loginUser(email, password);
            erreurMessage.style.display = 'none';
            loginSuccess(response);
        } catch (error) {
            console.error('Erreur de connexion:', error);
            erreurMessage.innerText = error;
            erreurMessage.style.display = 'block';
        }
    });
});

function loginSuccess(response) {
    // Code à exécuter après une connexion réussie (redirection, stockage du token)
    window.localStorage.setItem('token', response.token);
    window.location.href = '/';
}

