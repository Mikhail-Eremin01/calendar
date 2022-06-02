//  Create component - button
let createBtn = function(btnValue, classBtn, type) {
	const btn = document.createElement('input');
	btn.setAttribute('type', type);
	btn.value = btnValue;
	btn.className = `btn ${classBtn}`;
	return btn;
}