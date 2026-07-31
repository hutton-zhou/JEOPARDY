
//start

let grid=document.querySelector(".grid");
let bar=document.querySelector(".bar");
let cover=document.querySelector(".cover");

let currPoints=0;

for(let i=200; i<=1000; i+=200){
    for(let j=0; j<6; j++){
        let element=document.createElement("div");
        element.innerHTML=i;
        element.classList.add("item");
        
        element.clicked=false;
        element.addEventListener("click",function(){
            if(!this.clicked){
                popOut(j,i);
            }
        });
        grid.appendChild(element);
    
    }
}

function freshScore(){
    studentDisplay.innerHTML=scoreStudents;
    parentDisplay.innerHTML=scoreParents;
}
//do later

//buttoning
let buttons=document.querySelectorAll(".smallb");
for(let i=0; i<4; i++){
    let button=buttons[i];
    let id=button.id;
    //add stuff
    let who=id.charAt(0);
    let which=id.charAt(1);
    button.addEventListener("click",function(){
        if(who==1){
            scoreStudents+=(which==1?1:-1)*currPoints;
        }else{
            scoreParents+=(which==1?1:-1)*currPoints;
        }
        freshScore();
    })
}

//
let topics=["Block Types","Scratch Basics","Special Numbers","Our Coaches","Real Coding","General Knowledge"];
let problems=[
    [
        ["What color are the motion blocks?","Blue"],
        ["What color are variables?","Orange"],
        ["What category of blocks are clone blocks in?","Control blocks"],
        ["Which block (operator) adds two words together?","The \"join\" block"],
        ["The two types of data blocks are value blocks and _______s", "Booleans"]
    ],
    [
        ["Who is the first sprite in every Scratch project?","The Scratch Cat"],
        ["The three sections in the Scratch work section are Code, _______s and Sounds.","Costumes"],
        ["The two types of variables are global and _____","Local"],
        ["Copying someone else's project in Scratch is called:","Remixing"],
        ["Students from which university created Scratch?","MIT"]
    ],
    [
        ["What x/y values are the middle of the screen?","(x:0,y:0)"],
        ["If a Scratch sprite is facing right, how many degrees is their direction?","90 degrees"],
        ["In video games, there are usually 60 frames per second. How many frames per second are there in Scratch?","30"],
        ["What is the maximum number of clones in Scratch?","300 clones"],
        ["How wide is the Scratch coordinate grid?","480 pixels (from -240 to 240)"]
    ],
    [
        ["What does Allan like to do before/after class? (sometimes during as well)","Play video games"],
        ["What app does Cloris and Allan play games on?","Roblox"],
        ["Which sport does Allan like most?","Hockey"],
        ["How many classes have we had in total?","9 classes"],
        ["Which day did the first class happen?","July 5th"]
    ],
    [
        ["What is a coding language beginners usually learn after Scratch?","Python"],
        ["What do you call a problem in coding, and also refers to an animal?","A bug"],
        ["The ones and zeroes in computers are known as ___s.","Bits"],
        ["Which group of comedians is Python named after?","Monty Python"],
        ["The three most popular OS's for computers are Windows, MacOS, and _____","Linux"]
    ],
    [
        ["How many states are in the USA?","50"],
        ["Which year did World War II end?","1945"],
        ["What is the capital of Australia?","Canberra"],
        ["What is the smallest country in the world?","Vatican City"],
        ["We all know that Steve Jobs founded Apple, but who founded Orange?","Hans Snook"]
    ]
]
let tempSolution;
for(let i=0; i<6; i++){
    let element=document.createElement("div");
    element.innerHTML=topics[i];
    element.classList.add("label");
    bar.appendChild(element);
}

function size(){
    cover.style.width=`${grid.offsetWidth-19}px`;
    cover.style.height=`${grid.offsetHeight+bar.offsetHeight-18}px`;
    
}
function popIn(){
    cover.style.opacity=0;
    cover.style.transform="scale(0)";
    cover.inert=true;
}
function popOut(topicN, money){
    //
    currPoints=money;
    //first get location
    let mon=(money/200)-1;
    cover.style.transformOrigin=`${topicN*20}% ${(bar.offsetHeight/cover.offsetHeight+(mon*0.25)*grid.offsetHeight/cover.offsetHeight)*100}%`;
    cover.style.opacity=1;
    cover.style.transform="scale(1)";
    cover.inert=false;
    //now add text
    cover.innerHTML="";
    let h1=document.createElement("h1");
    h1.innerHTML=`${topics[topicN]} ${money}`;
    h1.classList.add("display");
    h1.classList.add("question");
    cover.appendChild(h1);
    let question=document.createElement("p");
    question.innerHTML=problems[topicN][mon][0];
    question.classList.add("question");
    cover.appendChild(question);

    let button=document.createElement("div");
    let reveal=document.createElement("button");
    button.classList.add("question","inner");
    button.clicked=false;
    reveal.innerHTML="Reveal Answer:"
    reveal.classList.add("button");

    button.addEventListener("click",function(){
        //first create
        if(this.clicked)return;
        cover.appendChild(document.createElement("hr"));
        let answer=document.createElement("p");
        answer.classList.add("question","answer");
        answer.innerHTML=problems[topicN][mon][1];
        cover.appendChild(answer);

        requestAnimationFrame(function(){
            requestAnimationFrame(function(){
                answer.style.opacity="1";
            })
        })

        //also create another button
        let button2=document.createElement("div");
        let exit=document.createElement("button");
        button2.classList.add("question","inner");
        exit.innerHTML="Exit Question"
        exit.classList.add("button");
        exit.addEventListener("click", function(){
            //first bleep out the element
            let me=grid.children[mon*6+topicN];
            me.style.backgroundColor="grey";
            me.style.borderColor="darkslategrey";
            me.style.cursor="default";
            me.clicked=true;
        
            popIn();
            cover.innerHTML="";
        
        })
        button2.appendChild(exit);
        cover.appendChild(button2);

        this.clicked=true;
        
    })

    button.appendChild(reveal);
    cover.appendChild(button);


}

window.addEventListener("resize",size);

size();
popIn();


let scoreStudents=0;
let scoreParents=0;
let studentDisplay=document.querySelector(".students");
let parentDisplay=document.querySelector(".parents");
freshScore();