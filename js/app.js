/*Wykonal Michał Piotrowski*/
var input = '';
var display_handle = document.getElementById('display');
var bin_btns = document.getElementsByName('bin_btn');
var octa_btns = document.getElementsByName('octa_btn');
var dec_btns = document.getElementsByName('dec_btn');
var hexa_btns = document.getElementsByName('hexa_btn');
var radio_buttons_from = document.getElementsByName('value_from');
var radio_buttons_to = document.getElementsByName('value_to');
var function_keys = document.getElementsByName('function_keys');

window.onload = initAll;

function initAll() {
	/*Wywolanie funkcji resetujacej kalkulator po odswiezeniu strony*/
	reset_calculator(radio_buttons_from);

	disable_keys(function_keys);

	/*Funkcja odpowiadajaca za pobieranie wartosci z przyciskow i wypisywanie na ekranie kalkulatora*/
	var input_buttons = document.getElementsByClassName('button');
	for (var i = 0;i< input_buttons.length;i++) {
		input_buttons[i].onclick = function() {
			input += this.value;
			display_handle.innerHTML = input;
			disable_keys(function_keys);
		}
	}
	/*Koniec funkcji pobierajacej*/

	/*Funkcja odpowiadajaca za zmiane systemu*/
	for (var i = 0; i<radio_buttons_from.length; i++) {
		radio_buttons_from[i].onclick = function() {
			clear_display();
			if (this.value == 2) {
				remove_disabled(bin_btns);
				add_disabled(octa_btns);
				add_disabled(dec_btns);
				add_disabled(hexa_btns);
			}
			if (this.value == 8) {
				remove_disabled(bin_btns);
				remove_disabled(octa_btns);
				add_disabled(dec_btns);
				add_disabled(hexa_btns);
			}
			if (this.value == 10) {
				remove_disabled(bin_btns);
				remove_disabled(octa_btns);
				remove_disabled(dec_btns);
				add_disabled(hexa_btns);	
			}
			if (this.value == 16) {
				remove_disabled(bin_btns);
				remove_disabled(octa_btns);
				remove_disabled(dec_btns);
				remove_disabled(hexa_btns);	
			}

		}
	}
	/*Koniec funkcji odpowiadajacej za zmiane systemu*/

	/*Wywolanie funkcji po kliknieciu, ktora czysci wyswietlacz*/
	document.getElementById('clear').onclick = clear_display;

	/* Wywolanie funkcji po kliknieciu, ktora usuwa cyfry z wyrazenia */
	document.getElementById('backspace').onclick = delete_char;

	/*Wywolanie funkcji po kliknieciu, ktora przelicza wartosci*/
	document.getElementById('send').onclick = convert;
}
/*Koniec initAll()*/




/*Funkcja resetujaca kalkulator*/
function reset_calculator(buttons1) {
	for (var i = 0; i < buttons1.length ; i++) {
		buttons1[i].checked = false;
	}

	add_disabled(bin_btns);
	add_disabled(octa_btns);
	add_disabled(dec_btns);
	add_disabled(hexa_btns);

	disable_keys(function_keys);
}

/*Funkcja aktywujaca przyciski*/
function remove_disabled(btns_name) {
	for (var i = 0; i < btns_name.length; i++) {
		btns_name[i].removeAttribute('disabled');
		btns_name[i].style.background = '#a593e0';
		btns_name[i].style.cursor = 'pointer';
	}
}

/*Funkcja dezaktywujaca przyciski*/
function add_disabled(btns_name) {
	for (var i = 0; i < btns_name.length; i++) {
		btns_name[i].setAttribute('disabled', 'disabled');
		btns_name[i].style.background = '#544b74';
		btns_name[i].style.cursor = 'default';
	}
}

/*Funkcja czyszczaca wyswietlacz kalkulatora*/
function clear_display() {
	input='';
	display_handle.innerHTML = input;
	disable_keys(function_keys);
}

/*Funkcja usuwajaca cyfry z wyrazenia*/
function delete_char() {
	if (input.length > 0) {
		input = input.slice(0, input.length-1);
		display_handle.innerHTML = input;
	} else {
		disable_keys(function_keys);
	}
}

/*Funkcja przeliczajaca*/
function convert() {
	var convert_from = check_value(radio_buttons_from);
	var convert_to = check_value(radio_buttons_to);
	

	display_handle.innerHTML = change_system(convert_from, convert_to);
	input = '';
	disable_keys(function_keys);
}

/*Funkcja sprawdza, ktory radio button jest zaznaczony i zwraca jego wartosc*/
function check_value(btns) {
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].checked == true) {
			return parseInt(btns[i].value);
			break;
		}
	}
} 

function change_system(system_from, system_to) {
	var val_1 = parseInt(input, system_from);
	if(system_to == 10) {
		return val_1;
	} else {
		return (val_1).toString(system_to);
	}
}

function disable_keys(keys) {
	if (!input) {
		add_disabled(keys);
	} else {
		remove_disabled(keys);
	}
}