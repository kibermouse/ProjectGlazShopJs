import checkNumInputs from './checkNumInputs';
import hiddenModalBySubmit from './modals';

const forms = (state) => {
    const formEls = document.querySelectorAll('form'),
        inputEls = document.querySelectorAll('input'),
        select = document.querySelector('#view_type'),
        tabs = document.querySelectorAll('.balcon_icons_img'),
        content = document.querySelectorAll('.big_img > img');

    checkNumInputs('input[name="user_phone"]');

    //объект с сообщениями
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    //отправка результата с ожиданием отклика от сервера
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    //выбор значения по умолчанию
    const clearInputs = () => {
        inputEls.forEach(item => {
            item.value = '';
            if (item.getAttribute('type') === 'checkbox') {
                item.checked = false;
            }
        });
        select.value = 'default';
    };

    const hideAndShowTabs = () => {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('do_image_more');
        });

        content[0].style.display = 'inline-block';
        tabs[0].classList.add('do_image_more');
    };

    const removeAddedDivs = (warn) => {
        let warning = document.querySelectorAll(warn);
        if (warning) {
            warning.forEach(item => {
                item.remove();
            });
        }
    };

    function hiddenModalBySubmit(selector) {
        document.querySelector(selector).style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    formEls.forEach(item => {
        item.addEventListener('submit', event => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    //console.log(res)
                    statusMessage.textContent = message.success;

                    // очищаем форму

                    for (let key in state) {
                        delete state[key];
                    }
                    state.form = 0;

                    //закрываем модальное окно после выполнения
                    setTimeout(() => {
                        hiddenModalBySubmit('.popup_calc_end');
                    }, 3000);
                })
                .catch(() =>
                    statusMessage.textContent = message.failure
                )
                .finally(() => {
                    clearInputs();
                    hideAndShowTabs();
                    //при любом раскладе удаляем warning warning1 messageStatus 
                    removeAddedDivs('.status1');
                    removeAddedDivs('.status2');
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;