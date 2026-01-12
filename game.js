let background =document.querySelector(".control-button");
let button = document.querySelector(".control-button span");
let divs = Array.from(document.querySelectorAll(".div2 > div"));
let div2 = document.querySelector(".div2")
let hards = Array.from(document.querySelectorAll(".div2 .hard"))
let div3 = document.querySelector(".div3");
let level =Array.from(document.querySelectorAll(".won  h2"));
let w = document.querySelector(".div1 .wrong");
let easy =document.querySelector(".easy");
let hard =document.querySelector(".hard");
let won = window.localStorage.getItem("WON") || 0;
let lost = window.localStorage.getItem("LOST") || 0;
let wone = window.localStorage.getItem("WONe") || 0;
let loste = window.localStorage.getItem("LOSTe") || 0;
let Name = window.localStorage.getItem("name"); 
let Easy = false;

hard.onclick = function(){
    hard.style.display = "none";
    easy.style.display = "none";
    button.style.display = "block";
}
easy.onclick = function(){
    hard.style.display = "none";
    easy.style.display = "none";
    button.style.display = "block";
    hards.forEach((hard) => hard.style.display = "none");
    div2.style["grid-template-columns"]="repeat(4 , auto)";
    Easy = true;
}

let line=100;
let k = 10;
let slectedcreds=[];
let ispaused = false;


button.addEventListener("click", function() {
    background.remove();
    let p = document.querySelector(".div1 > p");
    if (Name){
        let name;
        name = Name;
        p.textContent = `Hello: ${name}`;
    }else{
        let name = prompt("Whats your name?")
        while (name === "" || name === null || name.includes(" ")){
            name= prompt("Whats your name?")
        }
        window.localStorage.setItem("name" , name);
        p.textContent = `Hello: ${name}`;
    }
    
    startGame();
});


function startGame(){
    setTimeout(() => {
        divs.forEach(div => div.classList.add("flipped"));
        setTimeout(() => {
            divs.forEach(div => div.classList.remove("flipped"));
        }, 1500);
    }, 500);

    line = 100;
    k=10;
    w.textContent = `Wrong Tries : ${k}`;
    let level = Array.from(document.querySelectorAll(".won h2"));
    if (Easy){
        level[0].textContent = `Won Games: ${wone}`;
        level[1].textContent = `Lost Games: ${loste}`;
    }else{
        level[0].textContent = `Won Games: ${won}`;
        level[1].textContent = `Lost Games: ${lost}`;
    }
    div3.style.setProperty("--line-left", `-${line}%`);

    divs.forEach( div => {
        const j = Math.floor(Math.random() * divs.length);
        div.style.order= j;
    } )
}

divs.forEach(div =>{
    div.addEventListener("click", function(){
        if (ispaused || this.classList.contains("flipped") || this.classList.contains("matched")) return;
        
        this.classList.add("flipped");
        slectedcreds.push(this);
        if (slectedcreds.length === 2){
            checkmatch();
        }
    });
})


function checkmatch(){
    ispaused = true;
    if (slectedcreds[0].getAttribute("data-name") === slectedcreds[1].getAttribute("data-name") ){
        slectedcreds[0].classList.add("matched");
        slectedcreds[1].classList.add("matched");
        slectedcreds = [];
        ispaused = false;
        if (Easy){
            let divses = divs.filter(div => !div.classList.contains("hard"))
            if(divses.every(div => div.classList.contains("matched"))){
                wone++
                window.localStorage.setItem("WONe",wone);
                setTimeout(() => endGame("You won!") , 500)
            }
        }
        if(divs.every(div => div.classList.contains("matched"))){
            won++
            window.localStorage.setItem("WON",won);
            setTimeout(() => endGame("You won!") , 500)
        }
    }
    else{
        k--
        w.textContent =`Wrong Tries : ${k}`;
        line -=10;
        setTimeout(() => div3.style.setProperty("--line-left", `-${line}%`),200)   
        setTimeout(()=>{
            slectedcreds[0].classList.remove("flipped");
            slectedcreds[1].classList.remove("flipped");
            slectedcreds = [];
            ispaused = false;
            if (k == 0){
                if (Easy){
                    loste++
                    window.localStorage.setItem("LOSTe",loste);
                    setTimeout(() => endGame("You lost!") , 500)
                }
                else{
                    lost++
                    window.localStorage.setItem("LOST",lost);
                    setTimeout(() => endGame("You Lost!") , 600)
                }
            }
        },500)
    }
}


function endGame(string){
    let play = confirm(`Game Over ${string} do you play agien?`);
    level[0].textContent=`Won Games: ${won}`;
    level[1].textContent=`Lost Games: ${lost}`;
    if (play){
        divs.forEach(div => {
            div.classList.remove("matched", "flipped");
        });
        startGame();
    }
    else{
        location.reload()
    }
}
