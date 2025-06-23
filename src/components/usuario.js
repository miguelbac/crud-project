
  const formulario = document.getElementById('form-registro');

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    const res = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    if (res.ok) {
      alert('Usuario registrado con éxito');
      formulario.reset();
    } else {
      alert('Error al registrar usuario');
    }
  });

