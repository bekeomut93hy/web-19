$(document).ready(() => {
 
  let player_name = document.getElementsByClassName("form-control");
  document.getElementById("letgo").addEventListener("click", event => {
    $.ajax({
      url: "/get-started",
      type: "post",
      data: {  'player1' : player_name[0].value ,  'player2' : player_name[1].value, 'player3' : player_name[2].value, 'player4' : player_name[3].value },
      success: data => {
          window.location.assign(`http://localhost:8080/games/${data.url}`);
      },
      error: data => {}
    });
  });
});
