$(document).ready(async () => {
  const creatbtn = document.getElementById("create-post");
  const logoutbtn = document.getElementById("logout");
  logoutbtn.addEventListener("click",()=>{
    $.ajax({
      url: "http://localhost:3000/api/auth/logout",
      type: "get",
      success:async (data) => {
        await swal("You log out!", "Click Ok to start!", "success", {
            button: "Go"
          });
      }
  })})
  creatbtn.addEventListener("click", () => {
    $.ajax({
      url: "http://localhost:3000/api/auth/test",
      type: "post",
      success:async (data) => {
        await swal("You can post!", "Click Ok to start!", "success", {
            button: "Go"
          });
      },
      error : async ()=>{
        await swal("You are not logged in !", "Click to back login page!", "error", {
            button: "Go"
          });
          window.location.href = "http://localhost:3000/auth/login";
      }
    });
  });
});
