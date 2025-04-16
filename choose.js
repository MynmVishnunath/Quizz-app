// Select Elements
const daycntnr = document.body.getElementsByClassName('daycontnr')[0];
const newqz = document.querySelector(".new-quiz");
const qzwar = document.querySelector(".quiz-war");

// Functions 
async function select(data) {
	//alert("hellook");
	await localStorage.setItem("selectedValue", '' + data);
	window.open("gamePlay.html", "_self");
}


function newquiz() {
	window.open("createQuizz.html", "_self")
}

function quizWarevent(){
	alert("This feature not currently available");
}

// Event listeners
newqz.addEventListener("click",newquiz);
qzwar.addEventListener("click",quizWarevent);

dbObj.doWith = (data) => {
	const card = document.createElement('div');
	card.className = "cardstyle";
	card.innerHTML = data.value.numOfQstns;
	card.setAttribute("onclick", `select('${data.key}')`);

	const day = document.createElement('div');
	day.className = "daystyle";
	day.innerHTML = `${data.value.Quizname}`;


	const date = document.createElement('div');
	date.className = "date";
	date.innerHTML = data.value.Quizdate;

	card.appendChild(day);
	card.appendChild(date);
	daycntnr.appendChild(card)
}
Listelems();
