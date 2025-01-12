import { loadUsers } from "./register";
// Connexion
export function login(username, password) {
    const users = loadUsers();
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        return "Nom d'utilisateur ou mot de passe incorrect.";
    }
    return "Connexion réussie.";
}
// Gestion des événements pour la connexion
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const message = login(username, password);
    const messageElement = document.getElementById("login-message");
    messageElement.textContent = message;
});
