$( start );

var a = -100;
var b = -10;
var correct = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



function start(){
  correct = 0;
  $('#Ending').hide();
  a = getRandomInt(6);
  b = getRandomInt(6);
  while((a-b) < 0){
    a = getRandomInt(11);
    b = getRandomInt(11);
  };
  console.log(a);
  console.log(b);
  console.log(a-b);
  console.log(correct);

  const skaitlisContainer = document.getElementById("Skaitlis-container");
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = a.toString()+' - '+b.toString()+' = ';
  console.log(label.textContent);
  const input = document.createElement("input");
  input.id = `userInput`;
  input.type = "number";
  input.maxLength = 1;
  input.value = '';
  input.required = true;
  div.appendChild(label);
  div.appendChild(input);
  skaitlisContainer.appendChild(div);
};

function check(event, ui) {
  starpiba = document.getElementById("userInput").value;
  console.log(starpiba);
  if (starpiba == (a-b)){
    correct++;
  };
  console.log(correct);
  
  
  if (correct == 1){
    const skaitlisContainer = document.getElementById("Skaitlis-container");
    skaitlisContainer.innerHTML = '';
    $('#Ending').show();
  }
}