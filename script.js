const menuActive = document.querySelector('.menu_active'); //находим меню
const headerMenu = document.querySelector('.burger');// находим кнопку меню

function toggleMenu(){
    menuActive.classList.toggle('hidden');//функция удаляет или устанавливает класс с названием hidden
}

headerMenu.addEventListener('click', toggleMenu); // по клику на бургер срабатывает ф-ия