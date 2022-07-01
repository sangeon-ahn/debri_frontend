const dataSet = [
	{
		id : 'chl378900@naver.com',
		pw : '1234',
		birth : '001010',
		nickname : 'siri'
	},
  {
		id : 'jinsil378900@gmail.com',
		pw : '5678',
		birth : '001010',
		nickname : 'jinsil'
	},
];

const outA = document.querySelector("#A13_out");
const loginForm = document.querySelector("#A13_form");
const loginInput = document.querySelector(".A13_block input");
const logOut = document.querySelector("#A13_logout");
const usrName = localStorage.getItem("username");
const passwordInput = document.querySelector("#input-password");

function onLoginSubmit(event) {
	event.preventDefault();
	
	const username = loginInput.value;
	const password = passwordInput.value;
	
	if (!username) {
		alert('input username');
		return;
	}

	const userData = dataSet.filter(data => data.id === username)[0];
	
	if (!userData || userData.pw !== password) {
		alert('input correct account info');
		return;
	}
	
	loginForm.classList.add("hidden");
	loginForm.classList.remove("aaa");
	paintHello(userData.nickname);
}

function paintHello(username) {
	outA.innerText = `Hello ${username}!`;
	outA.classList.remove("hidden");
	logOut.classList.remove("hidden");
}

function logOutFunc() {
	console.log('logout');
	loginInput.value = '';
	passwordInput.value = '';
	// localStorage.removeItem("username");
	logOut.classList.add("hidden");
	outA.classList.add("hidden");
	loginForm.classList.remove("hidden");
	loginForm.classList.add("aaa");
}

if  (usrName === null) {
	// console.log('hi');
	loginForm.classList.remove("hidden");
	loginForm.classList.add("aaa");
	logOut.classList.add("hidden");
	loginForm.addEventListener("submit", onLoginSubmit);
} else {
	console.log('bye');
}
logOut.addEventListener("click", logOutFunc);