window.onload = function () {
    document.getElementById('preferences-button').onclick = function () {
        localStorage.setItem('ufos', document.getElementById('ufos-input').value);
        localStorage.setItem('time', document.getElementById('time-input').value);
    };
};