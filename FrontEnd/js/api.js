/* api.js */
  
export async function login(credentials) {
    try {
        console.log('Sending fetch request');
        const res = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(credentials)
        });
        console.log('Fetch request complete')
        if (!res.ok) { 
            throw new Error('Erreur de connexion'); 
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const log = await res.json();
            return log;
        } else {
            throw new TypeError('La réponse n\'est pas au format JSON');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
    return res;
}


// Fonction pour ajouter une nouvelle photo
async function addPhoto(photo) {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Remplace `${token}` par le token d'authentification de l'utilisateur
      },
      body: JSON.stringify(photo)
    });
  
    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout de la photo : ${response.statusText}`);
    }
  
    return response.json();
  }
  
  // Fonction pour supprimer une photo
  async function deletePhoto(id) {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Remplace `${token}` par le token d'authentification de l'utilisateur
      }
    });
  
    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression de la photo : ${response.statusText}`);
    }
  
    return response.json();
  }
  
  export { addPhoto, deletePhoto };
  

