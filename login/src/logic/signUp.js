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

const name = document.getElementById("name"),
  userID = document.getElementById("userID"),
  password1 = document.getElementById("password1"),
  password2 = document.getElementById("password2"),
  register = document.getElementById("register"),
  modal = document.getElementById("modal"),
  loading = document.getElementById("loading"),
  modalMessage = document.getElementById("modalMessage");

// Define a function to check if a given username exists
function checkUsername(username) {
  for (const user of users) {
    if (user.userName === username) {
      return true;
    }
  }
}

function checkUsername2(username) {
  return users.some(user => user.userName === username);
}


register.addEventListener("click", function (event) {
  if (password1.value !== password2.value) {
    modalMessage.textContent = `Your password doesn't match!`;
    modal.style.display = "flex";
    setTimeout(function () {
      modal.style.display = "none";
    }, 3000);
  } else if (checkUsername2(userID.value)) {
    modalMessage.textContent = `This ID belongs to someone else!`;
    modal.style.display = "flex";
    setTimeout(function () {
      modal.style.display = "none";
    }, 3000);
  } else {
    loading.style.display = "flex";
    const newUserData = {
      name: name.value,
      userName: userID.value,
      password: password1.value,
    };
    axios
      .post(
        "https://646f9b4809ff19b120878e0e.mockapi.io/api/done/users",
        newUserData
      )
      .then((response) => {
        console.log(response.data);
        alert("User created successfully \n you'll be redirected to login page.");
        window.location.href = "http://127.0.0.1:5500/login/signIn.html";
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating user");
      });
  }
});
