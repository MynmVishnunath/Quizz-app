//User interaction related functions,
let inputs=[];
let index=-1;
let Qdata={};
let Qmeta={};
let qstnNo=0;
let Q=document.querySelector("#question");
Q.addEventListener("click",()=>{
  Q.classList.remove("noquestion");
});


//trigger when add option clicked
function addoption(){
  index++;
  let optionList=document.querySelector(".option-list");
  let field=document.createElement("div");
  field.setAttribute("class","field");
  inputs[index]=document.createElement("input");
  inputs[index].setAttribute("type","text");
  inputs[index].setAttribute("placeholder",`option${inputs.length}`);
  let deletebtn=`<svg class="svg" onclick="deleteOption(${inputs.length-1})" fill="red" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" stroke="red" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 482.428 482.429" xml:space="preserve"
  ><g id="SVGRepo_bgCarrier" stroke-width="0"></g
  ><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g
  ><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path>
  <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> </g> </g> </g></svg>
  `
  optionList.appendChild(field);
  field.innerHTML=deletebtn;
  field.prepend(inputs[index]);

//set answer setting event to the input
  inputs[index].addEventListener("dblclick",(e)=>{
     let elem=e.target;//built in property of click event get the clicked element.
     //remove style from existing answer then set style to new answer.
     let elem2=document.querySelector(".answer");
     if(elem.value){
       if(elem2)
          elem2.classList.remove("answer");
     elem.classList.add("answer");
     Qdata.answer=elem.value;
      }
  });
}

//initialized with one option
addoption();

//trigger when delete button click
function deleteOption(indx){
console.log(indx);
let optionList=document.querySelector(".option-list");
optionList.removeChild(inputs[indx].parentElement);
inputs.splice(indx,1);
changeIndex();
index--;
}

//changes the index whole inputs
function changeIndex(){
  let i=0;
  let k=1;
  let input=document.querySelectorAll("input");
  let btn=document.querySelectorAll(".svg");
  input.forEach(x=>{
    x.setAttribute("placeholder",`option ${k}`);
    k++;
  });
  btn.forEach(x=>{
    x.setAttribute("onclick",`deleteOption(${i})`);
    i++;
  });
     
}


//get the question datas and save to indexedDB
async function submit(){

//Validations
  if(!Q.value){
    Q.classList.add("noquestion");
    alert("Where is the question");
    return;
  }
  if(!Qdata.answer){
    alert("You didnt set answer, Plaease set an answer by double click a option before submit");
    return;
  }
  
  while(!Qmeta.Quizid){
  let name;
  if(name=prompt("Set a name for your quizz")){
    if(!confirm("All the following questions will save under the same quizz name until refresh or close this page"))
      continue;
  let date=new Date();
  function formatnumber(number){
  return (((""+number).length)>1)?""+number:"0"+number;
  }
  Qmeta.Quizid=`${date.getFullYear()}${formatnumber(date.getMonth())}${formatnumber(date.getDate())}_${formatnumber(date.getHours())}${formatnumber(date.getMinutes())}${formatnumber(date.getSeconds())}`;
  Qmeta.Quizname=name;
  let optns={
  //weekday:"",
  month:"long",
  year:"numeric",
  day:"numeric"
  }
  Qmeta.Quizdate=date.toLocaleString(undefined,optns);
  
  await modifyQmeta(0,0,Qmeta);
  }else{
  alert("This quizz have no name")
  }
  }
  
  let input=document.querySelectorAll("input");
  alert(Qdata.answer);
  let opts=[];
  input.forEach(x=>{opts.push(x.value)});
  
  //question object
  Qdata.question=Q.value;
  Qdata.options=opts;
  Qdata.Qname="hello";
  Qdata.Qstnid=Qmeta.Quizid+qstnNo;
 
 try{
 
  let submissionStatus=await addQuizz(Qdata);
  if(submissionStatus){
     console.log("Question saved");
     //update quiz metadata in indexedDB
     qstnNo++;
     await modifyQmeta(Qmeta.Quizid,qstnNo);
     //show status on top;
     let statusBox=document.createElement("div");
     document.querySelector(".container").appendChild(statusBox);
     statusBox.classList.add("submission-status");
     statusBox.innerHTML="Success";
     setTimeout(()=>{
     document.querySelector(".container").removeChild(statusBox);
     },5000);
     //changing button
     //next button and submit button both have same class name .sub-button
     let btn=document.querySelectorAll(".sub-button");
     //toggling display property
     btn[0].classList.toggle("show-btn");
     btn[1].classList.toggle("show-btn");
     }
 }catch(err){
 let statusBox=document.createElement("div");
 document.querySelector(".container").appendChild(statusBox);
 statusBox.classList.add("submission-status");
 statusBox.style.color="red";
 statusBox.innerHTML="!Error";
 setTimeout(()=>{
  document.querySelector(".container").removeChild(statusBox);
 },5000)
  console.error("Try again");
  throw new Error(err);
 }
  
}

//trigger when click next button
function next(){
let sttus;
if(sttus=document.querySelector(".submission-status"))
  document.querySelector(".container").removeChild(document.querySelector(".submission-status"));

//next button and submit button both have same class name .sub-button
let btn=document.querySelectorAll(".sub-button");
//toggling display property
btn[0].classList.toggle("show-btn");
btn[1].classList.toggle("show-btn");

Q.value="";

//remove all previous options
document.querySelector(".option-list").innerHTML="";
inputs=[];
index=-1;
addoption();
changeIndex();
}
