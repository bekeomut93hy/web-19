$(document).ready(async () => {
  const loginbtn = document.getElementById("login");
  const login_false = document.getElementById("login_false");
  const input = document.getElementsByClassName("form-control");
  login_false.style.display = "none";
  Array.from(input).forEach(item => {
    item.addEventListener("input", () => {
      login_false.style.display = "none";
    });
  });
  loginbtn.addEventListener("click", evt => {
    evt.preventDefault();
    if (input.email.value == "" || input.password.value == "") {
      login_false.innerText = "Please fill all blanks";
      login_false.style.display = "block";
    } else {
      $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: "post",
        data: {
          email: input.email.value,
          password: input.password.value
        },
        success: async data => {
          if (!data.success) {
            login_false.innerText = `${data.message}`;
            login_false.style.display = "block";
          } else {
            await swal("Login!", "Click Ok to go!", "success", {
              button: "Let's go"
            });
            window.location.href = "http://localhost:3000/post/create-post";
          }
        },
        error: async (data) => {
          login_false.innerText = `${data.responseJSON.message}`;
          login_false.style.display = "block";
        }
      });
    }
  });
});
