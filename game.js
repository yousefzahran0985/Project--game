let background =document.querySelector(".control-button");
let button = document.querySelector(".control-button span");
let fronts = Array.from(document.querySelectorAll(".div2 div .front"));
let backts = Array.from(document.querySelectorAll(".div2 div .back"));
let divs = Array.from(document.querySelectorAll(".div2 > div"));

button.addEventListener("click", function() {
    background.remove();
    let p = document.querySelector(".div1 > p");
    let name = prompt("Whats your name?")
    if (name === "" || name === null){
        name = "Unknow"
    }
    p.textContent = `name: ${name}`;
    setTimeout(function(){
        divs.forEach(div => {
            div.classList.add("flipped");
        })
    },0)
    setTimeout(function(){
        divs.forEach(div => {
            div.classList.remove("flipped");
        })
    },1000)
})

let won = 0;
let lost = 0;
let line = 100;
function startgame(){
    
    line = 100;
    let level =Array.from(document.querySelectorAll(".won  h2"));
    level[0].textContent=`Won Games: ${won}`;
    level[1].textContent=`Lost Games: ${lost}`
    
    let div3 = document.querySelector(".div3");
    div3.style.setProperty("--line-left", `-${line}%`);
    
    

    let div2 = document.querySelector(".div2");
    // let divs = Array.from(div2.children);
    
    // let front = document.querySelectorAll(".div2 div .back");
    let g =0;
    console.log( divs.length)
    while (g < divs.length){
        const j = Math.floor(Math.random() * divs.length);
        [divs[g] , divs[j]] = [divs[j] , divs[g]];
        g++
    }
    divs.forEach( div=> div2.appendChild(div))
    
    divs.forEach(div => {
        div.classList.remove("flipped", "matched");
    });

    let i = [];
    let w = document.querySelector(".div1 .wrong");
    k = 0;
    
    w.textContent =`Wrong Tries : 0`;
    divs.forEach(div => {
        div.addEventListener("click", function(event){
            // event.stopPropagation(); 
            
            if (i.length < 2 && !this.classList.contains("flipped")) {
                this.classList.add("flipped");
                i.push(this);
            }
            if (i.length === 2){
                if (i[0].getAttribute("data-name") === i[1].getAttribute("data-name") ){
                    console.log("true")
                    i[0].classList.add("matched");
                    i[1].classList.add("matched");
                    i = [];
                    line -=10;
                    setTimeout(() => div3.style.setProperty("--line-left", `-${line}%`),300)
                    
                }else{
                    div3.style.setProperty("--line-left", `-${line}%`);
                    console.log("false")
                    k++;
                    setTimeout(() => {
                        w.textContent =`Wrong Tries : ${k}`;
                        i[0].classList.remove("flipped");
                        i[1].classList.remove("flipped");
                        i = [];
                        if (k === 10){
                            let play = confirm("Game Over-do you play agien? ")
                            lost++
                            if (play){
                                setTimeout(function() {
                                    startgame();
                                },300)
                            }else{
                                location.reload()
                            }
                        }
                    },500)
                }
            }
            let result =divs.every(div => div.classList.contains("matched"));
            if (result){
                won++
                let play = confirm("You Won!-do you play agien? ")
                if (play){
                    setTimeout(function() {
                        startgame();
                    },300)
                }else{
                    location.reload()
                }
            }
        });
    });
}
startgame();