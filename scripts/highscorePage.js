const scoreBoard = document.getElementById("scoreBoard")
const backButton = document.getElementById("backButton")
const baseUrl = window.location.href.split("/").slice(0, 3).join("/");

const getScore =  async () => {
    console.log(baseUrl);
    let data = await fetch(baseUrl + "/" + "Highscore" + "/" + "scores");
    data = await data.json();
    data = data.highscore
    data.sort((a, b) => b.score - a.score);
    data.map(x=>{
        const newListItem = document.createElement('li');
        newListItem.textContent = x.user_email + ' - ' + x.score
        scoreBoard.appendChild(newListItem);
    })
    

}

getScore();

backButton.onclick = function() {
    console.log("we in here");  
    window.location.href = baseUrl + "/Game";
  };

