// // обработка JSON с помощью ассинхронного запроса,  работает по принципу "обещание"
// const url = "./data.json";

// // начинаем работать с ассинхроном
// async function fetchData(url) {
//   // пробуем получить данные, если не получим, то ловим ошибку через catch
//   try {
//     // ожидаем ответ от сервера или можем получить 404
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`ошибка - ${error}`);
//   }
// }

// const data = await fetchData(url);
// console.log(data);

const templateCart = document.querySelector('.template__cart').innerHTML;
const cartData = [];// корзина

// удаление элементов и блока на коестике
document.querySelector('body').addEventListener('click', (ev) => {
    if(ev.target.className === 'dagger'){
        ev.target.parentElement.remove();
        console.log(document.querySelectorAll('.dagger').length);
        if(document.querySelectorAll('.dagger').length === 0)// если один товар - удалить блок
            document.querySelector('.cart').remove();
    }
}) ;

// мышь над блоком товаров
document.querySelector('.secondCards').addEventListener('mouseover', (ev) => {
    if(ev.target.className == 'product__add'){// если мышь над ссылкой
        
        ev.target.onclick = () => {
            if(!document.querySelector('.cart')){// если нет блока добавляем
                const cart = document.createElement('section');
                cart.classList.add('cart');
                cart.classList.add('conteiner');
                const h2 = document.createElement('h2');
                h2.classList.add('cart__heading');
                h2.textContent = 'Cart Items';
                cart.appendChild(h2);
                document.querySelector('.first_card').after(cart);
            }

            // данные о товаре в корзину
            // cartData.push(productData[ev.target.id-1]);
            // console.log(`новая ${cartData}`);

            // по мотивам товара добавляем блок через шаблонизатор из прошлого урока
            let elem = productData[ev.target.id-1];
            console.log(productData);
            console.log(elem);
            document.querySelector('.cart').insertAdjacentHTML('beforeend', (new Templator(templateCart)).compile({
                productId: elem.id,
                productImg: elem.img,
                productName: elem.header,
                productDescription: elem.text,
                productPrice: elem.price,
                productQuantity: elem.quantity,
            }));
        }
    }

});

