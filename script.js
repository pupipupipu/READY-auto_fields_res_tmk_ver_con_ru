define(["jquery"], function ($) {
  var CustomWidget = function () {
    var self = this,
      system = self.system;
    this.callbacks = {
      settings: function () {},
      init: function () {
				let dNextToBudget; //d Рядом с бюджетом
        let buttonAfterTmk; //Создаваемая кнопка

        //Поля ТМК
        let fieldTmk = document.querySelector('[data-id="721786"]');

        //Поля подключения
        let fieldCon = document.querySelector('[data-id="720774"]');

        //Поля верификации
        let fieldVer = document.querySelector('[data-id="717132"]');

        // //Поля ответственного по лиду
        // let fieldRes = document.querySelector('.multisuggest__list-item.js-multisuggest-item[data-group="group_385678"]');

        //Сам элемент лида, в который юзер заходит
        let cardHolderElement = document.getElementById("card_holder");

        // Выводим ошибку, если элемент не найден
        if (!cardHolderElement) {
          // Элемент не найден, выводим сообщение об ошибке
          console.error('Элемент с ID "card_holder" не найден.');
        } else {
					waitForSelector(()=>{
						dNextToBudget = document.querySelector('.currency-symbol');
						dNextToBudget.style.display = "none"; // Скрываем d рядом с бюджетом
					},".currency-symbol")

          // Используем функцию для удаления кнопок с классом "widget-custom-button"
          removeButtonsWithClass("widget-custom-button");

          addButtonAndFunctional(fieldTmk);
          addButtonAndFunctional(fieldCon);
          addButtonAndFunctional(fieldVer);
        }

        //// Отслеживание изменения стилей card_holder
        // Создаем экземпляр MutationObserver с функцией обратного вызова
        let observer = new MutationObserver(function (mutationsList) {
          for (let mutation of mutationsList) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "style"
            ) {
              // Свойство style элемента было изменено
              let styleCardHolder = window.getComputedStyle(cardHolderElement);
              let displayValueCardHolder =
                styleCardHolder.getPropertyValue("display");

              // Проверяем, если display не равен 'none', то выполняем действия
              if (displayValueCardHolder !== "none") {
								waitForSelector(()=>{
									dNextToBudget = document.querySelector('.currency-symbol');
									dNextToBudget.style.display = "none"; // Скрываем d рядом с бюджетом
								},".currency-symbol")
                // Ваш код для случая, когда display отличен от 'none'
                addButtonAndFunctional(fieldTmk);
                addButtonAndFunctional(fieldCon);
                addButtonAndFunctional(fieldVer);
              }
            }
          }
        });

        // Настраиваем наблюдение для изменений атрибута style
        observer.observe(cardHolderElement, { attributes: true });
        //// Отслеживание изменения стилей card_holder

        //ID юзера
        let idUser = document.querySelector(".n-avatar.js-left-avatar").id;
        //Имя пользователя
        let nameUser = document
          .querySelector(".nav__top__userbar__userinfo__username")
          .textContent.trim();

        function removeButtonsWithClass(className) {
          // Находим все кнопки с указанным классом
          const buttons = document.querySelectorAll("." + className);

          // Проверяем, что массив кнопок не пустой
          if (buttons.length > 0) {
            // Проходимся по найденным кнопкам и удаляем их
            buttons.forEach((button) => {
              button.remove();
            });
          }
        }

        // //Поля ответственного по лиду
				// let fieldRes = document.querySelector(".linked-form__field.linked-form__field_reassign");
        // addButtonToResponsibleLead(fieldRes);

        // function addButtonToResponsibleLead(field) {
        //   buttonAfterRes = document.createElement("button");
        //   buttonAfterRes.classList.add("widget-custom-button");
        //   buttonAfterRes.textContent = "<";
        //   buttonAfterRes.type = "button";

        //   //Стили для кнопки
        //   let stylesButton = {
        //     color: "#fff",
        //     backgroundColor: "#abcaff",
        //     border: "1px solid #dbe8ff",
        //     borderRadius: "2px",
        //     marginTop: "auto",
        //     marginBottom: "auto",
        //     width: "23px",
        //     height: "32px",
        //     fontSize: "12px",
						
        //   };

        //   // Применяем стили к элементу
        //   Object.assign(buttonAfterRes.style, stylesButton);

				// 	buttonAfterRes.addEventListener("click", function () {
				// 		//Поля по которому необходимо кликнуть для открытия поиска
				// 		let frRespNameElement = field.querySelector(".multisuggest__list-item.js-multisuggest-item");
				// 		frRespNameElement.click();

				// 		//Поля для поиска менеджера ТМК или другого.
				// 		let searchListRes = document.querySelector(".multisuggest__input.js-multisuggest-input.h-suggest-failed");

				// 		//Производим поиск
				// 		const inputEvent = new Event("input", { bubbles: true });
				// 		searchListRes.value = nameUser;
				// 		searchListRes.dispatchEvent(inputEvent);

				// 		//Результаты поиска
				// 		let searchResult = document.querySelector(".multisuggest__suggest-item.js-multisuggest-item.true.multisuggest__suggest-item_selected");

				// 		//Нужный пользователь или сам пользователь
				// 		let resultUser = searchResult.querySelector(
				// 			`[data-id='${idUser}']`
				// 		);

				// 		resultUser.click();
				// 	});

        //   //Добавляем кнопку внутрь нужного элемента
        //   field.appendChild(buttonAfterRes);
        // }

        function addButtonAndFunctional(field) {
          //Ожидаем появление селектора с нужным полем
          waitForSelector(() => {
            buttonAfterTmk = document.createElement("button");
            buttonAfterTmk.classList.add("widget-custom-button");
            buttonAfterTmk.textContent = "<";
            buttonAfterTmk.type = "button";

            //Стили для кнопки
            let stylesButton = {
              color: "#fff",
              backgroundColor: "#abcaff",
              border: "1px solid #dbe8ff",
              borderRadius: "2px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "23px",
              height: "32px",
              fontSize: "12px",
            };

            // Применяем стили к элементу
            Object.assign(buttonAfterTmk.style, stylesButton);

            buttonAfterTmk.addEventListener("click", function () {
              //Поля по которому необходимо кликнуть для открытия поиска
              let frRespNameElement = field.querySelector(".fr_resp_name");
              frRespNameElement.click();

              //Поля для поиска менеджера ТМК или другого.
              let searchListTmk = document.querySelector(".tr_search");

              //Производим поиск
              const inputEvent = new Event("input", { bubbles: true });
              searchListTmk.value = nameUser;
              searchListTmk.dispatchEvent(inputEvent);

              //Результаты поиска
              let searchResult = document.querySelector(".tr_search_results");

              //Нужный пользователь или сам пользователь
              let resultUser = searchResult.querySelector(
                `[data-id='${idUser}']`
              );

              resultUser.click();
            });

            //Добавляем кнопку внутрь нужного элемента
            field.appendChild(buttonAfterTmk);
          }, '[data-id="721786"]');
        }

        /////// Ожидание появления селектора
        function waitForSelector(workFunction, selector) {
          // Передаваемый элемент
          const targetElement = document.querySelector(selector);

          if (targetElement) {
            workFunction();
          } else {
            // Создаем экземпляр MutationObserver с колбэком, который будет вызываться при изменениях
            const observer = new MutationObserver((mutationsList, observer) => {
              // Проверяем, есть ли сейчас элементы, соответствующие вашему селектору
              const targetElementNow = document.querySelector(selector);

              if (targetElementNow) {
                // Если элемент найден, останавливаем отслеживание и запускаем скрипт
                observer.disconnect();
                workFunction();
              }
            });

            // Начинаем отслеживание изменений в корне документа и его потомках
            observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
            });
          }
        }
        /////// Ожидание появления селектора

        return true;
      },
      bind_actions: function () {
        return true;
      },
      render: function () {
        return true;
      },
      contacts: {
        selected: function () {},
      },
      leads: {
        selected: function () {},
      },
      onSave: function () {
        return true;
      },
    };
    return this;
  };
  return CustomWidget;
});
