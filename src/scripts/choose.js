// Select Elements
const daycntnr = document.body.getElementsByClassName('daycontnr')[0];
const newqz = document.querySelector(".new-quiz");
const qzwar = document.querySelector(".quiz-war");
const qzai = document.querySelector(".quiz-ai");
const dltdbs = document.querySelector(".deletedbs");

// Functions 
async function select(data) {
	//alert("hellook");
	await localStorage.setItem("selectedValue", '' + data);
	window.open("Pages/gamePlay.html", "_self");
}


function newquiz() {
	window.open("Pages/createQuizz.html", "_self");
}

function quizWarevent(){
	alert("This feature not currently available");
}
function quizAIevent(){
	window.open("Pages/aiquiz.html", "_self");
}
function changeView(){
	console.log("view changed");
	document.querySelector(".daycontnr").classList.toggle("dtailed");
}

// Event listeners
newqz.addEventListener("click",newquiz);
qzwar.addEventListener("click",quizWarevent);
qzai.addEventListener("click",quizAIevent);
dltdbs.addEventListener('click',deleteDatabase)

dbObj.doWith = (data) => {
	const card = document.createElement('div');
	card.className = "cardstyle";
	card.setAttribute("onclick", `select('${data.key}')`);

	const nofQstns = document.createElement('div');
	nofQstns.className = "no-of-qstns";
	nofQstns.innerHTML = `${data.value.numOfQstns}`;

	const day = document.createElement('div');
	day.className = "daystyle";
	day.innerHTML = `${data.value.Quizname}`;


	const date = document.createElement('div');
	date.className = "date";
	date.innerHTML = data.value.Quizdate;
	
	const qzid = document.createElement('div');
	qzid.className = "qzid";
	qzid.innerHTML ="Quiz ID : " +  data.value.Quizid;
	
    card.appendChild(nofQstns);
	card.appendChild(day);
	card.appendChild(qzid);
	card.appendChild(date);
	daycntnr.prepend(card)
}
Listelems();
