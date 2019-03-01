window.addEventListener("load", event => {
  let input = document.getElementById("content");
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
});
