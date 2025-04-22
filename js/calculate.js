let firstStep = true

document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    let currentStep = 0;
    const totalSteps = steps.length;
    const formData = {};

    // Инициализация выбора опций
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            // Удаляем класс selected у всех опций в текущем шаге
            this.parentElement.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Добавляем класс selected к выбранной опции
            this.classList.add('selected');

            // Сохраняем выбранное значение
            const stepId = this.closest('.step').id;
            formData[stepId] = this.getAttribute('data-value');
        });
    });

    // Обновление прогресса
    function updateProgress() {
        if (firstStep) {
            const progress = ((currentStep) / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% завершено`;
            firstStep = false
        } else {
            const progress = ((currentStep + 1) / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% завершено`;
        }
    }

    // Показать текущий шаг
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Обновить кнопки навигации
        if (stepIndex === 0) {
            backBtn.style.visibility = 'hidden';
            firstStep = true;
        } else {
            backBtn.style.visibility = 'visible';
        }

        if (stepIndex === totalSteps - 1) {
            nextBtn.textContent = 'Отправить';
            nextBtn.classList.add('submit-btn');
            nextBtn.classList.remove('next-btn');
        } else {
            nextBtn.textContent = 'Далее';
            nextBtn.classList.add('next-btn');
            nextBtn.classList.remove('submit-btn');
        }

        updateProgress();
    }

    // Переход к следующему шагу
    function nextStep() {
        // Проверяем, выбран ли вариант на текущем шаге
        const currentStepElement = steps[currentStep];
        const selectedOption = currentStepElement.querySelector('.option.selected');

        if (!selectedOption && currentStep !== totalSteps - 1) {
            alert('Пожалуйста, выберите один из вариантов');
            return;
        }

        if (currentStep < totalSteps - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            // Это последний шаг (форма) - отправляем данные
            submitForm();
        }
    }

    // Возврат к предыдущему шагу
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    // Отправка формы
    function submitForm() {
        // Собираем данные формы
        formData.name = document.getElementById('name').value;
        formData.email = document.getElementById('email').value;
        formData.phone = document.getElementById('phone').value;

        // Проверяем заполнение полей
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Здесь можно отправить данные на сервер
        console.log('Данные формы:', formData);

        // Показываем сообщение об успешной отправке
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');

        // Можно сбросить форму или перенаправить пользователя
        // window.location.href = 'thank-you.html';
    }

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextStep);
    backBtn.addEventListener('click', prevStep);

    // Инициализация
    showStep(0);
});
