// Define an array of picture objects, each containing a URL and a letter.
const pictures = [
  {url: "bildes2/abols.png", letter: "Ā"},
  {url: "bildes2/Bumbiers.png", letter: "B"},
  {url: "bildes2/banans.png", letter: "B"},
  {url: "bildes2/Arbuz.png", letter: "A"},
  {url: "bildes2/Vīnoga.png", letter: "V"},
  {url: "bildes2/Zemene.png", letter: "Z"},
];
//var correct = 0;

// Funkcija, kas pārbauda vai ievadītais burts ir vienāds ar masīvā norādīto burtu.
//$(check);
function check() {
  var correct = 0;

  pictures.forEach(picture => {
    var userInput = document.getElementById(`${picture.letter}_input`);
    if (userInput.value.toUpperCase() === picture.letter) {
      correct += 1;
    }
  });

  if (correct === 3) {
    const pictureContainer = document.getElementById("picture-container");
    pictureContainer.innerHTML = '';
    $('#Ending').show();
    console.log(correct);
  } else {
    alert('Pārbaudi atbildes! Kāda no tām ir kļūdaina/tukša.\nPareizas atbildes: ' + correct + '/3');
    console.log(correct);
  }
}

$( start );

function start(){
  const RNG_pictures = [];

  correct = 0;
  $('#Ending').hide();

  // Pārkārto masīvu
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }

  //Pievieno sākuma masīva pirmos 2 pārkārtotos elementus jaunam masīvam
  for (let i = 0; i<3; i++){
    RNG_pictures.push(pictures[i]);
  }
  console.log(RNG_pictures);
  // Atsevisks div katrai bildei un input vieta
  const pictureContainer = document.getElementById("picture-container");

  //const label = document.createElement("label");
  //label.textContent = `Uz kuru burtu šis auglis sākas?`;
  //content.appendChild(label);

  //pictureContainer.innerHTML = '';
  RNG_pictures.forEach(RNG_pictures => {
    const div = document.createElement("div");
    div.style = 'display: flex; align-items: center; margin: 64px';
    
    const answerDiv = document.createElement("div");
    answerDiv.style = 'display: flex; flex-direction: column; align-items: center;';
    //const label = document.createElement("label");
    //label.textContent = `Uz kuru burtu šis auglis sākas?`;
    const input = document.createElement("input");
    input.style = 'border-radius: 20px; border: 4px solid var(--project_red); text-align: center; width: 132px; font-size: 40px;'
    input.addEventListener("blur", function() {
      input.style = 'border-radius: 20px; border: 4px solid var(--project_red); text-align: center; width: 132px; font-size: 40px;';
    });
    input.addEventListener("focus", function() {
      input.style = 'border-radius: 20px; border: 4px solid var(--project_green); text-align: center; width: 132px; font-size: 40px;';
    });
    input.id = `${RNG_pictures.letter}_input`;
    input.type = "teksts";
    input.maxLength = 1;
    input.required = true;
    input.value = '';
    const img = document.createElement("img");
    img.src = RNG_pictures.url;
    img.alt = `Bilde ar kaut ko kas sākas uz burtu: ${RNG_pictures.letter}`;
    img.id = `${RNG_pictures.letter}`;
    img.value = `${RNG_pictures.letter}`;
    img.style = 'width: 384px; height: 384px;'
    //div.appendChild(label);
    answerDiv.appendChild(img);
    answerDiv.appendChild(input);

    div.appendChild(answerDiv);
    pictureContainer.appendChild(div);
    pictureContainer.style = 'display: flex; justify-content: center;'
  });
};


/*
function check(event, ui) {
  pictures.forEach(RNG_pictures => {
    var UserInput = document.getElementById( `${RNG_pictures.letter}_input` );
    var ImageInfo = document.getElementById( `${RNG_pictures.letter}` );
    console.log(UserInput.value);
    console.log(ImageInfo.value);
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
*/
