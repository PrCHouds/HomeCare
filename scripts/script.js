$(document).ready(function () {
    let $slider = $('.slider-items');

    $slider.slick({
        centerMode: true,
        autoplay: false,
        dots: true, // Убираем точки, если они не нужны
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: 2,
        centerPadding: '0px',
        variableWidth: true, // Разрешаем разную ширину слайдов
        focusOnSelect: true, // Активный слайд выделяется при клике
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    function updateSliderVisibility() {
        const isLargeScreen = window.innerWidth > 768;

        $('.slider-item').each(function () {
            const $slide = $(this);

            // Проверяем, является ли слайд активным, предыдущим или следующим
            if (
                $slide.hasClass('slick-center') || // Активный слайд
                (isLargeScreen && $slide.prev().hasClass('slick-center')) || // Предыдущий слайд (только на больших экранах)
                (isLargeScreen && $slide.next().hasClass('slick-center')) // Следующий слайд (только на больших экранах)
            ) {
                $slide.css('display', 'block'); // Показываем слайд
            } else {
                $slide.css('display', 'none'); // Скрываем слайд
            }
        });
    }

    // Вызываем функцию при инициализации слайдера
    updateSliderVisibility();

    // Вызываем функцию после каждого переключения слайда
    $slider.on('afterChange', function () {
        updateSliderVisibility();
    });

    // Обработчики кнопок навигации
    $('#prevSlide').on('click', function () {
        $slider.slick('slickPrev');
    });

    $('#nextSlide').on('click', function () {
        $slider.slick('slickNext');
    });
});

let forms = $('.needs-validation')

const form = forms[0]; // Получаем нативный DOM-элемент формы

form.addEventListener('submit', function (event) {
    let hasError = false;
    let CheckboxStatus = $('#politics').is(':checked');

    if (!form.checkValidity() || !CheckboxStatus) {
        hasError = true;
        event.preventDefault();
        event.stopPropagation();
        if (!CheckboxStatus) {
            $('#agree-data').css("display", "block");
        }
    }

    form.classList.add('was-validated');

    if (!hasError) {
        event.preventDefault(); // предотвращаем стандартную отправку формы
        let inputNameValue = $('#userName').val();
        let inputPhoneValue = $('#userPhone').val();

        $.ajax({
            url: "https://testologia.ru/checkout ",
            method: "POST",
            data: {
                name: inputNameValue,
                phone: inputPhoneValue
            },
            success: function (msg) {
                if (msg.success === 1) {
                    alert("Error, please try again");
                } else {
                    let th = $('#good-thank');
                    th.css("display", "block")
                    $('.consultation-form').addClass('d-none');
                }
            },
            error: function (xhr, status, error) {
                console.error("Ошибка:", error);
            }
        });
    }
}, false);

const formPopup = forms[1]; // Получаем нативный DOM-элемент формы

formPopup.addEventListener('submit', function (event) {
    let hasError = false;
    let CheckboxStatus = $('#politics-popup').is(':checked');

    if (!formPopup.checkValidity() || !CheckboxStatus) {
        hasError = true;
        event.preventDefault();
        event.stopPropagation();
        if (!CheckboxStatus) {
            $('#agree-data-popup').css("display", "block");
        }
    }

    formPopup.classList.add('was-validated');

    if (!hasError) {
        event.preventDefault(); // предотвращаем стандартную отправку формы
        let inputNameValue = $('#userName-popup').val();
        let inputPhoneValue = $('#userPhone-popup').val();

        $.ajax({
            url: "https://testologia.ru/checkout ",
            method: "POST",
            data: {
                name: inputNameValue,
                phone: inputPhoneValue
            },
            success: function (msg) {
                if (msg.success === 1) {
                    let th = $('#good-thank-popup');
                    th.css("display", "block")
                    $('#popup').addClass('d-none');
                } else {
                    alert("Error, please try again");
                }
            },
            error: function (xhr, status, error) {
                console.error("Ошибка:", error);
            }
        });
    }
}, false);


$('.more-prj').on("click", () => {
    $('.more-project').css("display", "flex");
    $('.more-prj').css('display', 'none');
    $('.close').css("display", "block");
});

$('.close').on("click", () => {
    $('.more-project').css("display", "none");
    $('.more-prj').css('display', 'block');
    $('.close').css("display", "none");
});

$(document).ready(function () {
    // Обработчик клика по иконке закрытия
    $('.cancel-icon').on('click', function () {
        // Закрываем модальное окно
        $('#exampleModal').modal('hide');
    });
});


const pointers = document.querySelectorAll('.pointer-image-block');

// Добавляем обработчик клика для каждого указателя
// Инициализация первого активного элемента
document.querySelector('.technology-item.active').style.display = 'block';

pointers.forEach(pointer => {
    pointer.addEventListener('click', () => {
        const targetId = pointer.getAttribute('data-target');

        document.querySelectorAll('.technology-item').forEach(item => {
            if (item.classList.contains('active')) {
                // Плавное скрытие активного элемента
                item.style.maxHeight = item.scrollHeight + 'px'; // Фиксируем текущую высоту
                requestAnimationFrame(() => {
                    item.classList.remove('active');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Ждём завершения анимации
                });
            }
        });

        const targetItem = document.getElementById(targetId);
        if (targetItem) {
            targetItem.style.display = 'block';
            targetItem.style.maxHeight = '0';

            requestAnimationFrame(() => {
                targetItem.classList.add('active');
            });
        }
    });
});


wow = new WOW(
    {
        boxClass: 'wow',      // default
        animateClass: 'animate__animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    }
)
wow.init();