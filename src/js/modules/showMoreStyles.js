import {getResource} from "../services/requests";

  const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

   /* cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });
    btn.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs')
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        // btn.style.display = 'none';
        btn.remove();
    });*/

    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
            .then(res => createCards(JSON.parse(res)))
            .catch(error => showMessageError(error));

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp',  'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src}  alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                 </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    };

    function showMessageError(error) {
        let messageBlock = document.createElement('div');
        messageBlock.classList.add('animated', 'zoomIn');
        messageBlock.innerHTML = `
            <div class="styles-messageBlock">
                Произошла ошибка при загрузке данных из сервера!
            </div>
        `;

        document.querySelector(wrapper).appendChild(messageBlock);
    };
};

export default showMoreStyles;