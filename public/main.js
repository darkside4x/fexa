document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', handleAuthClick);

    function initClient() {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({
                client_id: '998151195957-65s2khsrr16mqlta7ddau30up4bf30hb.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email'
            }).then(() => {
                console.log("GAPI initialized");
            });
        });
    }

    function handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn().then((user) => {
            console.log("User signed in: ", user);
            // Redirect to dash.html after successful login
            window.location.href = "dash.html";
        }).catch((error) => {
            console.error("Error signing in: ", error);
        });
    }

    initClient();
});

// For rotating gradient effect with mouse movement
document.body.addEventListener('mousemove', function (event) {
    document.body.style.setProperty('--mouse-x', event.clientX + 'px');
    document.body.style.setProperty('--mouse-y', event.clientY + 'px');
});
