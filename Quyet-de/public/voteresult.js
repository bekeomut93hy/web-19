$(document).ready(() => {
  const pathname = window.location.pathname;
  const questionId = pathname.split("/")[pathname.split("/").length - 1];
  $.ajax({
      url : `/get-question-by-id?questionId=${questionId}`,
      type: "GET",
      success: (data) =>{
          if (data.id !== null){
              document.getElementById('question-content').innerText = data.content;
              document.getElementById("total-votes").innerText = data.yes + data.no;
              let yesPercent = (data.yes / (data.no + data.yes))*100;
              let noPercent = 100 - yesPercent;
              if(data.no == data.yes) {yesPercent = 50; noPercent =50;}
              document.getElementById("yes-percent").innerText = `${yesPercent.toFixed(2)}%`;
              document.getElementById("yes-percent").style.width = `${yesPercent.toFixed(2)}%`;
              document.getElementById("no-percent").innerText = `${noPercent.toFixed(2)}%`;
              document.getElementById("no-percent").style.width = `${noPercent.toFixed(2)}%`;
          }
          else document.getElementById('question-content').innerText = "Question not found";

      },
      error : (error) => {
          console.log(error);
      },
  });
});
