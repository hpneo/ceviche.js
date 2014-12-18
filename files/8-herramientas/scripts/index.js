var container = $('#background'),
    contactForm = $('#contact-form'),
    contactName = $('#contacto_nombre'),
    contactMessage = $('#contacto_mensaje');

contactForm.on('submit', function(e) {
  e.preventDefault();

  window.localStorage.setItem('contact-form', contactMessage.val());

  var xhr = $.post('http://coffeemaker.herokuapp.com/form', contactForm);

  xhr.then(function() {
    alert('¡Gracias por contactarnos!');
  });

  xhr.then(function() {
    contactMessage.val('');
    contactName.val('');
    window.localStorage.removeItem('contact-form');
  });
});

container.on('transitionend', '.slide.current', function(e) {
  var current = $(e.target),
      next = current.next();

  current.removeClass('current');

  if (current.is(':last-child')) {
    next = current.siblings().first();
  }

  next.addClass('current');
});

$(window).on('hashchange load', function(e) {
  $('.panel.current').removeClass('current');

  if (location.hash !== '') {
    $('.panel' + location.hash).addClass('current');
  }
});

$(document).ready(function() {
  var current = $('.slide.current'),
      next = current.next();

  current.removeClass('current');
  next.addClass('current');

  $('#contacto_mensaje').val(window.localStorage.getItem('contact-form'));
});