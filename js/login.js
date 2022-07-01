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
	const loginForm = document.querySelector("#A13_form")
	const loginInput = document.querySelector(".A13_block input");
	const logOut = document.querySelector("#A13_logout");
	const usrName = localStorage.getItem("username");

	function onLoginSubmit(event) {
		loginForm.classList.add("hidden");
		loginForm.classList.remove("aaa");
		const username = loginInput.value;
		localStorage.setItem("username", username);
		paintHello(username);
	}

	function paintHello(username) {
		outA.innerText = `Hello ${username}!`;
		outA.classList.remove("hidden");
		logOut.classList.remove("hidden");
	}

	function logOutFunc() {
		if  (usrName !== null) {
			localStorage.removeItem("username");
			logOut.classList.add("hidden");
			outA.classList.add("hidden");
			loginForm.classList.remove("hidden");
			loginForm.classList.add("aaa");
		}
	}

	if  (usrName === null) {
		loginForm.classList.remove("hidden");
		loginForm.classList.add("aaa");
		logOut.classList.add("hidden");
		loginForm.addEventListener("submit", onLoginSubmit);
	} else {
		paintHello(usrName);
		logOut.addEventListener("click", logOutFunc);
	}