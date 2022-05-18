const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        //открытие модальных окон при нажатии
        trigger.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                let warning = document.createElement('div');
                warning.classList.add('status1');
                let warning1 = document.createElement('div');
                warning1.classList.add('status2');

                if (modalSelector == '.popup_calc_profile' && (!state.width || !state.height)) {

                    // если поля поля ширины и высоты в первом модальном незаполнены, то добавляется warning с требованием 
                    item.parentNode.appendChild(warning);
                    document.querySelector('.status1').textContent = 'Укажите форму и размеры окна';

                } else if (modalSelector == '.popup_calc_end' && (!state.type || !state.profile)) {

                    // если не выбран тип и профиль, то добавляется warning1   
                    item.parentNode.appendChild(warning1);
                    document.querySelector('.status2').textContent = 'Укажите тип и профиль остекления';
                } else {

                    windows.forEach(item => {
                        item.style.display = 'none';
                    });
                    modal.style.display = 'block';
                    //document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                    document.body.classList.add('modal-open');

                }

            });
        });

        //закрытие модальных окон при нажатии крестика
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            //document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            document.body.classList.remove('modal-open');

        });

        //закрытие окон при нажатии вне области мод окна и параметра тру
        modal.addEventListener('click', (event) => {
            if (event.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                //document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                document.body.classList.remove('modal-open');

            }
        });
    }

    // показ окна через определенное время
    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 60000);


};

export default modals;