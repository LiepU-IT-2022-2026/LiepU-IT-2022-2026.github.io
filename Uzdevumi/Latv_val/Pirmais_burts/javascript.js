const pictures = [
  {url: "bildes2/abols.png", letter: "Ā"},
  {url: "bildes2/Bumbiers.png", letter: "B"},
  {url: "bildes2/banans.png", letter: "B"},
  {url: "bildes2/Arbuz.png", letter: "A"},
  {url: "bildes2/Vīnoga.png", letter: "V"},
  {url: "bildes2/Zemene.png", letter: "Z"},
];

let selectedPictures = [];

$(start);

function start() {
  var unique_img_id = 0;

  // Pārkārto masīvu
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }

  $('#Ending').hide();
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
    input.id = `${unique_img_id}_input`;
    input.type = "teksts";
    input.maxLength = 1;
    input.required = true;
    input.value = '';

    const img = document.createElement("img");
    img.src = picture.url;
    img.alt = `Bilde ar kaut ko kas sākas uz burtu: ${picture.letter}`;
    img.id = `${unique_img_id}`;
    img.value = `${picture.letter}`;
    img.style = 'width: 384px; height: 384px;';

    answerDiv.appendChild(img);
    answerDiv.appendChild(input);

    div.appendChild(answerDiv);
    pictureContainer.appendChild(div);
    pictureContainer.style = 'display: flex; justify-content: center;';

    unique_img_id++;
  });
}

function check() {
  let correct = 0;
  var unique_img_id = 0;

  selectedPictures.forEach(picture => {
    const userInput = document.getElementById(`${unique_img_id}_input`);
    const imageInfo = document.getElementById(`${unique_img_id}`);

    if (userInput.value.toUpperCase() === imageInfo.value.toUpperCase()) {
      correct += 1;
    }
    unique_img_id++;
  });

  if (correct == 3) {
    const pictureContainer = document.getElementById("picture-container");
    pictureContainer.innerHTML = '';
    $('#Ending').show();
    console.log(correct);
  } else {
    alert('Pārbaudi atbildes! Kāda no tām ir kļūdaina/tukša.\nPareizas atbildes: ' + correct + '/3');
    console.log(correct);
  }
}
