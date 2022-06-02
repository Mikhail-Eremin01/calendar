//  Create component - dropdown list
let createSelectFromArray = function(arr) {
	const mySelect = document.createElement('select');
	arr.forEach((e) => {
	mySelect.appendChild(addOption(e, '', 'option'));
	});
	return mySelect;
}