let pressFunction = (e, opt) => {
    e.preventDefault();
    let initialDiv = document.getElementById('initial');
    initialDiv.classList.add('hidden');
    let insert = [];
    sessionStorage.setItem('fPath22', JSON.stringify(insert));
    // sessionStorage.setItem('classP', JSON.stringify(insert));
    // sessionStorage.setItem('path', JSON.stringify(insert));
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
        nObj = obj[key];
        if (typeof nObj !== 'undefined' && typeof nObj.bS !== 'undefined') {
            if (opt) {
                func = `selectFunkytion(event, 'first', '${key}')`;
            } else {
                func = `automatedFunkytion(event, '${key}')`;
            }
            
            string += `<button class="selectionbutton" onclick="${func}">${nObj.bS}</button><br><br>`;

        }
    }
    
    let infoDiv = document.getElementById('info');
    infoDiv.innerHTML = string;

};


let backMenuSelection = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('menuSelection');
    el2.classList.add('hidden')
    let el = document.getElementById('initial');
    el.classList.remove('hidden');
};
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
};
let selectFunkytion = (e, opt = 'first', opt2 = 0, back = false, link = false, followed = false) => {
    
        e.preventDefault();
        let resumeObj;
    if (followed) {
        resumeObj = gatherInfoViaPath(JSON.parse(sessionStorage.getItem('lastPath')));
    }
    if (opt === 'first') {
        let fPath2 = [];
        fPath2.push(opt2);
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));


        let obj = gatherInfoViaPath(fPath2);
        let string = '';
        if (obj.dB !== '') {
            displayImageOnScreenBreifly(obj.pFN, obj.s);
        }
        if (obj.dIW !== '') {
            string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" height="90vh" width="auto" class="image-height-100"/></div><br>`;
            
        }
        string += `<br><br><br>`;
        string += `<button onclick="loopMods()" class="selectionbutton">BACK</button><br><br>`;
        if (followed) {
            string += `<p>${paragraphReplace(resumeObj.l)}</p>`
        } else {
            string += `<p>${paragraphReplace(obj.i)}</p>`;
        }
        let obj2;
        let counter = 0;
        for (let key in obj) {
            obj2 = obj[key];
            if (typeof obj2.bS !== 'undefined') {
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'second', '${key}')">`;
                string += `Option: ${counter} <br>`;
                string += '<p>' + paragraphReplace(obj2.o) + '</p>';
                string += `</button><br><br>`;
            }
        }
        if (obj.link.length !== 0) {
          
            let links = obj.link;
            let link, tempObj;
            
            for (let i = 0; i < links.length; i++) {
                
                tempObj = gatherInfoViaPath(links[i]);
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'third', '${links[links.length-1]}', false,  'a${i}')">`;
                string += `Option: ${counter} <br>`;
           
                    string += '<p>' + paragraphReplace(tempObj.o) + '</p>';
          
                string += `</button><br><br>`;
                sessionStorage.setItem('a'+i, JSON.stringify(links[i]));
                }
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;

    } else if (opt === 'second') {
        let fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
        if (back) {
        fPath2.pop();
        fPath2.pop();
        }
     
        fPath2.push(opt2);
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
   
        let obj = gatherInfoViaPath(fPath2);
        let string = '';
        let numeral;
        if (fPath2.length > 2) {
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
        string += `<button onclick="selectFunkytion(event, '${numeral}', '${fPath2[fPath2.length-2]}', 'true')" class="selectionbutton">BACK</button><br><br>`;
           if (followed) {
            string += `<p>${paragraphReplace(resumeObj.l)}</p>`
        } else {
        string += `<p>${paragraphReplace(obj.r)}</p>`;
        }
        let obj2;
        let counter = 0
        for (let key in obj) {
            obj2 = obj[key];
            if (typeof obj2.bS !== 'undefined') {
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'second', '${key}')">`;
                string += `Option: ${counter} <br>`;
                string += '<p>' + paragraphReplace(obj2.o) + '</p>';
                string += `</button><br><br>`;
            }
        }
                if (obj.link.length !== 0) {
             
            let links = obj.link;
            let link, tempObj;
            
            for (let i = 0; i < links.length; i++) {
                
                tempObj = gatherInfoViaPath(links[i]);
                counter = counter + 1;
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, 'third', '${links[links.length-1]}', false, 'a${i}')">`;
                string += `Option: ${counter} <br>`;
              
                    string += '<p>' + paragraphReplace(tempObj.o) + '</p>';
            
                string += `</button><br><br>`;
                sessionStorage.setItem('a'+i, JSON.stringify(links[i]));
                }
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;
    } else if (opt = 'third') {
        let link2 = JSON.parse(sessionStorage.getItem(link));
        link2.pop();
        sessionStorage.setItem('lastPath', sessionStorage.getItem('fPath2'));
        sessionStorage.setItem('fPath2', JSON.stringify(link2));
        if (link2.length === 0) {
        selectFunkytion(e, 'first', opt2, false, false, true);
        } else {
        selectFunkytion(e, 'second', opt2, false, false, true);
       
        }
    }

}
let rand = (min, max) => {
    return Math.floor(Math.random() * (max - min +1) +min)
}
let automatedFunkytion = (e, key, start = true, back = false) => {
    e.preventDefault();
    let fPath2;
 
    if (start) {
        fPath2 = [];
        
    } else {
        fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
        
    }
    if (back) {
    fPath2.pop();
    fPath2.pop();
    if (fPath2.length === 0) loopMods(false);
    }
    if (start) {
            fPath2.push(key);
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
    
    }

       
        if (!start) {
    
        fPath2.push(key);
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
        } 

        let obj = gatherInfoViaPath(fPath2);
        let string = '';
        let start2;
        if (fPath2.length > 2) {
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
        string += `<button onclick="automatedFunkytion(event, '${fPath2[fPath2.length-2]}', ${start2}, 'true')" class="selectionbutton">BACK</button><br><br>`;
        if (start) {
        string += `<p>${paragraphReplace(obj.i)}</p>`;
        
        } else {
        string += `<p>${paragraphReplace(obj.r)}</p>`;
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
        string += `<p onclick="automatedFunkytion(event, '${selectedKey}', false)">` + paragraphReplace(obj[selectedKey].o) + '</p>';
        string += `<button onclick="automatedFunkytion(event, '${selectedKey}', false)" class="selectionButton">ONWARD!</button>`;
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;
 
}