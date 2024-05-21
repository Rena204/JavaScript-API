document.addEventListener("DOMContentLoaded", function() {
    // Загрузка данных о занятиях
    fetch('schedule.json')
      .then(response => response.json())
      .then(data => {
        const schedule = document.getElementById('schedule');
        data.forEach(event => {
          const card = createEventCard(event);
          schedule.appendChild(card);
        });
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  
    // Функция создания карточки занятия
    function createEventCard(event) {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = event.name;
      cardBody.appendChild(title);
  
      const time = document.createElement('p');
      time.classList.add('card-text');
      time.textContent = `Время: ${event.time}`;
      cardBody.appendChild(time);
  
      const maxParticipants = document.createElement('p');
      maxParticipants.classList.add('card-text');
      maxParticipants.textContent = `Макс. участников: ${event.maxParticipants}`;
      cardBody.appendChild(maxParticipants);
  
      const currentParticipants = document.createElement('p');
      currentParticipants.classList.add('card-text');
      currentParticipants.textContent = `Записано: ${event.currentParticipants}`;
      cardBody.appendChild(currentParticipants);
  
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary', 'mr-2');
      button.textContent = 'Записаться';
      if (event.currentParticipants >= event.maxParticipants) {
        button.disabled = true;
      }
      button.addEventListener('click', function() {
        if (event.currentParticipants < event.maxParticipants) {
          event.currentParticipants++;
          currentParticipants.textContent = `Записано: ${event.currentParticipants}`;
          if (event.currentParticipants >= event.maxParticipants) {
            button.disabled = true;
          }
        }
      });
      cardBody.appendChild(button);
  
      const cancelButton = document.createElement('button');
      cancelButton.classList.add('btn', 'btn-danger');
      cancelButton.textContent = 'Отменить запись';
      cancelButton.addEventListener('click', function() {
        if (event.currentParticipants > 0) {
          event.currentParticipants--;
          currentParticipants.textContent = `Записано: ${event.currentParticipants}`;
          button.disabled = false;
        }
      });
      cardBody.appendChild(cancelButton);
  
      card.appendChild(cardBody);
      return card;
    }
  });