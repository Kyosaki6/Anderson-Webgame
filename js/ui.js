let isTyping = false;
let typeTimeout = null;

function typeWriter(text, elementId, speed = 25) {
    return new Promise(resolve => {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
        let i = 0;
        isTyping = true;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typeTimeout = setTimeout(type, speed);
            } else {
                isTyping = false;
                resolve();
            }
        }
        type();
    });
}

function flashScreen() {
    const flash = document.getElementById('flash-overlay');
    flash.style.opacity = '0.85';
    setTimeout(() => { flash.style.opacity = '0'; }, 100);
}

function triggerShake(duration = 500) {
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, duration);
}

let toastTimeout = null;
function showGameToast(msg) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}
