loadFromIndexedDB('menuObject', 'train', 'trainingMenu').then(response => {
    let res = response.id;

    sessionStorage.setItem('menu', res);
    let blank = [];
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
    sessionStorage.setItem('yesNo', null);
}).catch(error => {
    let blank = [];
    sessionStorage.setItem('menu', JSON.stringify({ length: 0 }));
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
    sessionStorage.setItem('yesNo', null);
});
let selectInfo = (e, opt2) => {
    e.preventDefault();
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    console.log(obj);   
    let el2, el;
    if (opt2 === 'level') {
       el2 = document.getElementById('menuSelection');
    console.log(!el2.classList.contains('hidden'))
    if (!el2.classList.contains('hidden')) {
        el2.classList.add('hidden');
    }
    getInfoLoopedViaLevelAndInsert(obj);
    el = document.getElementById('viewLevelsOptions');
    el.classList.remove('hidden');
    console.log('here');
} else if (opt2 === 'individual') {
    if (fPath.length > 0) {
     el2 = document.getElementById('menuSelection');
            
            if (!el2.classList.contains('hidden')) {
                el2.classList.add('hidden');
            }
            enterInformationIntoFields(obj, false);
                 
            el = document.getElementById('viewIndividualOption');
            el.classList.remove('hidden');
}
}
};



let gatherInfoViaPath = (path) => {
    let obj = {};
    obj = JSON.parse(sessionStorage.getItem('menu'));

    let location = obj;
   
        for (let i = 0; i < path.length; i++) {
            location = location[path[i]];

        }
    return location
}

let getInfoLoopedViaLevelAndInsert = (obj) => {
    let el = document.getElementById('loopedOptionInfo');
    let string = '';
    let location = obj;
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    if (fPath.length > 0) {
        string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
        string += `<h4>Type: ${location.type}</h4>`;
        string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
        string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
        string += `<h4>Brief Summary...</h4>`;
        string += `<p>${location.bS}</p>`;
        if (location.i !== 'NOT REQUIRED') {
        string += `<h4>Option...</h4>`;
        string += `<p>${location.o}</p>`;   
        string += `<h4>Reply to option...</h4>`;
        string += `<p>${location.r}</p>`;
        } else {
        string += `<h4>Introduction.</h4>`;
        string += `<p>${location.i}</p>`;
        }
    }
    for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i].bS !== 'undefined') {
            location = obj[i];
            string += `<h4>Option ${location.itemKey + 1}</h4>`;
            string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
            string += `<h4>Type: ${location.type}</h4>`;
            string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
            string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
            string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
            string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
            string += `<h4>Brief Summary...</h4>`;
            string += `<p>${location.bS}</p>`;
            string += `<h4>Option...</h4>`;
            string += `<p>${location.o}</p>`;
            string += `<h4>Reply to option...</h4>`;
            string += `<p>${location.r}</p>`;
        }
    }
    el.innerHTML = string;
}

let backOptionPressFunction = (e, opt) => {
    e.preventDefault();
    if (opt === 'level') {
    let el2 = document.getElementById('viewLevelsOptions');
    el2.classList.add('hidden')
    
    } else if (opt === 'individual') {  
    let el2 = document.getElementById('viewIndividualOption');
    el2.classList.add('hidden')
    
    }
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');

}


let enterInformationIntoFields = (location, truthy = true) => {
    let fieldObj = fieldHelper();
    if (truthy) {
        console.log('here again');
        fieldObj.secs.value = location.s;
        fieldObj.displayBefore.checked = location.dB;
        fieldObj.displayImageWhile.checked = location.dIW;
        fieldObj.picName.value = location.pFN;
        fieldObj.breifDescription.textContent = paragraphRemove(location.bS);
        fieldObj.option.textContent = paragraphRemove(location.o);
        fieldObj.answerToOption.textContent = paragraphRemove(location.r);
        fieldObj.cONC.checked = location.cONC === 'correct' ? true : '';
        fieldObj.type.checked = location.type === 'module' ? true : '';
        fieldObj.info.textContent = location.i;
    } else {
        console.log('here also');
     
        let elo1 = document.getElementById('optionInfoIndividual');
        let string = '';
        string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
        string += `<h4>Type: ${location.type}</h4>`;
        string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
        string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
        string += `<h4>Brief Summary...</h4>`;
        string += `<p>${location.bS}</p>`;
        if (location.i !== 'NOT REQUIRED') {
        string += `<h4>Option...</h4>`;
        string += `<p>${location.o}</p>`;   
        string += `<h4>Reply to option...</h4>`;
        string += `<p>${location.r}</p>`;
        } else {
        string += `<h4>Introduction.</h4>`;
        string += `<p>${location.i}</p>`;
        }
        console.log(string);
        elo1.innerHTML = string;

    }

};

let fieldHelper = () => {
    let obj = {};
    obj.secs = document.getElementById('secs');
    obj.displayBefore = document.getElementById('displayImageBefore');
    obj.displayImageWhile = document.getElementById('displayImageWhile');
    obj.picName = document.getElementById('picName');
    obj.breifDescription = document.getElementById('breifDescription');
    obj.option = document.getElementById('option');
    obj.answerToOption = document.getElementById('answerToOption');
    obj.info = document.getElementById('introduction');
    obj.type = document.getElementById('type');
    obj.cONC = document.getElementById('cONC');
    
    return obj
}

findPathAndSave = (fPath, infoObj, option, truthy2 = false) => {
    let path = fPath;
   
    let obj = infoObj;
    let obj2 = {};
    let place = JSON.parse(sessionStorage.getItem('menu'));
    let keys;
    let keyLength;
    obj2 = place;
    let obj3 = place;

    if (typeof place.length === 'undefined') {
        place.length = 0;
    }
    for (let i = 0; i < path.length; i++) {

        keys = path[i];

        obj2 = obj2[String(keys)];
        obj3 = obj3[String(keys)];

    }

    let truthy = false;

    for (let i = 0; i < obj2.length; i++) {
        if (typeof obj2[i] === 'undefined') {
            keyLength = i;
            truthy = true

        }
    }

    if (!truthy) {
        if (place.length === 0) {
            keyLength = 0;

        } else {
            keyLength = obj3.length;
        }
    }
    if (option === 'option' && typeof obj2 !== 'undefined') {
        obj2[keyLength] = {
            s: DOMPurify.sanitize(obj.secs.value), itemKey: keyLength, length: 0,
            dB: (obj.displayBefore.checked ? obj.displayBefore.value : ''),
            dIW: (obj.displayImageWhile.checked ? obj.displayImageWhile.value : ''), pFN: DOMPurify.sanitize( obj.picName.value),
            bS: DOMPurify.sanitize(paragraphReplace(obj.breifDescription.value)), o: DOMPurify.sanitize(paragraphReplace(obj.option.value)),
            r: DOMPurify.sanitize(paragraphReplace(obj.answerToOption.value)), uid: uidOne(), cONC: (obj.cONC ? 'correct' : 'incorrect'), i: 'NOT REQUIRED', type: 'option'
        };
     
            obj3.length = obj3.length + 1;
       

        return place
    } else if (option === 'option2' && typeof obj2 !== 'undefined') {
        let opt = truthy2 === false ? keyLength : obj.itemKey;

        obj2[opt] = {
            s: DOMPurify.sanitize(obj.s), itemKey: opt, length: 0,
            dB: obj.dB,
            dIW: obj.dIW, pFN: obj.pFN,
            bS: DOMPurify.sanitize(paragraphReplace(obj.bS)), o: DOMPurify.sanitize(paragraphReplace(obj.o)), r: DOMPurify.sanitize(paragraphReplace(obj.r)), uid: obj.uid, cONC: (obj.cONC ? 'correct' : 'incorrect'),
            i: DOMPurify.sanitize(paragraphReplace(obj.intro)), type: obj.type,
        };
        fPath.push(String(opt));
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
       
            obj2.length = obj2.length + 1;
        
        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    } else if (option === 'option3' && typeof obj2 !== 'undefined') {
        let opt = truthy2 === false ? keyLength : obj.itemKey;
 
        obj2[opt] = {
            s: DOMPurify.sanitize(obj.s), itemKey: opt, length: 0,
            dB: obj.dB,
            dIW: obj.dIW, pFN: DOMPurify.sanitize(obj.pFN),
            bS: DOMPurify.sanitize(paragraphReplace(obj.bS)), o: DOMPurify.sanitize(paragraphReplace(obj.o)), r: DOMPurify.sanitize(paragraphReplace(obj.r)), uid: obj.uid, cONC: obj.cONC,
            i: DOMPurify.sanitize(paragraphReplace(obj.i)), type: obj.type,
        };
        fPath.push(String(opt));
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
        
            obj2.length = obj2.length + 1;
       

        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    } else if (option === 'alter' && typeof obj2.bS !== 'undefined') {
        obj2.s = DOMPurify.sanitize(obj.secs.value);
        obj2.itemKey = obj2.itemKey;
        obj2.length = obj2.length;
        obj2.dB = (obj.displayBefore.checked ? obj.displayBefore.checked : '');
        obj2.dIW = (obj.displayImageWhile.checked ? obj.displayImageWhile.checked : '');
        obj2.pFN = DOMPurify.sanitize(obj.picName.value);
        obj2.bS = DOMPurify.sanitize(paragraphReplace(obj.breifDescription.value));
        obj2.o = DOMPurify.sanitize(paragraphReplace(obj.option.value));
        obj2.r = DOMPurify.sanitize(paragraphReplace(obj.answerToOption.value));
        obj2.uid = uidOne();
        obj2.i = DOMPurify.sanitize(paragraphReplace(obj.info.value));
        obj2.type = obj.type.checked === true ? 'module'  : 'option';
        obj2.cONC = obj.cONC.checked === true ? 'correct' : 'incorrect';
        return place

    } else if (option === 'module' && fPath.length === 0) {


        let uid = uidOne();
        place[keyLength] = {};
        place[keyLength] = {
            itemKey: keyLength, length: 0, 'bS': DOMPurify.sanitize(paragraphReplace(obj.modName)), 'uid': uid,
            cONC: 'correct', o: 'NOT REQUIRED', r: 'NOT REQUIRED', i: DOMPurify.sanitize(paragraphReplace(obj.intro)), s: 0, cONC: 'correct', pFN: 'NOT INSERTED', type: 'module'
        };
        
            place.length = place.length + 1;
        

        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    }

    return false
};

let findPathAndDelete = (fPath, infoObj) => {
    let path = fPath;
    let obj = infoObj;
    let place = obj;

    for (let i = 0; i < path.length - 1; i++) {
        place = place[path[i]];
    }

    if (path.length === 0) {

        place = { length: 0 };
        return place;
    } else {
        if (typeof place[path[path.length - 1]].bS !== 'undefined') {

            delete place[path[path.length - 1]];
            place.length = place.length - 1;
  
            return obj
        }
    }
    return false
}


let delEntry = () => {

    fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = findPathAndDelete(fPath, JSON.parse(sessionStorage.getItem('menu')));
    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');
    setTimeout(() => {
        location.reload();
    }, 200);
}


let saveHelper = (option) => {
    
        let answer = sessionStorage.getItem('yesNo');
        let messageDiv = document.getElementById('messageDiv');
        let fieldPane = document.getElementById('fieldPane');

            let obj;
            
            fPath = JSON.parse(sessionStorage.getItem('fPath'));

            if (option === 'option') {
   
                obj = findPathAndSave(fPath, fieldHelper(), option);
            } else {
                obj = findPathAndSave(fPath, fieldHelper(), option);
            }

            sessionStorage.setItem('menu', JSON.stringify(obj));
            saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');
            
            setTimeout(() => {
                location.reload();
            }, 200)
            

        
        messageDiv.classList.add('hidden');
        fieldPane.classList.remove('hidden');
        
  
};


let yes = (e, opt) => {
    e.preventDefault();
    let option = sessionStorage.getItem('option');
    console.log(option);
    if (option === 'alter' || option === 'option') {
    console.log('whatthe');
        saveHelper(option);
    } else {
        delHelper(opt, 'yes');

    }
};

let no = (e, opt = true) => {
    e.preventDefault();
    delHelper(opt, 'no');
}

let delHelper = (opt = true, opt2) => {
    
    setTimeout(() => {
        let answer = opt2
        let messageDiv = document.getElementById('messageDiv');
        
        let el; 
        if (opt) {
       el = document.getElementById('fieldPane');
        } else {
        el = document.getElementById('main');
        }
       
       if (answer === "yes") {


            let result = delEntry();
 
        }
        messageDiv.classList.add('hidden');
        el.classList.remove('hidden');
     

    }, 20);
}
let del = (e, opt = true) => {
    e.preventDefault();
   let el2;
    if (opt) {
        el2 = document.getElementById('fieldPane');
    } else {
        el2 = document.getElementById('main');
    }
   sessionStorage.setItem('option', 'delete');
    el2.classList.add('hidden')
    if (opt) {
    let saveBut = document.getElementById('modSav');
    if (!saveBut.classList.contains('hidden')) {
        saveBut.classList.add('hidden');
    }
}
    let el = document.getElementById('messageDiv');
    el.classList.remove('hidden');

    

}


let uidOne = () => {
    let unT = Date.now();
    let string = '';
    for (let i = 0; i < 8; i++) {
        string += String(Math.floor(Math.random() * 10));
    }
    let uidst = unT + 'rn' + string;
    return uidst;
};
let uidH = (obja, t = true, arr = false, objPath = 0) => {

    let nObj = obja;
    let obj2 = {};
    let obj;
    let temp;
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let nObj2;
    let t2 = false;

    if (t !== true) {
        if (typeof nObj.s !== 'undefined') {
            obj2.s = nObj.s;
            obj2.itemKey = nObj.itemKey;
            obj2.length = 0;
            obj2.dB = nObj.dB;
            obj2.dIW = nObj.dIW;
            obj2.pFN = nObj.pFN;
            obj2.bS = nObj.bS;
            obj2.o = nObj.o;
            obj2.r = nObj.r;
            obj2.i = nObj.i;
            obj2.type = nObj.type;
            obj2.uid = uidOne();
            obj2.cONC = nObj.cONC;
            findPathAndSave(fPath, obj2, 'option3', t);
            fPath = JSON.parse(sessionStorage.getItem('fPath'));
        }
    }

    let counter = 0

    counter2 = counter2 + 1;
    for (let key2 in nObj) {
        nObj2 = nObj[key2];
        if (typeof nObj2.bS !== 'undefined') {

            t = false;

            obj = uidH(nObj2, t, arr, objPath);
            if (t2) {
   }
            if (!t) {
                t2 = true;
            }
        }
    }
    if (!t) {
        fPath.pop();
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
    }
    return obj
};



