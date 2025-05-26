// Modal funktionalitet
const kontaktLink = document.querySelector('a[href="#Order"]');
const kontaktModal = document.getElementById("kontaktModal");
const closeBtn = kontaktModal.querySelector(".close");

// Åbn modal
kontaktLink.addEventListener("click", (e) => {
  e.preventDefault();
  kontaktModal.style.display = "block";
});

// Luk modal
closeBtn.addEventListener("click", () => {
  kontaktModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === kontaktModal) {
    kontaktModal.style.display = "none";
  }
});

// Validering
const kontaktForm = document.getElementById("kontaktForm");
const navnInput = document.getElementById("navn");
const telefonInput = document.getElementById("telefon");
const emailInput = document.getElementById("email");
const ordreInput = document.getElementById("ordre");

function showError(input, message) {
  const errorEl = document.getElementById(input.id + "Error");
  input.classList.add("invalid");
  errorEl.textContent = message;
}

function clearError(input) {
  const errorEl = document.getElementById(input.id + "Error");
  input.classList.remove("invalid");
  errorEl.textContent = "";
}

function validateNavn() {
  const navnRegex = /^[A-Za-zæøåÆØÅ]{2,}(?: [A-Za-zæøåÆØÅ]{2,})+$/;
  const value = navnInput.value.trim();
  if (!navnRegex.test(value)) {
    showError(navnInput, "Skriv både fornavn og efternavn (min. 2 bogstaver hver).");
    return false;
  }
  clearError(navnInput);
  return true;
}

function validateTelefon() {
  const phoneRegex = /^[0-9]{8}$/;
  const value = telefonInput.value.trim();
  if (!phoneRegex.test(value)) {
    showError(telefonInput, "Skriv et gyldigt telefonnummer med 8 cifre.");
    return false;
  }
  clearError(telefonInput);
  return true;
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = emailInput.value.trim();
  if (!emailRegex.test(value)) {
    showError(emailInput, "Skriv en gyldig e-mail.");
    return false;
  }
  clearError(emailInput);
  return true;
}

function validateOrdre() {
  const value = ordreInput.value.trim();
  if (value.length < 3) {
    showError(ordreInput, "Skriv hvad du vil bestille.");
    return false;
  }
  clearError(ordreInput);
  return true;
}

// Real-time validering
navnInput.addEventListener("input", validateNavn);
telefonInput.addEventListener("input", validateTelefon);
emailInput.addEventListener("input", validateEmail);
ordreInput.addEventListener("input", validateOrdre);

// Ved form submission
kontaktForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNavnValid = validateNavn();
  const isTelefonValid = validateTelefon();
  const isEmailValid = validateEmail();
  const isOrdreValid = validateOrdre();

  if (isNavnValid && isTelefonValid && isEmailValid && isOrdreValid) {
    alert("Ordren er sendt! 🎉");
    kontaktModal.style.display = "none";
    kontaktForm.reset();
  }
});
