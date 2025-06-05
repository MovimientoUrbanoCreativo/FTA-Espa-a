

function toggleInfo() {
  const info = document.getElementById('info');
  info.style.display = info.style.display === 'block' ? 'none' : 'block';
}

function togglePrivacidad() {
  const texto = document.getElementById('privacidad-texto');
  texto.style.display = texto.style.display === 'block' ? 'none' : 'block';
}

function mostrarDetalles(tipo) {
  document.getElementById('detalles-gratis').style.display = 'none';
  document.getElementById('detalles-asiento').style.display = 'none';

  if (tipo === 'gratis') {
    document.getElementById('detalles-gratis').style.display = 'block';
  } else if (tipo === 'asiento') {
    document.getElementById('detalles-asiento').style.display = 'block';
  }
}

// Rellenar selects de día, mes y año
const diaSelect = document.getElementById('dia');
for (let d = 1; d <= 31; d++) {
  diaSelect.innerHTML += `<option value="${d}">${d}</option>`;
}

const mesSelect = document.getElementById('mes');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
meses.forEach((mes, index) => {
  mesSelect.innerHTML += `<option value="${index + 1}">${mes}</option>`;
});

const anioSelect = document.getElementById('anio');
const anioActual = new Date().getFullYear();
for (let y = anioActual; y >= 1920; y--) {
  anioSelect.innerHTML += `<option value="${y}">${y}</option>`;
}

// Envío del formulario
document.getElementById('inscripcionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const anio = document.getElementById('anio').value;
  const email = document.getElementById('email').value.trim();
  const provincia = document.getElementById('provincia').value.trim();
  const privacidad = document.getElementById('privacidad').checked;
  const tipoEntradaSeleccionada = document.querySelector('input[name="tipoEntrada"]:checked');

  const dniRegex = /^[XYZ]?\d{7,8}[A-Z]$/i;

  if (!nombre || !apellidos || !dni || !dia || !mes || !anio || !email || !provincia) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (!dniRegex.test(dni)) {
    alert("Introduce un DNI o NIE válido.");
    return;
  }

  if (!privacidad) {
    alert("Debes aceptar la política de privacidad.");
    return;
  }

  if (!tipoEntradaSeleccionada) {
    alert("Debes seleccionar un tipo de entrada.");
    return;
  }

  // Si seleccionó "asiento", mostramos el modal y no enviamos nada
  if (tipoEntradaSeleccionada.value === "asiento") {
    document.getElementById('infoModal').classList.remove('hidden');
    return;
  }

  // Si no es "asiento", seguimos con el envío
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("apellidos", apellidos);
  formData.append("dni", dni);
  formData.append("dia", dia);
  formData.append("mes", mes);
  formData.append("anio", anio);
  formData.append("email", email);
  formData.append("provincia", provincia);
  formData.append("tipoEntrada", tipoEntradaSeleccionada.value);

  const scriptURL = "https://script.google.com/macros/s/AKfycbwpDePEJ7vSX9WC_OvMeaoc0KZpIBLk3DJwx8QhJYlm4lO1IwQC1KKNYMj8bRTS9B0K/exec";

  fetch(scriptURL, { method: "POST", body: formData })
    .then(response => {
      if (response.ok) {
        alert("Inscripción enviada con éxito.");
        document.getElementById("inscripcionForm").reset();
        document.getElementById("detalles-gratis").style.display = 'none';
        document.getElementById("detalles-asiento").style.display = 'none';
      } else {
        alert("Error al enviar. Intenta nuevamente.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario.");
    });
});

function cerrar() {
  window.location.href = '../index.html';
}

// ✅ Usamos classList para ocultar correctamente
function closeInfoModal() {
  document.getElementById('infoModal').classList.add('hidden');
}
