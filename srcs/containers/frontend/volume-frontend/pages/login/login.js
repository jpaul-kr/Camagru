export function loginPage(main) {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('login');
    // main.appendChild(loginContainer);

    const welocomeMessage = document.createElement('div');
    welocomeMessage.classList.add('login-welcome');
    welocomeMessage.textContent = "Welcome to\n Camagru.";

    // const welcomeTitle = document.createElement('h1');
    // welcomeTitle.textContent = "Welcome to Camagru";

    const formContainer = document.createElement('div');
    formContainer.style.width = "50%";
    formContainer.style.justifyContent = "center";
    formContainer.style.alignItems = "center";
    formContainer.style.display = "flex";  

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form');
    formContainer.appendChild(loginForm);

    const title = document.createElement('h2');
    title.textContent = "Login";

    loginForm.appendChild(title);
    loginContainer.appendChild(welocomeMessage);
    loginContainer.appendChild(formContainer);
    main.appendChild(loginContainer);
}