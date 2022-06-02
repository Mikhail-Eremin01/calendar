class Participant{
	constructor(name, post, age, meeting) {
		this['name'] = name;
		this['post'] = post;
		this['age'] = age;
		this.meeting = meeting;	
	}
}

//  Формируем форму для ввода данных для нового участника и возвращаем её
let createForm = function(obj) {
	const myForm = document.createElement('form');
	myForm.classList.add('form-participant');
	myForm.action = 'participants';
	myForm.method = 'post';
	//Создаём контейнер для инпутов
	const inputsContainer = document.createElement('div');
	inputsContainer.className = 'container-inputs';
	myForm.prepend(inputsContainer);
	
	//Для каждого свойства типа String добавляем текстовое поле 
	for(let x in obj){
		if(typeof obj[x] == 'string'){
			const myInput = document.createElement('input');
			inputsContainer.appendChild(myInput);
			myInput.setAttribute('placeholder', `Enter your ${x}`);
			myInput.classList.add('container-inputs__input');
			myInput.id = `newPart${x}`;
			myInput.setAttribute('name', x);
		}
	}
	return myForm;
}
//  Add to form buttons for data processing
let createContainerParticipant = function(myForm){
	
	//  Create container for buttons "create" и "cancel"
	const buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'container-for-buttons';
	myForm.appendChild(buttonsContainer);
	
	//  Create title
	const titleParticipant = document.createElement('p');
	titleParticipant.className = 'form-participant__title title';
	titleParticipant.innerHTML = 'New participant';
	myForm.prepend(titleParticipant);
	
	//Create buttons and put them in container
	buttonsContainer.appendChild(createBtn('add', 'container-buttons__addParticipant', 'button'));
	buttonsContainer.appendChild(createBtn('cancel', 'container-buttons__closeForm btn-closeWindow', 'button'));
}

let formWithButton = function(obj) {
	const myForm = createForm(obj);
	createContainerParticipant(myForm);
	return myForm;
}

let addParticipant = function(selector) {
	//Создаём новый экземпляр объекта Participant и назначаем ему свойства из полей формы
	const newParticipant = new Participant('', '', '', []);
	
	const myInputs = document.querySelectorAll(selector);
	//Записываем значения полей в свойство участника
	let i = 0;
	for(let x in newParticipant){
		if(typeof newParticipant[x] == 'string'){
			newParticipant[x] = myInputs[i++].value;
			//Обнуляем значения в input
			myInputs[i - 1].value = '';
		}
	}
	return newParticipant;
}