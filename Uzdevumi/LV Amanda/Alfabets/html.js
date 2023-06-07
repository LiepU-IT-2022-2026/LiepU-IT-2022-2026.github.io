var correct=0; //izveido jaunu mainīgo ar vērtību 0, kas pārbaudīs pareizo atbilžu skaitu
$( start ); //jau sāk spēli

function start(){ //start funkcija
  $('#Ending').hide(); //paslēpj beigu daļu
  correct = 0; //pareizo atbilžu skaits
  $('#Trukstosie').html( '' ); //trūkstošie burti - tukšs
  $('#Alfabets').html( '' ); //alfabēts ir tukšs
//izveido alfabētu kā masīvu
  const alphabet = ['a','ā','b','c','č','d','e','ē','f','g','ģ','h','i','ī','j','k','ķ','l','ļ','m','n','ņ','o','p','r','s','š','t','u','ū','v','z','ž'];
  let random_burts_array = []; //izveido tukšu masīvu, kurā būs 
  let missingLetters = []; //izveido tukšu masīvu, kurā būs trūkstošie burti
  let j = 0;
  // Izveido funkciju, kas pārkārto masīvu
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // Ģenerē nejaušu burtu indeksu (veselu skaitli)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  while(random_burts_array.length < 5){//kamēr trūkstošo burtu skaits nav 5
    rng = getRandomInt(32); //nejauši izvēlas veselu skaitli līdz *33
    if(!random_burts_array.includes(rng)){ //ja nejaušais skaitlis nav jau "paņemts" šajā funkcijā pirms tam
      random_burts_array.push(rng); //pievieno masīvam
    }
  }
  
  for (let i = 0; i < 5; i++) { //izpilda ciklu 5 reizes
    missingLetters.push(alphabet[random_burts_array[i]]); //pie missingLetters pieliek burtus no alfabēta masīva, kuriem indeksi atbilst vērtībām no random_burts_array masīva
  }
  // Ja burta indekss sakrīt ar kādu no random_burts_array indeksu, tad tas burts tiek izprintēts no otras mapes
  for(let i = 0; i<alphabet.length; i++){
    if(i == random_burts_array[0] || i == random_burts_array[1] || i == random_burts_array[2] || i == random_burts_array[3] || i == random_burts_array[4]){
      //ievieto random_burtu #Trukstosie div, kā interaktīvu objektu
      $('<div></div>').data('burts', missingLetters[j]).attr('id','card_'+missingLetters[j]).appendTo('#Trukstosie').draggable( { //izveido div elementu ar attiecīgo ID un atribūtu "burts", un ievieto to #Trukstosie elementā
        //pievieno funkcionalitāti, lai burtus varētu vilkt
        containment: '#content',
        stack: '#Trukstosie div',
        cursor: 'move',
        revert: true
      } );
      $('#card_'+missingLetters[j]).css("background-image", "url(bildes1/"+missingLetters[j]+".png)"); //iestata div elementa fona attēlu, izmantojot failu no bildes1 mapes
      $('#card_'+missingLetters[j]).css("background-size", "128px"); //pamaina attēlu izmēru
      //ievieto random_burtu #Alfabets div, kā nezināmu burtu pie pārējiem alfabēta burtiem
      $('<div></div>').data('burts', alphabet[i]).attr('id','cardd_'+alphabet[i]).appendTo('#Alfabets').droppable( { 
        accept: '#Trukstosie div',
        hoverClass: 'hovered',
        drop: check
      });
      $('#cardd_'+alphabet[i]).css("background-image", "url(bildes2/placeholder.png)");
      $('#cardd_'+alphabet[i]).css("background-size", "128px");
      j++;
    } else {
      $('<div></div>').data('burts', alphabet[i]).attr('id','cardd_'+alphabet[i]).appendTo('#Alfabets');
      $('#cardd_'+alphabet[i]).css("background-image", "url(bildes1/"+alphabet[i]+".png)");
      $('#cardd_'+alphabet[i]).css("background-size", "128px");
    }
  }
}

function check(event, ui) {
  var TrukstosieBurti = $(this).data( 'burts' ); //izveido jaunu mainīgo ar 'burts' datu atribūtu
  var alfabetaBurti = ui.draggable.data( 'burts' );  
  if (TrukstosieBurti == alfabetaBurti) {
    ui.draggable.addClass( 'correct' ); // ja burts tiek ievilkts pareizajā vietā
    ui.draggable.draggable( 'disable' ); // tad to vairs nevar izkustināt
    $(this).droppable( 'disable' ); //tajā vietā vairs neko nevar ievilkt
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } ); // burtu ieliek smuki ? (placeholder) bildes centrā
    ui.draggable.draggable( 'option', 'revert', false ); //ievilkto elementu vairs nevar nekur citur aizvilkt
    var bg = document.getElementById('cardd_'+$(this).data( 'burts' )); //atrod elementu ar 'burts' datu atribūtu
    bg.style = 'opacity: 0;'; // ? bildes redzamība ir 0%
    correct++; //plus 1 punkts par pareizu atbildi
  }
  if (correct==5){ //ja ir visi 5 trūkstošie burti ievilkti pareizajās vietās
    $('#Ending').show(); //tad parāda beigas
  }
}