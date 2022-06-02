class NewMeeting{
	constructor(nameEvent, participants, day, time) {
		this.nameEvent = nameEvent;
		this.participants = participants;
		this.time = time;
		this.day = day;
	}
	addNewMeeting() {
		return this;
	}
}

/**********Функция создаёт форму для ввода новой встречи**********************/
/*****************************************************************************/

const createMeetingForm = function(obj, names, time, dayOfWeek){
	//  Obj - обьект определяет элементы формы, имена свойств обьекта определяют ID элементы 
	// names, time, dayOfWeek
	//  Подготовим массив ID
	const arrId = [];
	
	for(let x in obj){
		arrId.push('id'+ obj[x]);
	}
	const meetingsForm = document.createElement('form');
	meetingsForm.className = 'form-newMeeting';
	meetingsForm.action = 'meetings';
	meetingsForm.method = 'post';
	
	const newMeeting__title = document.createElement('p');
	newMeeting__title.innerHTML = 'New meeting';
	newMeeting__title.className = 'form-newMeeting__title title';
	meetingsForm.appendChild(newMeeting__title);

	const containerToInput = document.createElement('div');
	meetingsForm.appendChild(containerToInput);
	
	const titleToInput = document.createElement('p');
	titleToInput.className = 'meetings-parameter__name';

	titleToInput.innerHTML = 'Name of the event:';
	containerToInput.appendChild(titleToInput);
	containerToInput.className = 'meetings-parameter';
	
	const myInput = document.createElement('input');
	myInput.className = 'meetings-parameter__meetings-name';
	myInput.id = arrId[0];
	myInput.name = arrId[0];
	myInput.setAttribute('placeholder', 'Название встречи');
	containerToInput.appendChild(myInput);
	
	for(let i = 1; i < arrId.length; i++){
		const containerToSelects = document.createElement('div');
		containerToSelects.className = 'meetings-parameter';
		meetingsForm.appendChild(containerToSelects);
		
		const titleToSelects = document.createElement('p');
		titleToSelects.className = 'meetings-parameter__name';
		titleToSelects.innerHTML = arrId[i].substr(2) + ':';
		
		containerToSelects.appendChild(titleToSelects);
		
		const mySelect = createSelectFromArray(arguments[i]);
		mySelect.className = 'meetings-parameter__select';
		containerToSelects.appendChild(mySelect);
		mySelect.setAttribute('id', arrId[i]);
		mySelect.setAttribute('name', arrId[i]);
	}

	//  Добавляем кнопки "add new meeting" и "cancel meeting" в containerForButtons
	const containerForBtns = document.createElement('div');
	containerForBtns.className = 'container-for-buttons';
	meetingsForm.appendChild(containerForBtns);

	containerForBtns.appendChild(createBtn('Create', 'containerForButtons__buttonAddMeeting', 'button'));
	containerForBtns.appendChild(createBtn('Cancel', 'containerForButtons__buttonCloseWindow btn-closeWindow', 'button'));
	return meetingsForm;
}