document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/users');
  const users = await res.json();

  const admin = users.find(user => user.username === username && user.password === password);

  if (admin) {
    window.location.href = 'adminPage.html';
  } else {
    alert('Credenciales incorrectas');
  }
});
