const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

const getValue = (userInput) => {
  return userInput.value;
};

const removeExistingAlert = () => {
  const existingAlert = document.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }
};

const urlInput = document.querySelector("#urlInput");
const btnContainer = document.querySelector("#buttonContainer");
const qrContainer = document.querySelector("#qrCodeContainer");
const qrImage = document.querySelector("#qrImage");

const alertElement = document.createElement("div");
alertElement.classList.add("alert", "alert-danger", "mt-3", "text-center");
alertElement.textContent = "Please enter a URL";

urlInput.addEventListener("input", () => {
  if (isValidUrl(getValue(urlInput))) {
    btnContainer.classList.remove("d-none");
  }
});

btnContainer.addEventListener("click", () => {
  let enteredURL = getValue(urlInput);
  if (isValidUrl(enteredURL)) {
    removeExistingAlert();
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${enteredURL}`;
    qrContainer.classList.remove("d-none");
  } else {
    // Remove a QR code if there was one
    qrContainer.classList.add("d-none");

    // Remove any existing alert
    removeExistingAlert();

    // Insert the alert after the urlInput element
    urlInput.insertAdjacentElement("afterend", alertElement);
  }
});
