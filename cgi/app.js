/***************************************************************************/
/************************************  All data  ***************************/
/***************************************************************************/
let meetings = [];
let participants = [];

getMeeting('meetings.json')
.then((data1) => {
	meetings = data1;
	return getMeeting('participants.json')
})
.then((data2) => {
	participants = data2;//  All participants
	console.log(meetings);
	console.log(participants);

	const meet = document.getElementById('container-meet');
	const formForParticipants = document.getElementById('container-participant');

	//  Array with meeting time
	const time = createTimeList(10, 22);//Working hours from 10 to 22

	//  Array of days of the week for meetings
	const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


	/***************************************************************************/
	/********************************  Header  *********************************/
	/***************************************************************************/

	const header = createHeader();
	document.body.prepend(header);

	/********************************  button "add Participant"  ***************/

	//  Add button "Open form for input new participant"
	const btnForNewParticipant = createBtn('New participant', 'header__btnNewPart', 'button');
	document.querySelector('.containerForBtns').appendChild(btnForNewParticipant);

	// Process the button "Open the form for entering a new participant"

	btnForNewParticipant.addEventListener('click', () => {
		formForParticipants.style.display = 'flex';
	})

	/********************************  Кнопка "add Meeting"  *******************/
	//  Добавляем кнопку "Открыть форму для новой встречи"
	const btnForNewEvent = createBtn('New event +', 'header__btnNewEvent', 'button');
	document.querySelector('.containerForBtns').appendChild(btnForNewEvent);
	//  Обрабатываем кнопку "Открыть форму для новой встречи"
	btnForNewEvent.addEventListener('click', () => {
		meet.style.display = 'flex';
	})

	/******************************************************************************/



	/***************************************************************************/
	/********************************  New meeting  ****************************/
	/***************************************************************************/

	let meeting = new NewMeeting('nameEvent', 'participants', 'day', 'time');//  Экземпляр обьекта встречи
	let allParticipants = new Participants(participants);

	//  Функция создаёт форму для ввода новой встречи
	meet.appendChild(createMeetingForm(meeting, allParticipants.getNamesOfParticipants(), time, dayOfWeek));

	//  Обрабатываем кнопку "Закрыть форму для новой встречи"
	document.querySelector('.containerForButtons__buttonCloseWindow').addEventListener('click', ()=> {
		meet.style.display = 'none';
	})
	//  Обрабатываем кнопку "Добавить новую встречу"
	document.querySelector('.containerForButtons__buttonAddMeeting').addEventListener('click', ()=> {

		//  Формируем данные для отправки
		const meetingsDataObj = {
			idnameEvent: document.getElementById('idnameEvent').value,
			idparticipants: document.getElementById('idparticipants').value,
			idtime: document.getElementById('idtime').value,//Время
			idday: document.getElementById('idday').value
		}
		
		let meetingsStr = JSON.stringify(meetingsDataObj);

		receiveData('meetings', meetingsStr, 'POST')
		.then((newMeetings) => {
			meetings = newMeetings;
			console.log(meetings);

			//  Отображаем новые данные в календарь
			const container = document.querySelector('.container-table');
			container.innerHTML = '';

			const calendar1 = showDataInTable(data, time, dayOfWeek, meetings);

			calendar1.querySelectorAll('td.table__td').forEach((e, index)=>{
				e.addEventListener('click',()=> {
					let day = dayOfWeek[index % 7];//  meeting day
					let hour = time[Math.floor(index / 7)];// meeting time
		
					console.log(`day of week: ${day}`);
					console.log(`time: ${hour}`);
		
					fixValuesInSelects(day, hour);
				});
			})

			//  Add calendar in container
			container.appendChild(calendar1);
		})
		meet.style.display = 'none';
	})

	/******************************************************************************/



	/***************************************************************************/
	/********************************  New participant  ************************/
	/***************************************************************************/

	let newP = new Participant('', '', '', []);

	// let addParticipants = new Participants(participants, meetings);

	formForParticipants.appendChild(formWithButton(newP));

	//  Обрабатываем кнопку "Закрыть форму для ввода нового сотрудника"
	document.querySelector('.container-buttons__closeForm').addEventListener('click', ()=> {
		formForParticipants.style.display = 'none';
	})

	//  Обрабатываем кнопку "Добавить нового сотрудника"
	document.querySelector('.container-buttons__addParticipant').addEventListener('click', () => {

		//Формируем данные для отправки
		const participantsDataObj = {
			name: document.getElementById('newPartname').value,
			post: document.getElementById('newPartpost').value,
			age: document.getElementById('newPartage').value
		}	

		let participantsStr = JSON.stringify(participantsDataObj);

		receiveData('participants', participantsStr, 'POST')
		.then((participantsList) => {
			participants = participantsList;
			console.log(participants);

			//  Меняем список участников в Select
			let participantsSelect = document.getElementById('idparticipants');
			participantsSelect.innerHTML = '';

			for(let i = 0; i < participants.length; i++) {
				console.log(`${participants[i].name} был добавлен`);
				console.log(participantsSelect);
				participantsSelect.innerHTML += `<option>${participants[i].name}</option>`
			}
			formForParticipants.style.display = 'none';
		});
	})


	/***************************************************************************/
	/********************************  Table  **********************************/
	/***************************************************************************/
	
	
	//  Array of cells in table
	const data = dayOfWeek.map(()=> {return '<td />'});

	/***********************/

	//  Create table
	const calendar = showDataInTable(data, time, dayOfWeek, meetings);
	//  Add calendar in container
	document.querySelector('.container-table').appendChild(calendar);

	calendar.querySelectorAll('td.table__td').forEach((e, index)=>{
		e.addEventListener('click',()=> {
			let day = dayOfWeek[index % 7];//  meeting day
			let hour = time[Math.floor(index / 7)];// meeting time

			console.log(`day of week: ${day}`);
			console.log(`time: ${hour}`);

			fixValuesInSelects(day, hour);
		});
	})

	const fixValuesInSelects = function(day, hour) {
		const mySelect = document.querySelectorAll('.form-newMeeting select');

		mySelect[1].value = hour;
		mySelect[2].value = day;
		
		meet.style.display = 'flex';
	}
})