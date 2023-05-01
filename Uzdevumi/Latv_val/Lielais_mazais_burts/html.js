var correct=0;
$( start );

function start(){
  $('#Ending').hide();
  correct = 0;
  $('#Trukstosie').html( '' );
  $('#Alfabets').html( '' );

  const alphabet = ['a','ā','b','c','č','d','e','ē','f','g','ģ','h','i','ī','j','k','ķ','l','ļ','m','n','ņ','o','p','r','s','š','t','u','ū','v','z','ž'];

  let random_burts_array = [];

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

  while(random_burts_array.length < 5){
    rng = getRandomInt(32);
    if(!random_burts_array.includes(rng)){
      random_burts_array.push(rng);
    }
  }
  burts_1 = random_burts_array[0];
  burts_2 = random_burts_array[1];
  burts_3 = random_burts_array[2];
  burts_4 = random_burts_array[3];
  burts_5 = random_burts_array[4];

  /*
  console.log(burts_1);
  console.log(burts_2);
  console.log(burts_3);
  console.log(burts_4);
  console.log(burts_5);
  */

  // (Laikam) izprintēs visus burtus pareizajās vietās
  for (let i = 0; i < 5; i++) {
    missingLetters.push(alphabet[random_burts_array[i]]);
    console.log(missingLetters[i]);
  }

  console.log(" ");

  missingLetters = shuffleArray(missingLetters);
  for (let i = 0; i< 5; i++){
    console.log(missingLetters[i]);
  }

  // Izprintē burtus no vienas mapes
  // Ja burta indekss sakrīt ar kādu no random_burta_indeksu, tad tas burts tiek izprintēts no otras mapes.

  for(let i = 0; i<alphabet.length; i++){
    // "Ir iespējams optimizēt šo koda daļu, bet man ir kinda šobrīd slinkums" -mAa4a97, 2023.04.18.
    if(i == random_burts_array[0] || i == random_burts_array[1] || i == random_burts_array[2] || i == random_burts_array[3] || i == random_burts_array[4]){
      //ievieto random_burtu #Trukstosie div, kā interaktīvu objektu.
      $('<div></div>').data('burts', alphabet[i]).attr('id','card_'+alphabet[i]).appendTo('#Trukstosie').draggable( {
        containment: '#content',
        stack: '#Trukstosie div',
        cursor: 'move',
        revert: true
      } );
      $('#card_'+alphabet[i]).css("background-image", "url(bildes1/"+alphabet[i]+".png)");
      $('#card_'+alphabet[i]).css("background-size", "128px");
      //ievieto random_burtu #Alfabets div, kā nezināmu burtu pie pārējiem alfabēta burtiem
      $('<div></div>').data('burts', alphabet[i]).attr('id','cardd_'+alphabet[i]).appendTo('#Alfabets').droppable( {
        accept: '#Trukstosie div',
        hoverClass: 'hovered',
        drop: check
      });
      $('#cardd_'+alphabet[i]).css("background-image", "url(bildes2/"+alphabet[i]+".png)");
      $('#cardd_'+alphabet[i]).css("background-size", "128px");
    }
  }
}

function check(event, ui) {
  var TrukstosieBurti = $(this).data( 'burts' );
  var alfabetaBurti = ui.draggable.data( 'burts' );  
  if (TrukstosieBurti == alfabetaBurti) {
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

















/* izprinte alfabetu
function generateAlphabet() {
	//const shuffledAlphabet = shuffleArray(alphabet);

	// nonem 5 burtus un pieliek pie trukst. burtiem
	for (let i = 0; i < 5; i++) {
		missingLetters.push(random_burts_array[i]);
    console.log(missingLetters[i]);
	}
    // ieprinte html kodaa
	for (let i = 0; i < alphabet.length; i++) {
		const letter = alphabet[i];
		let imgSrc = '.bildes1/' + letter + '.jpg';
        // piekarto trukstosos burtus 
		if (missingLetters.includes(letter)) {
			imgSrc = './bildes2/'+ letter +'.jpg';
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
    $('<div></div>').data( 'number', change[i-1] ).attr( 'id', 'card'+change[i-1] ).appendTo( '#Alfabets' ).draggable( {
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