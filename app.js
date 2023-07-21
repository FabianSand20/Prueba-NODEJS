$(document).ready(function() {
  const $form = $('#registration-form');
  const $cardsList = $('#cards-list');

  function renderCards() {
    // Llamada al servidor para obtener las cartas registradas
    $.get('/api/cards', function(data) {
      $cardsList.empty();
      data.forEach(function(card) {
        $cardsList.append(`<li>${card.name} (${card.cardType}) - ${card.battlePoints}</li>`);
      });
    });
  }

  renderCards();

  $form.submit(function(event) {
    event.preventDefault();
    const formData = $form.serializeArray();
    const newCard = {};

    formData.forEach(function(field) {
      newCard[field.name] = field.value;
    });

    // Llamada al servidor para registrar una nueva carta
    $.post('/api/cards', newCard, function(data) {
      console.log(data);
      renderCards();
      $form.trigger('reset');
    });
  });
});
