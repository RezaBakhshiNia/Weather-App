"use strict";

import "https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js";

let users = [];

axios
  .get("https://646f9b4809ff19b120878e0e.mockapi.io/api/done/users")
  .then((response) => {
    users = response.data;
    console.log(users); // Log the user data to the console
  })
  .catch((error) => {
    console.log(error);
  });

const userID = document.getElementById("userID"),
  password = document.getElementById("password"),
  loginBtn = document.getElementById("login"),
  modal = document.getElementById("modal"),
  loading = document.getElementById("loading"),
  modalMessage = document.getElementById("modalMessage");

function checkUsername(username) {
  return users.some((user) => user.userName === username);
}

function checkPassword(password) {
  return users.some((user) => user.password === password);
}

function currentUser(username) {
  return users.find((user) => user.userName === username);
}

loginBtn.addEventListener("click", function (event) {
  if (checkUsername(userID.value) && checkPassword(password.value)) {
    // loading.style.display = "flex";
    const userIDValue = userID.value;
    const currentUserObj = currentUser(userIDValue);
    console.log(currentUserObj);

    axios
      .post(
        "https://646f9b4809ff19b120878e0e.mockapi.io/api/done/Done",
        currentUserObj
      )
      .then((response) => {
        alert("Entering...");
        window.location.href = "http://127.0.0.1:5500/index.html";
      })
      .catch((error) => {
        console.log(error);
        alert("Error login user.");
      });
  } else {
    modalMessage.textContent = `Wrong password or user name!`;

    modal.style.display = "flex";
    setTimeout(function () {
      modal.style.display = "none";
    }, 3000);
  }
});
