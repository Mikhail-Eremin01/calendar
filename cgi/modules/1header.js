//  Create header
let createHeader = function() {
	const header = document.createElement('header');
	header.className = "header";
	
	const title = document.createElement('p');
	title.innerHTML = 'Calendar';
	title.className = 'header__title';
	header.appendChild(title);
	
	const containerBtn = document.createElement('div');
	containerBtn.className = 'containerForBtns';
	header.appendChild(containerBtn);
	return header;
}