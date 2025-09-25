let removeSplash = () => {
    let el = document.getElementById('mainSplashScreen');
    let el2 = document.getElementById('indexText');
    el2.classList.remove('hidden');
    el.classList.add('hidden');
}

let addSplash = () => {
    let el = document.getElementById('mainSplashScreen');
    let el2 = document.getElementById('indexText');
    el2.classList.add('hidden');
    el.classList.remove('hidden');

}