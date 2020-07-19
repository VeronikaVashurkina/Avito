/*alert("сколько см у вас писька столько конфет вы отдаете нике"); //вылезет окно с тем что в кавычках модалка может не пропкскать изменений осторожно
типы переменных 
   var-везде видно
   let,const-классные и нормальные
   let number=false;
   undefined - пустое ззначение
   let symbol = Symbol('symbol');
   let bigInt = 5454n;
   const obj = {
     name:'Nika';
     age:19;
   };
   const arr = [];
   let regExp= new RegExp('w+','g');
   const foo + function(){}
   const bar = () => {};
   function newFunc(){
   }
   const error = new Error('error message');
   const date = new Date();
   const map = new Map();
   const set= new Set();
   Функции:
   function foo() {
     console.log('Function Declaration');
   }
   foo();
    
   const bar = function (){
     console.log('Function Expression');
   };
   bar();
   
   const arrow = () =>{
     console.log('Arrow Function');
   };
   arrow();
   
   const name = 'Гошка'
   
   let templateStr =`
   Привет
   ${name}
   !
   ты лох
   `;
   */
//покажет ошибки
"use strict";
//доступ к классу из html
const dataBase = JSON.parse(localStorage.getItem("avito")) || [];

let counter = dataBase.length;

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  card_click = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  modalFileBtn = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add");
//телефон
const modalPhoneNumber = document.querySelector(".numberItem");
//для фильтра
const menuContainer = document.querySelector(".menu__container");

//Для отображения на модалке объявления
const modalImageItem = document.querySelector(".modal__image-item"),
  modalHeaderItem = document.querySelector(".modal__header-item"),
  modalStatusItem = document.querySelector(".modal__status-item"),
  modalDescriptionItem = document.querySelector(".modal__description-item"),
  modalCostItem = document.querySelector(".modal__cost-item");

//Для организации поиска
const search = document.querySelector(".search__input");

//временная переменная для хранения дефорлт значения в модалке
const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

//Получить псевдо коллекцию элементов содерщихся в форме
const elementModalSubmit = [...modalSubmit.elements].filter((elem) => {
  return elem.tagName !== "BUTTON" && elem.type !== "submit";
});

//объект для хранения значений для загрузки фото
const infoPhoto = {};

//локальная хранилище дазы данных и сохранение в него
// JSON - переводит в строку любой объект
const saveBD = () => localStorage.setItem("avito", JSON.stringify(dataBase));

//перевод в массив и исключение из него объектов типа BUTTON
/*
console.log(
[...elementModalSubmit].filter((elem) => {
return elem.tagName !== "BUTTON";
})
);
*/

//console.log(elementModalSubmit);

//пишем функцию закрытия
/*
const closeModal = (event) => {
const target = event.target;

if (
target.closest(".modal__close") ||
target === modalAdd ||
target === modalItem
) {
modalAdd.classList.add("hide");
modalItem.classList.add("hide");
modalSubmit.reset();
}
};
*/

const checkForm = () => {
  //возвращает true если значение всех переменных не пустое (не null)
  const validForm = elementModalSubmit.every((elem) => elem.value);
  //отражение кнопки
  modalBtnSubmit.disabled = !validForm;
  //снятие текста предупреждения через обращение к стилям
  modalBtnWarning.style.display = validForm ? "none" : "";
};

const closeModal = (event) => {
  const target = event?.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
  /* if (target.closest(".modal__close") || target === this) {
  this.classList.add("hide");
  modalSubmit.reset();
  } else {
  if (event.keyCode === 27) {
  modalAdd.classList.add("hide");
  modalItem.classList.add("hide");
  modalSubmit.reset();
  } else {
  console.log("Вы нажали другую кнопку");
  }
  /*document.removeEventListener("keydown", closeModal);
  checkForm();
  }*/
};

const renderCard = (DB = dataBase) => {
  card_click.textContent = "";

  DB.forEach((item) => {
    //добавляем верстку в начало
    card_click.insertAdjacentHTML(
      "beforeend",
      `
<li class="card" data-id-item="${item.id}">
<img class="card__image" src="data:image/png;base64,${item.image}" alt="test"/>
<div class="card__description">
<h3 class="card__header">${item.nameItem}</h3>
<div
 
class="card__price">${item.costItem}</div>
</div>
</li>
`
    );
  });
};

search.addEventListener("input", () => {
  //считали ввод с инпута, сняли пробелы и большие буквы
  const valueSearch = search.value.trim().toLowerCase();
  console.log(valueSearch);
  if (valueSearch.length > 2) {
    const result = dataBase.filter(
      (item) =>
        item.nameItem.toLowerCase().includes(valueSearch) ||
        item.descriptionItem.toLowerCase().includes(valueSearch)
    );
    renderCard(result);
  } else {
    renderCard();
  }
});

//обработать событие
addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSubmit.disabled = "true";
  document.addEventListener("keydown", closeModal);
});

card_click.addEventListener("click", (event) => {
  const target = event.target;
  //если содержит карту
  const card = target.closest(".card");
  if (card) {
    //получаем id из html
    //первый нашел первый вернул
    const item = dataBase.find((obj) => obj.id === +card.dataset.idItem);
    console.log(item);
    console.log(dataBase);
    modalImageItem.src = `data:image/png;base64,${item.image}`;
    modalHeaderItem.textContent = item.nameItem;
    modalStatusItem.textContent = item.status === "new" ? "Новый" : "Б/У";
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    //телефон
    modalPhoneNumber.textContent = item.document.scroll;
    modalItem.classList.remove("hide");

    document.addEventListener("keydown", closeModal);
  }
});

//вызываем функцию закрытия
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

//события на ввод
modalSubmit.addEventListener("input", checkForm);

// запрет перехода по новой ссылке и добавление объекта
modalSubmit.addEventListener("submit", (event) => {
  /*блокировка стандартного браузерного поведения */
  event.preventDefault();
  const itemObj = {};

  //для каждого элемента формы
  for (const elem of elementModalSubmit) {
    //по название из верстки заполняем туда значение
    itemObj[elem.name] = elem.value;
  }
  itemObj.id = counter++;
  //создали свойство и перекинули туда все о картинке
  itemObj.image = infoPhoto.base64;
  //добавим в массив объявлений
  dataBase.push(itemObj);

  /*modalSubmit.reset();*/
  closeModal({ target: modalAdd });
  saveBD();
  renderCard();
});

modalFileInput.addEventListener("change", (event) => {
  const target = event.target;
  //для считывания
  const reader = new FileReader();
  //записываем в файл
  const file = target.files[0];
  //создаем св-ва
  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener("load", (event) => {
    if (infoPhoto.size < 300000) {
      modalFileBtn.textContent = infoPhoto.filename;
      //конвертируем картинку в строку
      infoPhoto.base64 = btoa(event.target.result);
      //отображаем загруженное фото
      modalImageAdd.src = `data:image/png;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = "Размер файла не должен превышать 300 KB";
      modalFileInput.value = "";
      checkForm();
    }
  });
});

menuContainer.addEventListener("click", (event) => {
  const target = event.target;
  //по тегу верстки
  if (target.tagName === "A") {
    const result = dataBase.filter(
      (item) => item.category === target.dataset.category
    );
    renderCard(result);
  }
});
