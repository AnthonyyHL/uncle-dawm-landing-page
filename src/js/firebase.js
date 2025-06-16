// Importa desde el CDN la última versión de Firebase (11.9.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa la app de Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtén una referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Función que guarda el formulario
export function setupContactForm() {
  const form = document.getElementById("quoteForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const [firstName, lastName] = form.querySelectorAll("input[type='text']");
    const email = form.querySelector("input[type='email']").value;
    const phone = form.querySelector("input[type='tel']").value;
    const service = form.querySelector("select").value;
    const description = form.querySelector("textarea").value;

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email,
      phone,
      service,
      description,
      timestamp: new Date().toISOString()
    };

    try {
      await push(ref(database, "contactos/"), formData);
      alert("Gracias por su consulta. Nos pondremos en contacto con usted en un plazo de 24 horas laborales.");
      form.reset();
    } catch (error) {
      alert("Ocurrió un error al enviar.");
      console.error(error);
    }
  });
}
