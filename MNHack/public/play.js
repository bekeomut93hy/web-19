$(document).ready(() => {
    const pathname = window.location.pathname;
    const Id = pathname.split("/")[pathname.split("/").length - 1];
    document.getElementsByClassName("round_number").innerText= '1';
    $.ajax({
        url : `/get-player/${Id}`,
        type : "get",
        success : data=>{
            document.getElementById('player1').innerText = data.player1;
            document.getElementById('player2').innerText = data.player2;
            document.getElementById('player3').innerText = data.player3;
            document.getElementById('player4').innerText = data.player4;
            document.getElementById('total1').innerText = data.playertotal1;
            document.getElementById('total2').innerText = data.playertotal2;
            document.getElementById('total3').innerText = data.playertotal3;
            document.getElementById('total4').innerText = data.playertotal4;
        }
    })
    document.getElementById("letgo").addEventListener("click", event => {
        let player_score = document.getElementsByClassName("form-control");
        let index = player_score.length;
        $.ajax({
          url: `/get-score/${Id}`,
          type: "post",
          data: {  'score1' : player_score[index-4].value ,  'score2' : player_score[index -3 ].value, 'score3' : player_score[index -2].value, 'score4' : player_score[index-1].value },
          success: data => {
             document.getElementById('total1').innerText = data.total1;
             document.getElementById('total2').innerText = data.total2;
             document.getElementById('total3').innerText = data.total3;
             document.getElementById('total4').innerText = data.total4;
             document.getElementById('sumtotal').innerText = data.total1 + data.total2 + data.total3 + data.total4
             $("#score-round").append(`
             <div class="row bg-light">
        <div class="col-4"><h4>Round ${index/4 + 1}</h4></div>
        <div class="col-2">
          <input
            class="form-control"
            rows="1"
       
            name="score"
          ></input> 
        </div>
        <div class="col-2">
          <input
            class="form-control"
            rows="1"
    
            name="score"
          ></input>
        </div>
        <div class="col-2">
          <input
            class="form-control"
            rows="1"

            name="score"
          ></input>
        </div>
        <div class="col-2">
          <input
            class="form-control"
            rows="1"
            name="score"
          ></input>
        </div>
      </div>
             `)
          },
          error: data => {}
        });
      });
})