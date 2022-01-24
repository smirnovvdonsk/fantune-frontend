# fantune-frontend
Custom fans. Frontend.

Deployed at http://31.134.181.226:58000.

Sorry. Only Russian language yet. Maybe later.

Sorry. The backend is proprietary yet. Maybe later.

# Возможности
* Подбирает кастомный оптимальный вентилятор под ваши параметры.
* Даёт аэродинамическую характеристику в графическом виде и рабочую точку.
* Даёт габаритные размеры в виде эскиза.
* Даёт шумовую характеристику в табличном виде.
* Даёт возможность добавить шумоглушители и шумоизоляцию и увидеть результат до и после.

# Использование

Рабочий сайт размещён на http://31.134.181.226:58000. Попробуйте.

## Подбор
<img src="./docs/img/selectionCard.png" alt="Подбор" height="250"/>

Если навести мышь на какое-либо поле ввода (или на сенсорных устройствах - поставить туда курсор), то появится подсказка с наименованием параметра.

В карточке ```Подбор``` введите требуемые вам параметры вентилятора:
* частоту вращения *n* рабочего колеса
* температуру *t* перемещаемого воздуха[^AirOnly]
* производительность по воздуху *Q*
* полное давление *P<sub>v</sub>*
* опцию двустороннего всаса

[^AirOnly]: В качестве перемещаемой среды приложение считает только воздух. Возможность считать другие среды пока не реализована. Однако вы всё же можете посчитать любую среду, если знаете её плотность. Просто подберите температуру так, чтобы в карточке подбора отобразилась нужная вам плотность *ρ*.

Если заказчик задал плотность, то вы можете проверить, правильно ли он её посчитал, глядя на параметр *ρ*.

Пользуйтесь кнопками ```+``` и ```-``` возле полей ввода значений, если вам нужно понемногу изменять значение параметра. Эти кнопки будут изменять ваше число в соответствии с рядом R160 по стандарту ISO 3.

На основании введённых вами данных приложение считает параметр быстроходности *n<sub>y</sub>*. Это базовый параметр для всего расчёта. В зависимости от его значения выбирается конкретная *аэродинамическая схема*. Если же значение быстроходности *n<sub>y</sub>* выходит за установленный диапазон, то приложение выдаст явный отказ от расчёта и предложит способы вернуть значение быстроходности в требуемый диапазон.

> *Аэродинамическая схема* или просто *схема* - конкретная геометрия вентилятора и соответствующие конкретные числовые характеристики. Причём геометрия и характеристики выражены в безразмерных величинах. В рамках одной схемы конкретные вентиляторы отличаются друг от друга простым масштабированием размеров.

При включённой опции *Двусторонний всас* допустимый диапазон быстроходности отличается в большую сторону от обычного одностороннего режима. Если ваш запрос даёт слюшком большую быстроходность, попробуйте двусторонний вариант.

## Подобранный вентилятор

![Результат](./docs/img/resultCard.svg)

В карточке ```Подобранный вентилятор``` мы наблюдаем общие характеристики и габаритный эскиз оптимального под ваш запрос вентилятора.

Если вам не ясно буквенное обозначение какой-либо величины, то наведите на неё курсор мыши (или на сенсорных устройствах - коснитесь её пальцем) и получите подсказку с наименованием величины.

Если нужно сохранить картинку габаритного эскиза, то кликните по ней правой кнопкой мыши (или на сенсорных устройствах - долгое прикосновение пальцем) и сохраните файл для последующей вставки в ваши документы.



## Аэродинамическая характеристика

![Аэродинамическая характеристика](./docs/img/graphCard.svg)

Если нужно сохранить картинку графика, то кликните по нему правой кнопкой мыши (или на сенсорных устройствах - долгое прикосновение пальцем) и сохраните файл для последующей вставки в ваши документы.

## Шумовая характеристика

![Шумовая характеристика](./docs/img/noiseCard.svg)
