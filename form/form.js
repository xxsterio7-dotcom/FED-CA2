let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);

  let password = formData.get("password");
  let confirmPassword = formData.get("confirmPassword");
  let email = formData.get("email");
  let userName = formData.get("name");

  if (
    password === "" ||
    confirmPassword === "" ||
    userName === "" ||
    email === ""
  ) {
    alert("Fill all the fields");
  } else if (password !== confirmPassword) {
    alert("Password Mismatch");
  } else {
    let personDetails = {
      name: userName,
      email: email,
      password: password,
    };
    addUser(personDetails);
  }
});

let addUser = async (data) => {
  try {
    let response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    location.href = "../login/login.html";
  } catch {
    alert("Try after simetime");
  }
};
