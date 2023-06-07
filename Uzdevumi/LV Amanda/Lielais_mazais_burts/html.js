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

  let trukstosie_burti_array = [];

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

  // Izprintē visus burtus pareizajās vietās
  for (let i = 0; i < 5; i++) {
    missingLetters.push(alphabet[random_burts_array[i]]);
    console.log(missingLetters[i]);
  }

  console.log(" ");

  missingLetters = shuffleArray(missingLetters);
  for (let i = 0; i< 5; i++){
    console.log(i, missingLetters[i]);
    trukstosie_burti_array.push(missingLetters[i])
  }

  console.log(" ");

  trukstosie_burti_array = shuffleArray(trukstosie_burti_array);
  for (let i = 0; i< 5; i++){
    console.log(i, trukstosie_burti_array[i]);
  }

  console.log(" ");
  // Izprintē burtus no vienas mapes
  // Ja burta indekss sakrīt ar kādu no random_burta_indeksu, tad tas burts tiek izprintēts no otras mapes.
  for(let i = 0; i<5; i++){
      //ievieto random_burtu #Trukstosie div, kā interaktīvu objektu.
      $('<div></div>').data('burts', missingLetters[i]).attr('id','card_'+missingLetters[i]).appendTo('#Trukstosie').draggable( {
        containment: '#content',
        stack: '#Trukstosie div',
        cursor: 'move',
        revert: true
      } );
      console.log(i, missingLetters[i]);
      $('#card_'+missingLetters[i]).css("background-image", "url(bildes1/"+missingLetters[i]+".png)");
      $('#card_'+missingLetters[i]).css("background-size", "128px");
      //ievieto random_burtu #Alfabets div, kā nezināmu burtu pie pārējiem alfabēta burtiem
      $('<div></div>').data('burts', trukstosie_burti_array[i]).attr('id','cardd_'+trukstosie_burti_array[i]).appendTo('#Alfabets').droppable( {
        accept: '#Trukstosie div',
        hoverClass: 'hovered',
        drop: check
      });
      console.log(i, trukstosie_burti_array[i]);
      $('#cardd_'+trukstosie_burti_array[i]).css("background-image", "url(bildes2/"+trukstosie_burti_array[i]+".png)");
      $('#cardd_'+trukstosie_burti_array[i]).css("background-size", "128px");
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
    var bg = document.getElementById('cardd_'+$(this).data( 'burts' )); //pēc burta ievietošanas pareizajā vietā
    bg.style = 'opacity: 0;'; // ? bildes redzamība ir 0%
    correct++;
  }
  if (correct==5){
    $('#Ending').show();
  }
}