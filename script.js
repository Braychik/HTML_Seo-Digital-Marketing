const menuActive = document.querySelector('.menu_active'); //находим меню
const headerMenu = document.querySelector('.burger');// находим кнопку меню

function toggleMenu(){
    menuActive.classList.toggle('hidden');//функция удаляет или устанавливает класс с названием hidden
}

headerMenu.addEventListener('click', toggleMenu); // по клику на бургер срабатывает ф-ия


const templateProduct = document.querySelector('.template__product').innerHTML;
const productData = JSON.parse(productDataJson);

class Templator {
    constructor(template) {
        this._template = template;
    }

    compile(compObj) {
        const templateVariableRe = /\{\{(.*?)\}\}/g;
        let match;
        let result = this._template;
        
        while (match = templateVariableRe.exec(this._template)) {
            const variableName = match[1].trim();
            if (!variableName) {  // Вдруг там просто пустые скобки
                continue;
            }
            const data = compObj[variableName];

            if (typeof data === 'function') {
                window[variableName] = data; // Сохранили функцию в window
                result = result.replace(new RegExp(match[0], 'gi'), `window.${variableName}()`); // Использовали
                continue // Потому что мы уже обработали функцию — идём дальше
            }

            result = result.replace(new RegExp(match[0], 'gi'), data);
        }
    
        return result;
    }
};

productData.forEach(elem => {
    document.querySelector('.secondCards').insertAdjacentHTML('beforeend', (new Templator(templateProduct)).compile({
        productId: elem.id,
        productImg: elem.img,
        productName: elem.header,
        productDescription: elem.text,
        productPrice: elem.price,
        productQuantity: elem.quantity,
    }));
});
