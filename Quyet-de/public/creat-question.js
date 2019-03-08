$(document).ready(() => {
  const input = document.getElementById("content");
  input.value = null;
  input.addEventListener("input", event => {
    let number = input.value.length;
    if (number > 199) {
      input.value = input.value.substring(0, 199);
      number = 200;
    }
    const remain = document.getElementById("number");
    remain.innerHTML = 200 - number + " charecter left";
  });
  document.getElementById("sendQuestion").addEventListener("click", (event) => {
    // if(input.value === "") 
    //  window.alert("vui long nhap noi dung");
    //  else 
    //event.preventDefault(); xoa event mac dinh cua element  
    $.ajax({
      type: "POST",
      url: "/create-question",
      data: {content : input.value},
      success: function (data) {
         window.location.assign(data.url);
      }
  });
  });
});
