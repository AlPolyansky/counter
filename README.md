Простой Jquery счетчик!
===================


Умеет прибавлять и убавлять число, может хранить значение в куки.
----------


Documents
-------------

1) Склонировать репозиторий
2) Скрипт находится в файле counter.js.
3) Подключить скрипт на страницу или скопировать код к себе.
4) Создать html блок с классом .counter
5) Вызвать счетчик

```
var counter = new Counter();
counter.create();

```
6) Счетчик принимает объект с параметрами

```
var counter = new Counter({
	elem: $('.counter2'),         //#default: $('.counter')
	direction: 'up',              //#default: down
	counterStart: 900,            //#default: 10
	counterStop: 1,               //#default: 4
	randomMin: 0.1,               //#default: 2
	randomMax: 0.4,               //#default: 20
	cookie: false,                //#default: true
	cookieName: 'MyCookieName',   //#default: 'counter-' + itter
	cookieLive: 10,               //#default: 15
});

```

#### <i class="icon-file"></i> Опции


> **Note:**

> - 

#### <i class="icon-file"></i> Методы
> **Note:**

> -  create() - создает таймер
> - startTimer(cb) - запускает счетчик, принимает функцию, первый аргумент которой будет текущие значение счетчика
