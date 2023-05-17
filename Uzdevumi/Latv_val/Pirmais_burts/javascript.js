const pictures = [
  {url: "bildes2/abols.png", letter: "Ā"},
  {url: "bildes2/Bumbiers.png", letter: "B"},
  {url: "bildes2/banans.png", letter: "B"},
  {url: "bildes2/Arbuz.png", letter: "A"},
  {url: "bildes2/Vīnoga.png", letter: "V"},
  {url: "bildes2/Zemene.png", letter: "Z"},
];

let selectedPictures = [];

function check() {
  let correct = 0;

  selectedPictures.forEach(picture => {
    const userInput = document.getElementById(`${picture.letter}_input`);
    const imageInfo = document.getElementById(`${picture.letter}`);

    if (userInput.value.toUpperCase() === imageInfo.alt.charAt(0).toUpperCase()) {
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

$(start);

function start() {
  selectedPictures = pictures.slice(0, 3);
  const pictureContainer = document.getElementById("picture-container");
  pictureContainer.innerHTML = '';

  selectedPictures.forEach(picture => {
    const div = document.createElement("div");
    div.style = 'display: flex; align-items: center; margin: 64px';

    const answerDiv = document.createElement("div");
    answerDiv.style = 'display: flex; flex-direction: column; align-items: center;';

    const input = document.createElement("input");
    input.style = 'border-radius: 20px; border: 4px solid var(--project_red); text-align: center; width: 132px; font-size: 40px;';
    input.addEventListener("blur", function() {
      input.style = 'border-radius: 20px; border: 4px solid var(--project_red); text-align: center; width: 132px; font-size: 40px;';
    });
    input.addEventListener("focus", function() {
      input.style = 'border-radius: 20px; border: 4px solid var(--project_green); text-align: center; width: 132px; font-size: 40px;';
    });
    input.id = `${picture.letter}_input`;
    input.type = "teksts";
    input.maxLength = 1;
    input.required = true;
    input.value = '';

    const img = document.createElement("img");
    img.src = picture.url;
    img.alt = `Bilde ar kaut ko kas sākas uz burtu: ${picture.letter}`;
    img.id = `${picture.letter}`;
    img.value = `${picture.letter}`;
    img.style = 'width: 384px; height: 384px;';

    answerDiv.appendChild(img);
    answerDiv.appendChild(input);

    div.appendChild(answerDiv);
    pictureContainer.appendChild(div);
    pictureContainer.style = 'display: flex; justify-content: center;';
  });
}
