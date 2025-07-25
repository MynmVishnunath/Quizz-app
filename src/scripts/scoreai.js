//Global variables
const scoreGuide = {
    negativePoint: 0,
    positivePoint: 1,



}

// Element selectors
const dlog = document.querySelector(".dlogBox");
const svg = document.querySelector(".svg");


const result = {
    numof_wronganswer: 0,
    numof_rightanswer: 0,
    numof_unattempt: 0,
    total_score: 0,
    get attempted() {
        return this.numof_rightanswer + this.numof_wronganswer;
    },
    get wronganswer_percent() {
        return this.numof_wronganswer / scoreGuide.max_score * 100
    },

    get rightanswer_percetn() {
        return this.numof_rightanswer / scoreGuide.max_score * 100;
    },

    get unattempt_percent() {
        return this.numof_unattempt / scoreGuide.max_score * 100;
    }

}

async function loadData() {
    scoreGuide.totalQuestions = +sessionStorage.getItem("aiq_num");
    scoreGuide.max_score = scoreGuide.positivePoint * scoreGuide.totalQuestions;
    return;


}

//collecting data from indexed Db then calculate the score then calls the function to display the score
async function calculateScore() {
    // console.log(qzid);
    await loadData();
    for (let i = 0; i < totalQuestions; i++) {
        let qstnid = i;
        let Object_Store = await open_transaction();
        let obj = await readData(Object_Store, qstnid);
        switch (obj.selectedOption) {
            case obj.answer:
                result.total_score += scoreGuide.positivePoint;
                result.numof_rightanswer++;
                break;
            case "":
                console.log("not answered");
                result.numof_unattempt++;
                break;
            case undefined:
                console.log("not answered");
                result.numof_unattempt++;
                break;

            default:
                result.numof_wronganswer++;
                result.total_score += scoreGuide.negativePoint;
                break;
        }
    }

    displayScore();
}

//Displays the pie chart and score obtained on dialogue box
function displayScore() {
    // clear card container
    dlog.showModal();
    drawCoords();
    showValues();
}

function gotoHome() {
    //window.open("../chooseQuiz.html","_self");
}

function reviewQuiz() {
    window.open("../Pages/historyai.html","_self");
}

// shows score gained in numerical values
function showValues() {
    document.querySelector("#myScore").innerHTML = `${result.total_score}/${scoreGuide.max_score}`;
    document.querySelector(".right").innerHTML = `Right Answer : ${result.numof_rightanswer}`;
    document.querySelector(".wrong").innerHTML = `Wrong Answer : ${result.numof_wronganswer}`;
    document.querySelector(".unattempt").innerHTML = `Unattempt : ${result.numof_unattempt}`;
    document.querySelector(".home").addEventListener("click", gotoHome);
    document.querySelector(".review").addEventListener("click", reviewQuiz);
    setTimeout(() => {

        document.querySelector(".container1").style.display = 'none';
    }, 2000)

}

// function to select colors for the each border of pie chart
function chooseColor(index) {
    if (index < result.rightanswer_percetn) {
        return "green";
    } else if (index < (result.rightanswer_percetn + result.wronganswer_percent)) {
        return "red";
    } else {
        return "silver";
    }

}

// Pie chart drawing function
function drawCoords() {
    const cx = 75;
    const cy = 75;
    const r = 55;
    const segments = 100;
    const unitAngle = Math.PI * 2 / segments;
    const cpDist = r * 4 / 3 * Math.tan(Math.PI / (2 * segments));
    console.log(cpDist);

    for (let i = 0; i < segments; i++) {
        //Angles (mesured in radiant)
        const angle1 = i * unitAngle;
        const angle2 = (i + 1) * unitAngle;
        //Anchor points
        const ap1 = {
            x: Math.cos(angle1) * r + cx,
            y: Math.sin(angle1) * r + cy

        };
        const ap2 = {
            x: Math.cos(angle2) * r + cx,
            y: Math.sin(angle2) * r + cy

        }

        //control points 

        const cp1 = {
            x: ap1.x - Math.sin(angle1) * cpDist,
            y: ap1.y + Math.cos(angle1) * cpDist
        }

        const cp2 = {
            x: ap2.x + Math.sin(angle2) * cpDist,
            y: ap2.y - Math.cos(angle2) * cpDist
        }

        const color = "black";
        svg.innerHTML += `<path d="M${ap1.x} ${ap1.y} C${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${ap2.x}  ${ap2.y} " stroke="${chooseColor(i)}" stroke-width="15" fill="none"/>`;


    }


}

