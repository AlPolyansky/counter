var Super = function(){}
Super.prototype.items = 0;
Super.prototype.setItem = function(){
	return this.items = this.items + 1;
}

var Counter = function(params){

	var _self = this;
	var parent = _self.constructor.prototype;

	// Дефолтные параметры
	var _defaultParam = {
		elem: $('.counter'),
		counterStart: 10,
		counterStop: 4,
		randomMin: 2,
		randomMax: 20,
		cookie: true,
		cookieName: 'counter-' + parent.items,
		cookieLive: 15,
		direction: 'down',
	}


	// Внутренняя логика
	var
		_data = {
			value: null,
			cookie: null,
			initTimer : true,
		},
		currentParams = $.extend(_defaultParam,params);


	// Функция рандома, значения задаются в секунда
	getRadom = function randomInteger(min, max) {
		min = (min || currentParams.randomMin) * 1000;
		max = (max || currentParams.randomMax) * 1000;

    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }


  initDirection = function(){
  	
  	if(currentParams.direction === 'up'){
  		var temp = _defaultParam.counterStart;

  		_defaultParam.counterStart = params.counterStart || _defaultParam.counterStop;
			_defaultParam.counterStop = params.counterStop || temp;
			
  	}

  	if(currentParams.cookie && _checkCookie(currentParams.cookieName)){
  		_data.value = _getCookie(currentParams.cookieName);
  	}else{
  		_data.value = currentParams.counterStart;
  	}
  }


  // Запускаем рандомный интервал
	setIntervalRandom = function(cb,min,max){
		

		return (function loop(){

		var rand = getRadom(min,max);
		if(_data.initTimer){
			setTimeout(function() {
            cb();
            loop();  
    }, rand);
		}
		})()
	}

	var _setCookieLive = function(minutes){
		minutes = minutes || currentParams.cookieLive;
		var mins = minutes * 60 * 1000;
		date = new Date();
 		return date.setTime(date.getTime() + (mins));
	}

	var _checkCookie = function(cookieName){
		return !!$.cookie(cookieName) ? true : false;
	}


	var _setCookie = function(params){
		$.cookie(params.cookieName, (params.val),{ expires: params.date });
	}

	var _getCookie = function(cookieName){
		return Number($.cookie(cookieName));
	}

  this.setValue = function(val){
  	if(currentParams.cookie && _checkCookie(currentParams.cookieName)){
			_setCookie({
				cookieName: currentParams.cookieName,
				val: val,
				date: _setCookieLive(_data.cookieLive),
			})
		}else{
			_data.value = val;
		}
  	
  }

  	// Получаем текущие значени
	this.getValue = function(){
		if(currentParams.cookie && _checkCookie(currentParams.cookieName)){

			return _getCookie(currentParams.cookieName);
			
		}else{
			return _data.value;
			
		}
		
	}





	// Запускает таймер, принимает функцию, передает текущее значение первым аргументом
	this.startTimer = function(cb){
		setIntervalRandom(function(){
			var currentValue = _self.getValue();
			var calc = currentParams.direction === 'up' ? currentValue + 1 : currentValue - 1;
			var stopTimer = currentParams.direction === 'up' ? currentValue >= currentParams.counterStop : currentValue <= currentParams.counterStop;

			if(stopTimer){
				_data.initTimer = false;
			}else{
				_self.setValue(calc);
			}
			cb(currentValue);
		},currentParams.randomMin,currentParams.randomMax);
	}



	this.create = function(){
		currentParams.elem.text(_self.getValue());
		_self.startTimer(function(value){
				currentParams.elem.text(value);
		});
	}




	var _init = function init(){
		initDirection();
		parent.setItem();
		if(currentParams.cookie){
			_setCookie({
				cookieName: currentParams.cookieName,
				val: _self.getValue(),
				date: _setCookieLive(_data.cookieLive),
			})
		}
	};



	_init();

}


Counter.prototype = Object.create(Super.prototype);
Counter.prototype.constructor = Counter;




// Задачи:
// - нужно создать публичный метод получения даты
// startTimer - отдает значние, принимает коллбек для управления датойы

$(function(){
	var counter = new Counter({
		direction: 'down',
		counterStart: 900,
		counterStop: 1,
		randomMin: 0.1,
		randomMax: 0.4,
	});

	counter.create();


	var counter2 = new Counter({
		elem: $('.counter2'),
		direction: 'up',
		counterStart: 1,
		counterStop: 1000,
		randomMin: 1,
		randomMax: 4,
	});
	
})
