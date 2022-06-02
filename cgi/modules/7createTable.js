///////////////////    **********Создаём основную таблицу    **********///////////////////

//  Функция создаёт массив времени встреч от start до finish
function createTimeList(start, finish) {
	const time = [];
	for(let i = start; i <= finish; i++) {
		time.push(i + ':00');
	}
	return time;
}

/**************************************************************************/

function showDataInTable(data, time, dayOfWeek, meetings) {
	//Создаём таблицу для отображения календаря на основе данных
	//Array - data содержит информацию, которая размещается в строке таблицы
	//Time - имена строки
	//dayOfWeek - имена столбцов таблицы(дни недели)
	const table = document.createElement('table');
	table.className = 'table';
	createTableRow(dayOfWeek, table, 'Время/Дни недели', 'table__firstTd');
	time.forEach((e)=> {createTableRow(data, table, e, 'table__td');});

	///////////////////////////////////////////////////////////////////////////
	table.querySelectorAll('td.table__td').forEach((e, index)=>{
		let positionOfDay = dayOfWeek[index % 7];
		let positionOfHour = time[Math.floor(index / 7)];

		e.id = `${positionOfDay}${positionOfHour}`;
		
		for(let i = 0; i < meetings.length; i++){
			let hour = meetings[i].idtime;
			let day = meetings[i].idday;

			if(day + hour == e.id) {
				e.innerHTML = meetings[i].idnameEvent;

				e.style.background = '#d5e6a2';
			}
		}
	})
	///////////////////////////////////////////////////////////////////////////
	return table
}

/**************************************************************************/
function createTableRow(array, table, name, className) {
	const myRow = document.createElement('tr');
	myRow.className = 'table__tr';
	table.appendChild(myRow);
	const firstTd = document.createElement('td');
	firstTd.className = 'table__firstTd';
	myRow.appendChild(firstTd);
	const txt = document.createTextNode(name);
	firstTd.appendChild(txt);
	
	array.forEach((e)=> {
		const dayTd = document.createElement('td');
		dayTd.innerHTML = e;
		dayTd.className = className;
		myRow.appendChild(dayTd);
	})
}