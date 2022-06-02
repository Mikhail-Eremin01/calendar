class Participants{
	constructor(participants, meetings){
		this.participants = participants;//  Все сотрудники
	}	
	//  Формируем массив из имён сотрудников  id, className, list, elem
	getNamesOfParticipants(){
		let arrOfName = [];
		for(let x in this.participants){
			arrOfName.push(this.participants[x].name)
		}
		return arrOfName;
	}
}

//  Функция для создания option и добавления в select сотрудников и дней недели
let addOption = function(data, properties, elem) {
	let option1 = document.createElement(elem);
	option1.innerHTML = data;
	if(properties){
		option1.setAttribute('value', properties);
	}
	return option1;
}