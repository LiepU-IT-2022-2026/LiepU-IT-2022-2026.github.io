$('#Ending').hide();
correct = 0;
//$('#Analog').html( '' );
//$('#Digital').html( '' );
const alphabet = ['a','ā','b','c','č','d','e','ē','f','g','ģ','h','i','ī','j','k','ķ','l','ļ','m','n','ņ','o','p','r','s','š','t','u','ū','v','z','ž'];

let burts_1 = 0;
let burts_2 = 0;
let burts_3 = 0;
let burts_4 = 0;
let burts_5 = 0;

let missingLetters = [];

// Izveido funkciju, kas pārkārto masīvu
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Uzģenerē random burtu indeksu
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

while(burts_1 != burts_2 != burts_3 != burts_4 != burts_5){
  burts_1 = getRandomInt(32);
  burts_2 = getRandomInt(32);
  burts_3 = getRandomInt(32);
  burts_4 = getRandomInt(32);
  burts_5 = getRandomInt(32);
}


// izprinte alfabetu
function generateAlphabet() {
	//const shuffledAlphabet = shuffleArray(alphabet);

	// nonem 5 burtus un pieliek pie trukst. burtiem
	for (let i = 0; i < 5; i++) {
		missingLetters.push(shuffledAlphabet.pop());
	}
    // ieprinte html kodaa
	for (let i = 0; i < alphabet.length; i++) {
		const letter = alphabet[i];
		let imgSrc = letter + '.jpg';
        // piekarto trukstosos burtus 
		if (missingLetters.includes(letter)) {
			imgSrc = 'missing.jpg';
		}

		// burtam jauns div
		const div = document.createElement('div');
		div.className = 'letter';
		div.draggable = true;
		div.id = letter;
		div.addEventListener('dragstart', dragStart);

		// Create a new image element for the letter
		const img = document.createElement('img');
		img.src = imgSrc;

		// Append the image to the div and the div to the alphabet div
		div.appendChild(img);
		document.getElementById('alphabet').appendChild(div);
	}//$('#Ending').show();
}
function check( event, ui ) {
	//var AlfabetsNumber = $(this).data( 'letter' ); Jāpārskata, ko šis dara
	var TrukstosieNumber = ui.draggable.data( 'letter' );
	// Ja 5 trūkstošie burti ir ievilkti savās pareizajās pozīcijās => Spēle beidzas
	if ( TrukstosieNumber==5 ) {
	  ui.draggable.addClass( 'correct' );
	  ui.draggable.draggable( 'disable' );
	  $(this).droppable( 'disable' );
	  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
	  ui.draggable.draggable( 'option', 'revert', false );
	  correct++;
	} 
	if (correct==5){
	  $('#Ending').show();
	}
}

/*
paraugspeles kods, ko Inta bija ielikusi moodlaa:

<script type="text/javascript">

var correct=0;
$( start );

function start() {
  
  $('#Ending').hide();
  correct = 0;
  $('#Analog').html( '' );
  $('#Digital').html( '' );
 
  var numbers = [ 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  numbers.sort( function() { return Math.random() - .5 } );
var change=[];for(var k=0;k<7;k++){change[k]=numbers[k];}
change.sort( function() { return Math.random() - .5 } );
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // ieiliek <div> box katru draggable elementu. ==> Pārveidot uz random burtiem (nevajadzētu būt pārāk sarežģīti)
  for ( var i=1; i<=5; i++ ) {
    $('<div></div>').data( 'number', change[i-1] ).attr( 'id', 'card'+change[i-1] ).appendTo( '#Analog' ).draggable( {
      containment: '#content',
      stack: '#Analog div',
      cursor: 'move',
      revert: true
	
    } );
  // attēlu ievietošana 
	$('#card'+change[i-1]).css("background-image", "url(a/"+change[i-1]+".png)"); 
	if(i%2==1){document.getElementById('card'+change[i-1]).style.marginTop = "50px";}
  }
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // digital attēlu ģenerēšana, kurā ievieto attiecīgos analogos attēlus random secībā =========>
  =========> Pārveidot uz funkciju, kas ievieto burtus pareizā secībām, atstājot tukšas vietas
  trūkstošajiem burtiem //
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  for ( var i=1; i<= shufledAlphabet.length(); i++ ) {
    $('<div></div>').data( 'number', numbers[i-1] ).attr( 'id', 'cardd'+numbers[i-1] ).appendTo( '#Digital' ).droppable( {
      accept: '#Analog div',
      hoverClass: 'hovered',
      drop: check
    } );
	$('#cardd'+numbers[i-1]).css("background-image", "url(b/"+numbers[i-1]+".png)"); 
	if(i%2==1){document.getElementById('cardd'+numbers[i-1]).style.marginTop = "50px";}
  }

}

// Pārbauda, vai iepriekšējā funckijā attēls tiek ievietots pareizajā vietā
function check( event, ui ) {
  var digitalNumber = $(this).data( 'number' );
  var analogNumber = ui.draggable.data( 'number' );

  if ( digitalNumber==analogNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correct++;
  } 
  if (correct==7){
    $('#Ending').show();
  }

}

</script>

</head>
<body>

<div id="content">

  <div id="Analog"> </div>
  <div id="Digital"> </div>

  <div id="Ending">
    <button id="again" onclick="start()">Spēlēt vēlreiz</button>
  </div>

</div>


<div class="tooltip">&#8505 //infographic simbols
  <span class="tooltiptext">Tavs uzdevums ir savstarpēji savienot pareizos pulksteņu laikus.</span>
</div>

// hamburger menu overlay

<div id="myNav" class="overlay">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <div class="overlay-content">
    <a href="../index.html">Sākums</a>
    <a href="../pirmais/1uzd.html">Uzdevums #1</a>
    <a href="../otrais/2uzd.html">Uzdevums #2</a>
  </div>
</div>

<span  onclick="openNav()">&#9776;</span> // hamburger menu

<script>
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
</script>

</body>
</html>
*/