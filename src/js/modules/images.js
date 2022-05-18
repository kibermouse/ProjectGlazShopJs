const images = () => {

    const imgPopup = document.createElement('div'),
        //ищем область с фото
        workSection = document.querySelector('.works'),
        //создаем элемет img
        bigImage = document.createElement('img');

    //добавляем диву класс модального окна
    imgPopup.classList.add('popup');
    //добавляем его области с фото
    workSection.appendChild(imgPopup);

    //добавляе ему стилей
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    //добавляем ему элемент фото
    imgPopup.appendChild(bigImage);


    workSection.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if (target.closest('.preview')) {
            /*если кликнули на фото: дисплей флекс, получаем путь скрытый в 
            ссылке, добавляем путь нашему фото
            */
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.classList.add('modal-open');
        }

        if (target && target.matches('div.popup')) {
            //прячем наш див
            imgPopup.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    })
};

export default images;