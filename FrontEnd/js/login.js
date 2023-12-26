/* login.js */
import { loginUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await loginUser(email, password);
            loginSuccess(response);
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    });
});

function loginSuccess(response) {
    // Code à exécuter après une connexion réussie (redirection, stockage du token)
    window.localStorage.setItem('token', response.token);
    window.location.href = '/';
}

