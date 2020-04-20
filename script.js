$(function() {

  'use strict';

  $('.md-trigger').on('click', function() {
    $(this).addClass('active');
    $('.md-modal').addClass('md-show');
  });

  $('.md-close').on('click', function() {
    $('.md-trigger').removeClass('active');
    $('.md-modal').removeClass('md-show');
  });

  $('.btn-beer').on('click', function() {
    $(this).addClass('loading');
    $('.icon-beer').toggleClass('icon-beer icon-arrows-cw');
  });

  screenSelector('welcome', 'show');

  $('.btn-play').on('click', function() {

    var difficulty = '',
        timer = 1000,
        level = $(this).attr('data-level'),
        selectedLevel = parseInt(level);

    // Game difficulty
    if(selectedLevel === 8) {
      difficulty = 'easy';
      timer *= level * 4;
    }
    else if(selectedLevel === 18) {
      difficulty = 'medium';
      timer *= level * 5;
    }
    else if(selectedLevel === 32) {
      difficulty = 'hard';
      timer *= level * 6;
    }

    screenSelector('welcome', 'hide');
    $('#card-container').addClass('on-screen' + ' ' + difficulty);

    var i,
        obj = [];

    for(i = 0; i < level; i++) {
      obj.push(i);
    }

    var mix = shuffle($.merge(obj, obj)),
        cardSize = 100/Math.sqrt(mix.length);

    for(i = 0; i < mix.length; i++) {

      var icon = mix[i];

      if(icon < 10) {
        icon = '0' + icon;
      }

      $('<div class="card" style="width:'+cardSize+'%; height:'+cardSize+'%;">' +
          '<div class="flipper">' +
            '<div class="front"></div>' +
            '<div class="back">' +
              '<i class="icon icon-' + icon + '" data-icon="' + icon + '"></i>' +
            '</div>' +
          '</div>' +
        '</div>')
      .appendTo('#card-container');
    }

    var activeClass = 'flipped',
        $cardContainer = $('#card-container'),
        $card = $('.card'),
        levelComplete = selectedLevel * 2,
        isAnimating = false;

    $card.on('click', function(e) {
      e.preventDefault();

      if(isAnimating) { return false; }

      $(this).addClass(activeClass);

      var data = $(this).find('.icon').attr('data-icon');

      if($cardContainer.find('.card.flipped').length > 1) {
        isAnimating = true;

        setTimeout(function() {
          var thisCard = $('.card.flipped .icon[data-icon='+data+']');
          if(thisCard.length > 1) {
            thisCard.parents('.card').toggleClass('found flipped');
            isAnimating = false;

            // Once all cards have been found
            if($('.card.found').length === levelComplete) {
              screenSelector('welcome', 'show');
            }

          } else {
            isAnimating = false;
            $card.removeClass('flipped');
          }
        }, 400);

      }
    });
    // End of play

    $('.play-again').on('click', function() {
      screenSelector('results', 'hide');
      screenSelector('welcome', 'show');
    });

    // Add timer
    $('<i class="timer"></i>')
    .prependTo($cardContainer)
    .css({'animation' : 'timer ' + timer + 'ms linear'})
    .one(animationEvent, function() {
      screenSelector('welcome', 'show');
    });
  });

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function screenSelector(screen, state) {
    // Start screen options
    if(screen === 'welcome') {
      if(state === 'show') {
        $('#card-container').removeClass().one(transitionEvent, function() {
          $('#card-container').empty();
        });
        if($('.welcome').hasClass('off-screen-left')) {
          $('.welcome').removeClass('off-screen-left');
        }
      } else if(state === 'hide') {
        $('.welcome').addClass('off-screen-left');
      }
    }
  }

  function whichTransitionEvent(){
    var t,
        el = document.createElement('fakeelement');

    var transitions = {
      'transition'      : 'transitionend',
      'OTransition'     : 'oTransitionEnd',
      'MozTransition'   : 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions){
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();

  function whichAnimationEvent(){
    var t,
        el = document.createElement('fakeelement');

    var animations = {
      'animation'      : 'animationend',
      'OAnimation'     : 'oAnimationEnd',
      'MozAnimation'   : 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (t in animations){
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
  var animationEvent = whichAnimationEvent();

  /**
   * Key events
   */

  $(document).keyup(function(e) {
    if(e.keyCode === 27) {
      screenSelector('welcome', 'show');
    }
  });
});