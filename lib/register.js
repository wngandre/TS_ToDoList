// Sauvegarder les utilisateurs dans le localStorage
/**
 * @param {Array<{username: string, password: string}>} users
 */
export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
// Charger les utilisateurs depuis le localStorage
export function loadUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}
// Inscription
export function register(username, password) {
  const users = loadUsers();
  if (users.some((user) => user.username === username)) {
    return "Nom d'utilisateur déjà utilisé.";
  }
  const hashedPassword = btoa(password); // Simple base64 encoding for demonstration
  users.push({ username, password: hashedPassword });
  saveUsers(users);
  return "Inscription réussie.";
}
// Gestion des événements pour l'inscription
const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const message = register(username, password);
  const messageElement = document.getElementById("register-message");
  messageElement.textContent = message;
});
