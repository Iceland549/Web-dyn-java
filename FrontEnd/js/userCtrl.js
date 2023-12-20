/* userCtrl.js */

const Users = require('../models/users.model.js');

export async function login(req, res) {
    const { email, password } = req.body; // Récupération des données du formulaire

    try {
        // Vérification si l'utilisateur existe dans la base de données
        const user = await findOne({ email });

        // Si l'utilisateur n'existe pas ou les mots de passe ne correspondent pas
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        // Si les identifiants sont corrects, générez un jeton d'authentification
        const token = generateAuthToken(user); // Ici, vous devrez mettre en place votre propre méthode pour générer un token

        // Réponse en cas de succès avec le token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
}
