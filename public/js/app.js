const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const imgContainer = document.querySelector('.img-container');
const resultContainer = document.querySelector('.result-container');
const loaderContainer = document.querySelector('.loader-container');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = '';
	messageTwo.textContent = '';
	loaderContainer.classList.add('active');
	resultContainer.classList.remove('populated');

	fetch('/weather?address=' + location).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				let img = document.createElement('img');
				img.src = `../img/${data.icon}.png`;
				imgContainer.innerHTML = '';
				imgContainer.appendChild(img);
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
			resultContainer.classList.add('populated');
			loaderContainer.classList.remove('active');
		});
	});
});
