const board = document.querySelector(".board");
const turn = document.querySelector(".turn");
const boxes = document.querySelectorAll(".big-box");
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const current = document.querySelector(".current");

player = "X"
gameOver = false

function unlockBox(){
    for(i = 0; i < boxes.length; i++){
        boxes[i].style.pointerEvents = "all";
        boxes[i].style.backgroundColor = "#FFFFFF"
    }
}
function lockBox(boxNum){
    if (boxes[boxNum].childElementCount < 2) {
        unlockBox()
    }
    else {
        for(i = 0; i < boxes.length; i++){
            if( i != boxNum){
                boxes[i].style.pointerEvents = "none";
                boxes[i].style.backgroundColor = "#A1D2FF"
            }
        }
    }
}


function BoxClick(event) {
    
    if(event.target.className != "disabled"){
        unlockBox()

        lockBox(parseInt(event.target.id))
        if(player == "X"){
            event.target.src = "X.svg";
            event.target.id = "X";
            player = "O";
        }
        else  {
            event.target.src = "O.svg";
            event.target.id = "O";
            player = "X";
        }
        event.target.className = "disabled";
        turn.innerHTML = player;
    }

    GameCheck(event.target)
}


boxes.forEach(element => {
    for(i = 0; i < 9; i++){
        box = document.createElement("img")
        box.src = "none.svg";
        box.id = i;

        box.onclick = BoxClick
        element.appendChild(box);
    }
});

function boxWin(winner){
    daddy =  winner.parentElement;
    unlockBox();
    daddy.id = winner.id;

    if (winner.src){
        daddy.innerHTML = '<img src="'+ winner.src +'" id="big">';
    }
    else {
        daddy.innerHTML = winner.innerHTML;
        title.innerHTML = "THE WINNER";
        subtitle.innerHTML = "IS"
        current.innerHTML = ""
        current.onclick = window.location.reload;
        gameOver = true
    }
    
    GameCheck(daddy);
}

function GameCheck(element){
    boxer = element.parentElement.children;
    if (!gameOver){
        //horizontal
        if(boxer[0].id == boxer[1].id && boxer[1].id == boxer[2].id){
            boxWin(boxer[1]);
        }
        else if(boxer[3].id == boxer[4].id && boxer[4].id == boxer[5].id){
            boxWin(boxer[3]);
        }
        else if(boxer[6].id == boxer[7].id && boxer[7].id == boxer[8].id){
            boxWin(boxer[6]);
        }

        //vertical
        else if(boxer[0].id == boxer[3].id && boxer[3].id == boxer[6].id){
            boxWin(boxer[0]);
        }

        else if(boxer[1].id == boxer[4].id && boxer[4].id == boxer[7].id){
            boxWin(boxer[1]);
        }

        else if(boxer[2].id == boxer[5].id && boxer[5].id == boxer[8].id){
            boxWin(boxer[2]);
        }

        //diagonal

        else if(boxer[0].id == boxer[4].id && boxer[4].id == boxer[8].id){
            boxWin(boxer[0]);
        }

        else if(boxer[2].id == boxer[4].id && boxer[4].id == boxer[6].id){
            boxWin(boxer[2]);
        }
    }



}



