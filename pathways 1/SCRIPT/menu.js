(function () {
  let ruview = 0;
  let ru = 0;
  var root = location.protocol + '//' + location.host;

  let $divTopBar = $('#menu').css({ "z-index": 10,
    "position": "fixed", 'width': '180px',  'top': 5,
    "right": 0,});
  let $divTopRight = $('<div>', { id: 'topRight' }).css({'float': 'right', 'clear': 'both'});
  let $divMainButtonDiv = $('<div>', { id: 'mainButtonDiv' });

  let $divInnerButton = $('<div>', { id: 'innerButtonDiv' });
  $buttonMainMenu = $('<button>', { id: 'mainMenuButton' });
  $buttonMainMenu.attr('style', 'background: none !important;');
  $buttonMainMenu.css({ 'border': 'none', })
  let $imgMenu = $('<img>', {
    id: 'mainMenuImage',
  });
  $imgMenu.attr('src', '/IMAGES/menu.png');
  $imgMenu.attr('width', '40px');
  $imgMenu.attr('height', '40px');
  $imgMenu.attr('background-color', 'black')


  $buttonMainMenu.append($imgMenu);
  $divInnerButton.append($buttonMainMenu);
  $divMainButtonDiv.append($divInnerButton);

  $divTopRight.append($divMainButtonDiv);
  let $divMainMenuDiv = $('<div>', { id: 'mainMenuDiv' });
  $divMainMenuDiv.attr('style', 'background-color: rgb(0,0,0,0.5);')

  let $index = $('<span>', { id: 'index' }).text('INDEX');
  let $createTraining = $('<span>', { id: 'cTrain' }).text('CREATE TRAINING');
  let $enterOrCopyInformation = $('<span>', { id: 'ecTrain' }).text('ENTER OR COPY TRAINING');
  let $train = $('<span>', { id: 'tPage' }).text('TRAINING PAGE');

  $divMainMenuDiv.append($index).append('<br>');
  $divMainMenuDiv.append($createTraining).append('<br>');
  $divMainMenuDiv.append($enterOrCopyInformation).append('<br>');
  $divMainMenuDiv.append($train).append('<br>');

  $divTopRight.append($divMainMenuDiv);
  $divTopBar.append($divTopRight);




  let $menuDivArray = [];

  $menuDivArray[0] = $('#mainMenuDiv').toggle();
  let $menuSelectorArray = [];
  $menuSelectorArray[0] = $('#mainMenuButton');
  let toggles = [];
  toggles[0] = 0;
  toggles[1] = 0;
  let $links = [];
  $links[0] = $('#index');
  $links[1] = $('#cTrain');
  $links[2] = $('#ecTrain');
  $links[3] = $('#tPage');

  let href = [];
  href[0] = '/index.html';
  href[1] = '/createTraining.html';
  href[2] = '/createOrCopy.html';
  href[3] = '/trainingPage.html';

  function clicker(the, nu, men, togs) {
    the[nu].click(function (e) {
      e.preventDefault();
      if (togs[nu] == 0) {
        console.log('open');
        men[nu].toggle(200, 'swing').animate({ opacity: 1 }, 200);
        console.log('close');
      } else {
        men[nu].animate({ opacity: 0 }, 200).toggle(200, 'swing');
        console.log('close');
      }
    });
  }

  for (let i = 0; i < $menuSelectorArray.length; i++) {



    clicker($menuSelectorArray, i, $menuDivArray, toggles);

  }
  
  for (let i = 0; i < $links.length; i++) {
    if (typeof $links[i] != 'undefined') {



      $links[i].click(function (e) {
        window.location.replace(root + href[i]);
      });




    };

  }
}())
