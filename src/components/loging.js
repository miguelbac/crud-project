
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const users = await response.json();

      if (users.length > 0) {
        alert('✅ Login exitoso');
        // Aquí puedes redirigir o guardar la sesión
        // localStorage.setItem('usuario', JSON.stringify(users[0]));
      } else {
        alert('❌ Usuario o contraseña incorrectos');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('⚠️ Error de conexión con el servidor');
    }
  });

