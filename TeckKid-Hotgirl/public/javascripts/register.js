$(document).ready(async () => {
  const input = document.getElementsByTagName("input");
  const register = document.getElementById("register");
  const checked = document.getElementsByClassName("checked");
  const success = document.getElementsByClassName("success");
  const error = document.getElementsByClassName("error");
  const register_check = document.getElementById("register_check");
  Array.from(success).forEach(item => {
    item.style.display = "none";
  });
  Array.from(error).forEach(item => {
    item.style.display = "none";
  });
  Array.from(input).forEach(input => {
    input.value = "";
  });
  Array.from(input).forEach(input => {
    input.addEventListener("input", () => {
      register_check.style.display = "none";
      document.getElementById(`${input.name}NotOk`).style.display = "none";
      document.getElementById(`${input.name}Ok`).style.display = "none";
    });
  });
  register.addEventListener("click", evt => {
    evt.preventDefault();
    if (checked.length === input.length - 1 ) {
      console.log("OK");
      $.ajax({
          url : "http://localhost:3000/api/auth/register",
          type : "post",
          data : {
              email : input.email.value,
              firstName : input.firstName.value,
              lastName : input.lastName.value,
              password : input.password.value
          },
          success: async data => {
            await swal(
              "Register success!",
              "Click Ok to go!",
              "success",
              { button: "Let's go" }
            );
              window.location.href = "http://localhost:3000/auth/login"
          }
      })
    } else {
      register_check.innerText = "Please fill all of fields";
      register_check.style.display = "block";
    }
  });
  Array.from(input).forEach(item => {
    item.addEventListener("change", () => {
      if (item.name === "verifypassword") {
        if (input.password.value === input.verifypassword.value) {
          document.getElementById("verifypasswordOk").style.display = "inline";
        } else {
          document.getElementById("verifypasswordNotOk").innerText =
            "The two passwords must be the same";
          document.getElementById("verifypasswordNotOk").style.display =
            "inline";
        }
      } else
        $.ajax({
          url: "http://localhost:3000/api/auth/register/checkvalid",
          type: "post",
          data: { value: item.value, type: item.name },
          success: data => {
            // data : isExist , isValid , isNull , type
            if (data.isNull) {
              document.getElementById(`${data.type}NotOk`).innerText =
                "Please enter this field";
              document.getElementById(`${data.type}NotOk`).style.display =
                "inline";
            } else if (data.isExist) {
              document.getElementById(`${data.type}NotOk`).innerText =
                "Email has been used";
              document.getElementById(`${data.type}NotOk`).style.display =
                "inline";
            } else if (data.isValid) {
              document.getElementById(`${data.type}Ok`).style.display =
                "inline";
              item.classList.add("checked");
            } else if (!data.isValid) {
              document.getElementById(`${data.type}NotOk`).innerText = `${
                data.type
              } invalid`;
              document.getElementById(`${data.type}NotOk`).style.display =
                "inline";
            }
          }
        });
    });
  });
});
