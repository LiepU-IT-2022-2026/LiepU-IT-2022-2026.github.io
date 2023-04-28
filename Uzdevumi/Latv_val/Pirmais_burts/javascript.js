$('#Ending1').hide();

// Define an array of picture objects, each containing a URL and a letter.
const pictures = [
  {url: "bildes2/abols.jpg", letter: "Ā"},
  {url: "picture2.jpg", letter: "B"},
  {url: "picture3.jpg", letter: "C"}
];

// Shuffle the array of pictures using the Fisher-Yates algorithm.
for (let i = pictures.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
}

// Atsevisks div katrai bildei un input vieta
const pictureContainer = document.getElementById("picture-container");
pictures.forEach(pictures => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = `Uz kuru burtu šis auglis sākas?`;
  const input = document.createElement("input");
  input.type = "teksts";
  input.maxLength = 1;
  input.required = true;
  const img = document.createElement("img");
  img.src = pictures.url;
  img.alt = `Bilde ar kaut ko kas sākas uz burtu: ${pictures.letter}`;
  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(img);
  pictureContainer.appendChild(div);
});

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
