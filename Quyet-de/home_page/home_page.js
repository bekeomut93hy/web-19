$(document).ready(() => {
    let idQuestion = {} ;
    getRandomQuest(idQuestion);
    console.log(idQuestion.id);
    const button = document.getElementsByTagName("button");
    for(let i=1 ; i<button.length;++i){
        button[i].addEventListener("click",()=>{
            if(button[i].value=="cauhoikhac") {
                getRandomQuest(idQuestion);
            }   
            else{
            $.ajax({
                url :`/click/?questionId=${idQuestion.id}&value=${button[i].value}`,
                type :"post",
                success : (data)=>{
                    window.location.assign(data.url);
                }
            })
            }
        })
    }
})
function getRandomQuest(idQuestion){
    $.ajax({
        url : "/get-random-question",
        type : "GET" ,
        async : false,
        success : (data)=>{
            document.getElementById("text-question").innerText = data.content;
            idQuestion.id = data._id ;
        },
        error : (error) => {
            console.log(error);
        }
    })
   
}