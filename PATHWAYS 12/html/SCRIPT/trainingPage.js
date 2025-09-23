let pressFunction = (e, opt) => {
    e.preventDefault();
    let initialDiv = document.getElementById('initial');
    initialDiv.classList.add('hidden');

    if (opt === 'objOpt') {
    let infoDiv = document.getElementById('trainingDiv');
    infoDiv.classList.remove('hidden');
    sessionStorage.setItem('infoOption', 'objObt');
    loopMods();

    } else if (opt === 'flow') {
    
    let infoDiv = document.getElementById('trainingDiv');
    infoDiv.classList.remove('hidden');
    sessionStorage.setItem('infoOption', 'flow');
    loopMods(false);

    } else if (opt === 'sel') {
    let menuSelection = document.getElementById('menuSelection');
    menuSelection.classList.remove('hidden');
    sessionStorage.setItem('infoOption', 'select');

    }
};

let loopMods = (opt = true) => {
    let obj = JSON.parse(sessionStorage.getItem('menu'));
    let nObj;
    let string = '<br><br><br>';
    let func;
    for (let key in obj) {
        if (opt) {
            func = `selectFunkytion(event, 'first', '${key}')`;
        } else {
            func = `automatedFunkytion(event, '${key}')`;
        }
        nObj = obj[key];
        if (typeof nObj !== 'undefined' && typeof nObj.bS !== 'undefined') {

            string += `<button class="selectionbutton" onclick="${func}">${nObj.bS}</button><br><br>`;

        }
    }
    let infoDiv = document.getElementById('info');
    infoDiv.innerHTML = string;



}


let backMenuSelection = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('menuSelection');
    el2.classList.add('hidden')
    let el = document.getElementById('initial');
    el.classList.remove('hidden');
}
let displayImageOnScreenBreifly = (imageFileName, t) => {
    let el = document.getElementById('imageDiv');
    el.innerHTML = `<img src="./IMAGES/${imageFileName}" class="image-height-100"/>`;
    let el2 = document.getElementById('trainingDiv');
    el2.classList.add('hidden');
    el.classList.remove('hidden');
    if (t === '0') {
        t = 0;
    }
    time = Number(t) * 1000;

    setTimeout(() => {
        el.classList.add('hidden');
        el.innerHTML = '';
        el2.classList.remove('hidden');
    }, time);
}
let selectFunkytion = (e, opt = 'first', opt2 = 0, back = false) => {
    
        e.preventDefault();
   
    if (opt === 'first') {
        let fPath = [];
        fPath.push(opt2);
        sessionStorage.setItem('fPath', JSON.stringify(fPath));


        let obj = gatherInfoViaPath(fPath);
        let string = '';
        if (obj.dB !== '') {
            displayImageOnScreenBreifly(obj.pFN, obj.s);
        }
        if (obj.dIW !== '') {
            string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" height="90vh" width="auto" class="image-height-100"/></div><br>`;
            
        }
        string += `<br><br><br>`;
        string += `<button onclick="loopMods()" class="selectionbutton">BACK</button><br><br>`;
        string += `<h3>${obj.i}</h3>`;
        let obj2;
        let counter = 0
        for (let key in obj) {
            obj2 = obj[key];
            if (typeof obj2.bS !== 'undefined') {
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'second', '${key}')">`;
                string += `Option: ${counter} <br>`;
                string += '<p>' + obj2.o + '</p>';
                string += `</button><br><br>`;
            }
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;

    } else if (opt === 'second') {
        let fPath = JSON.parse(sessionStorage.getItem('fPath'));
        if (back) {
        fPath.pop();
        fPath.pop();
        }
     
        fPath.push(opt2);
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
   
        let obj = gatherInfoViaPath(fPath);
        let string = '';
        let numeral;
        if (fPath.length > 2) {
            numeral = 'second';
        } else {
            numeral = 'first';
        }
        if (typeof obj.dB !== 'undefined') {
            if (obj.dB === 'on') {
                displayImageOnScreenBreifly(obj.pFN, obj.s);
            }
            if (obj.dIW === 'on') {
                string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" class="image-height-100"/></div>`;
 
            }
        }
        string += `<br><br><br>`;
        string += `<button onclick="selectFunkytion(event, '${numeral}', '${fPath[fPath.length-2]}', 'true')" class="selectionbutton">BACK</button><br><br>`;
        string += `<h3>${obj.r}</h3>`;
        
        let obj2;
        let counter = 0
        for (let key in obj) {
            obj2 = obj[key];
            if (typeof obj2.bS !== 'undefined') {
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'second', '${key}')">`;
                string += `Option: ${counter} <br>`;
                string += '<p>' + obj2.o + '</p>';
                string += `</button><br><br>`;
            }
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;
    }

}
let rand = (min, max) => {
    return Math.floor(Math.random() * (max - min +1) +min)
}
let automatedFunkytion = (e, key, start = true, back = false) => {
    e.preventDefault();
    let fPath;
 
    if (start) {
        fPath = [];
        
    } else {
        fPath = JSON.parse(sessionStorage.getItem('fPath'));
        
    }
    if (back) {
    fPath.pop();
    fPath.pop();
    if (fPath.length === 0) loopMods(false);
    }
    if (start) {
            fPath.push(key);
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
    
    }

       
        if (!start) {
    
        fPath.push(key);
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
        } 

        let obj = gatherInfoViaPath(fPath);
        let string = '';
        let start2;
        if (fPath.length > 2) {
            start2 = false;
        } else {
            start2= true;
        }
        if (typeof obj.dB !== 'undefined') {
            if (obj.dB === 'on') {
                displayImageOnScreenBreifly(obj.pFN, obj.s);
            }
            if (obj.dIW === 'on') {
                string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" class="image-height-100"/></div>`;
   
            }
        }
        string += `<br><br><br>`;
        string += `<button onclick="automatedFunkytion(event, '${fPath[fPath.length-2]}', ${start2}, 'true')" class="selectionbutton">BACK</button><br><br>`;
        if (start) {
        string += `<h3>${obj.i}</h3>`;
        
        } else {
        string += `<h3>${obj.r}</h3>`;
        }
        let obj2;
        let keyArr = [];
        let counter = -1;
        for (let key in obj) {
            obj2 = obj[key];
        
            if (typeof obj2.bS !== 'undefined') {
                keyArr.push(key);
                counter = counter +1;
            } 
        }
        let selectionNumeral = rand(0, (keyArr.length-1));
   
        let selectedKey = keyArr[selectionNumeral];
        if (typeof obj[selectedKey] !== 'undefined') {
        string += `<p onclick="automatedFunkytion(event, '${selectedKey}', false)">` + obj[selectedKey].o + '</p>';
        string += `<button onclick="automatedFunkytion(event, '${selectedKey}', false)" class="selectionButton">ONWARD!</button>`
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;
 
}