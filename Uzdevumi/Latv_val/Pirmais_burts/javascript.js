// Define an array of picture objects, each containing a URL and a letter.
const pictures = [
  {url: "bildes2/abols.png", letter: "Ā"},
  {url: "picture2.jpg", letter: "B"},
  {url: "picture3.jpg", letter: "C"}
];
var correct = 0;

$( start );

function start(){
  correct = 0;
  $('#Ending').hide();

  // Pārkārto masīvu
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }

  // Atsevisks div katrai bildei un input vieta
  const pictureContainer = document.getElementById("picture-container");
  //pictureContainer.innerHTML = '';
  pictures.forEach(pictures => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = `Uz kuru burtu šis auglis sākas?`;
    const input = document.createElement("input");
    input.id = `${pictures.letter}_input`;
    input.type = "teksts";
    input.maxLength = 1;
    input.required = true;
    input.value = '';
    const img = document.createElement("img");
    img.src = pictures.url;
    img.alt = `Bilde ar kaut ko kas sākas uz burtu: ${pictures.letter}`;
    img.id = `${pictures.letter}`;
    img.value = `${pictures.letter}`;
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(img);
    pictureContainer.appendChild(div);
  });
};

// Funkcija, kas pārbauda vai ievadītais burts ir vienāds ar masīvā norādīto burtu.
function check(event, ui) {
  pictures.forEach(pictures => {
    var UserInput = document.getElementById( `${pictures.letter}_input` );
    var ImageInfo = document.getElementById( `${pictures.letter}` );
    console.log(UserInput.value);
    console.log(ImageInfo.value);
    input.addEventListener("focus", function() {
  input.style = 'border-radius: 20px; border: 4px solid var(--project_green); text-align: center;';
});
    if (UserInput.value.toUpperCase() == ImageInfo.value){
      correct += 1;
    };
  });
  if (correct == 3){
    const pictureContainer = document.getElementById("picture-container");
    pictureContainer.innerHTML = '';
    $('#Ending').show();
    console.log(correct);
  } else {
    alert('Pārbaudi atbildes! Kāda no tām ir kļūdaina/tukša.\nPareizas atbildes: '+correct+'/3');
    console.log(correct);
    correct = 0;
  };
};
