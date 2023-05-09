/*
SPĒLES PLĀNS

Tiek izvadīti trīs attēli pa vidu: Nezināmais, RNG no 1 līdz 9, Nezināmais
Apakšā: Visi skaitļi no 0 līdz 10

Lieotājam jāievelk abus nezināmos skaitļus pareizajā vietā. Ja tas ir izdarīts - uzdevums ir pabeigts.
*/
var correct = 0;
$( start );

function start(){
  correct = 0;
  $('#Ending').hide();
  
  $('#Blakusskaitli').html( '' );
  $('#Skaitli').html( '' );


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };

  var rand_skaitlis = getRandomInt(9)+1;

  console.log(rand_skaitlis);



  $('<div></div>').data('skaitlis', String(rand_skaitlis-1)).attr('id','card_'+String(rand_skaitlis-1)).appendTo('#Blakusskaitli').droppable( {
    accept: '#Skaitli div',
    hoverClass: 'hovered',
    drop: check
  } );
  $('#card_'+String(rand_skaitlis-1)).css("background-image", "url(Placeholders/"+String(rand_skaitlis-1)+".png)");
  $('#card_'+String(rand_skaitlis-1)).css("background-size", "128px");

  $('<div></div>').data('skaitlis', String(rand_skaitlis)).attr('id','card_'+String(rand_skaitlis)).appendTo('#Blakusskaitli');
  $('#card_'+String(rand_skaitlis)).css("background-image", "url(Skaitli/"+String(rand_skaitlis)+".png)");
  $('#card_'+String(rand_skaitlis)).css("background-size", "128px");

  $('<div></div>').data('skaitlis', String(rand_skaitlis+1)).attr('id','card_'+String(rand_skaitlis+1)).appendTo('#Blakusskaitli').droppable( {
    accept: '#Skaitli div',
    hoverClass: 'hovered',
    drop: check
  } );
  $('#card_'+String(rand_skaitlis+1)).css("background-image", "url(Placeholders/"+String(rand_skaitlis+1)+".png)");
  $('#card_'+String(rand_skaitlis+1)).css("background-size", "128px");




  for(let i = 0; i<=10; i++){
    // "Ir iespējams optimizēt šo koda daļu, bet man ir kinda šobrīd slinkums" -mAa4a97, 2023.04.18.
    //ievieto random_burtu #Trukstosie div, kā interaktīvu objektu.
    $('<div></div>').data('skaitlis', String(i)).attr('id','cardd_'+String(i)).appendTo('#Skaitli').draggable( {
      containment: '#content',
      stack: '#Trukstosie div',
      cursor: 'move',
      revert: true
    } );
    $('#cardd_'+String(i)).css("background-image", "url(Skaitli/"+String(i)+".png)");
    $('#cardd_'+String(i)).css("background-size", "128px");
  }
};

function check(event, ui) {
  var blakusSkaitlis = $(this).data( 'skaitlis' );
  var visiSkaitli = ui.draggable.data( 'skaitlis' );  
  if (blakusSkaitlis == visiSkaitli) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correct++;
  }
  if (correct==2){
    $('#Ending').show();
  }
}