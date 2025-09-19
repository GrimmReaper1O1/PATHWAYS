loadFromIndexedDB('menuObject', 'train', 'trainingMenu').then(response => {
    let res = response.id;
    console.log(res);
    sessionStorage.setItem('menu', res);
}).catch(error => {
    sessionStorage.setItem('menu', JSON.stringify({ length: 0 }));
});
let paragraphReplace = (string) => {
    let text = string.replace(/[\n\r]/g, '</p><p>');
    return text;
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
let paragraphRemove = (text) => {
    let string = text.replace('</p><p>', "\n");
    return string
};
let modInsert = (bS) => {
    let obj = JSON.parse(sessionStorage.getItem('menu'));

    let el = document.getElementById('introduction');

    let uid = uidOne();
    obj[String(obj.length)] = {};
    obj[String(obj.length)] = { itemKey: obj.length, length: 0, 'bS': bS, 'uid': uid, cONC: 'correct', o: 'NOT REQUIRED', r: el.textContent, s: 0, cONC: 'correct', pFN: '', type: 'module' };
    obj.length = obj.length + 1;
    console.log(obj);

    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');

    setTimeout(() => {
        location.reload();
    }, 200);
}


let findPathAndSave = (fPath, infoObj, option) => {
    let path = fPath;
    console.log(path);
    let obj = infoObj;
    let obj2 = {};
    let place = JSON.parse(sessionStorage.getItem('menu'));
    let keys;
    let keyLength;
    obj2 = place;
    let obj3 = place;

    for (let i = 0; i < path.length; i++) {

        keys = path[i];
        console.log(keys);
        console.log(obj2.length);
        obj2 = obj2[keys];
        obj3 = obj3[keys];

    }
    console.log(obj2);

    let truthy = false

    for (let i = 0; i < obj2.length; i++) {
        if (typeof obj2.bS === 'undefined') {
            keyLength = i + 1;
            truthy = true
            console.log('keylength', keyLength);
        }
    }
    if (!truthy) {
        console.log('keylength', ' transfer')
        keyLength = obj3.length;
    }

    if (option === 'option' && typeof obj2 !== 'undefined') {
        obj2[keyLength] = {};
        obj2[keyLength] = {
            dB: (obj.displayBefore.checked ? obj.displayBefore.value : ''),
            dIW: (obj.displayImageWhile.checked ? obj.displayImageWhile.value : ''), pFN: obj.picName.value,
            bS: paragraphReplace(obj.breifDescription.value), o: paragraphReplace(obj.option.value), 
            r: paragraphReplace(obj.answerToOption.value), uid: uidOne(), cONC: 'correct', type: 'option',
        };
        obj3.length = obj3.length + 1;
        console.log(obj2);
        console.log(place);
        return place
    } else if (option === 'alter' && typeof obj2.bS !== 'undefined') {
        obj2.s = obj.secs.value;
        obj2.itemKey = obj2.itemKey;
        obj2.length = 0;
        obj2.dB = (obj.displayBefore.checked ? obj.displayBefore.value : '');
        obj2.dIW = (obj.displayImageWhile.checked ? obj.displayImageWhile.value : '');
        obj2.pFN = obj.picName.value;
        obj2.bS = paragraphReplace(obj.breifDescription.value);
        obj2.o = paragraphReplace(obj.option.value);
        obj2.r = paragraphReplace(obj.answerToOption.value);
        obj2.uid = uidOne();
        obj2.cONC = obj.cONC;
        return place

    }
    sessionStorage.setItem('option', null);
    return false
}
let gatherInfoViaPath = (path) => {
    let obj = {};
    obj = JSON.parse(sessionStorage.getItem('menu'));
    console.log(obj);
    let location = obj;

    for (let i = 0; i < path.length; i++) {
        location = location[path[i]];
        console.log('what the');
        console.log(path);
    }
    console.log(location);
    return location;

}
let enterInformationIntoFields = (location, truthy = true) => {
    let fieldObj = fieldHelper();
    if (truthy) {
        fieldObj.secs.value = location.s;
        fieldObj.displayBefore.checked = location.dB;
        fieldObj.displayImageWhile.checked = location.dIW;
        fieldObj.picName.value = location.pFN;
        fieldObj.breifDescription.textContent = paragraphRemove(location.bS);
        fieldObj.option.textContent = paragraphRemove(location.o);
        fieldObj.answerToOption = paragraphRemove(location.r);
        fieldObj.cONC = location.cONC;
        fieldObj.type = location.type;
    } else {

        let el = document.getElementById('optionInfoIndividual');
        let string = `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
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
        el.innerHTML = string;

    }

}

let getInfoLoopedViaLevelAndInsert = (obj) => {
    let el = document.getElementById('loopedOptionInfo');
    let string = '';
    let location;
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

let getAndDisplayObjectsInfo = () => {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    enterInformationIntoFields(obj);

}
let getAndViewObjectsInfo = (truthy = true) => {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj;
    if (truthy) {
        obj = gatherInfoViaPath(fPath);
        enterInformationIntoFields(obj, false);
    } else {
        obj = gatherInfoViaPath(fPath);
        getInfoLoopedViaLevelAndInsert(obj);
    }
}



let findPathAndDelete = (fPath, infoObj) => {
    let path = fPath;
    let obj = infoObj;
    let place = obj;
    // console.log(infoObj);
    // if (path.length >=  1) {
    for (let i = 0; i < path.length - 1; i++) {
        place = place[path[i]];
    }
    // }
    // console.log(place);
    // console.log(path.length);
    if (typeof place[path[path.length - 1]].bS !== 'undefined') {
        console.log(place);
        delete place[path[path.length - 1]];
        place.length = place.length -1;
        console.log(obj);
        return obj
    }
    return false
}

let fieldHelper = () => {
    let obj = {};

    obj.secs = document.getElementById('secs');
    obj.displayBefore = document.getElementById('displayImageBefore');
    obj.displayImageWhile = document.getElementById('displayImageWhile');
    obj.picName = document.getElementById('picName');
    obj.breifDescription = document.getElementById('breifDescription');
    obj.option = document.getElementById('option');
    obj.answerToOption = document.getElementById('answerToOption');
    obj.type = document.getElementById('type');
    obj.cONC = document.getElementById('cONC');
    return obj
}
let sav = () => {
    let obj;
    let option = sessionStorage.getItem('option');
    fPath = JSON.parse(sessionStorage.getItem('fPath'));
    console.log('got here');
    if (option === 'option') {
        console.log('into option');

        obj = findPathAndSave(fPath, fieldHelper(), option);
    } else {
        obj = findPathAndSave(fPath, fieldHelper(), option);
    }
    console.log(obj);
    sessionStorage.setItem('menu', JSON.stringify(obj));
    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');

    setTimeout(() => {
        location.reload();
    }, 200)
}
let delEntry = () => {

    fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = findPathAndDelete(fPath, JSON.parse(sessionStorage.getItem('menu')));
    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');
    setTimeout(() => {
        location.reload();
    }, 200);
}
let selectLevel = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('menuSelection');
    el2.classList.add('hidden');
    let el = document.getElementById('viewLevelsOptions');
    el.classList.remove('hidden');
    getAndViewObjectsInfo(false);
}
// let selectOption = (e) => {
//     if (e !== false) {
//     e.preventDefault();
//     }
//     let el2 = document.getElementById('menuSelection');
//     el2.classList.add('hidden');
//     getAndViewObjectsInfo();
//     let el = document.getElementById('viewIndividualOption');
//     el.classList.remove('hidden');
// }
let createOption = (e) => {
    if (e !== false) {
        e.preventDefault();
        let path = JSON.parse(sessionStorage.getItem('fPath'));
        if (path.length >= 1) {


            let modSav = document.getElementById('modSav');
            modSav.classList.add('hidden');

            let el1 = document.getElementById('deleteInfo');
            el1.classList.add('hidden');
            let el2 = document.getElementById('menuSelection');
            el2.classList.add('hidden');
            let el = document.getElementById('fieldPane');
            el.classList.remove('hidden');
            sessionStorage.setItem('option', 'option');
        }
    }
}
let alterOption = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('menuSelection');
    el2.classList.add('hidden')
    let el = document.getElementById('fieldPane');
    el.classList.remove('hidden');
    sessionStorage.setItem('option', 'alter');
    getAndDisplayObjectsInfo();
}
let backfieldPane = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('fieldPane');
    el2.classList.add('hidden')
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');
    let el3 = document.getElementById('deleteInfo');

    if (el3.classList.contains('hidden')) {
        el3.classList.remove('hidden');
    }
}
let backIndividual = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('viewIndividualOption');
    el2.classList.add('hidden')
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');
}
let backLevelsOptions = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('viewLevelsOptions');
    el2.classList.add('hidden')
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');
}
let backIndividualOption = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('viewIndividualOption');
    el2.classList.add('hidden')
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');
}
let yes = (e) => {
    e.preventDefault();
    sessionStorage.setItem('yesNo', 'true');
}
let no = (e) => {
    e.preventDefault();
    sessionStorage.setItem('yesNo', 'false');
}
let save = (e) => {
    e.preventDefault();
    let savHelper = () => {
        setTimeout(() => {
            let answer = sessionStorage.getItem('yesNo');
            let messageDiv = document.getElementById('messageDiv');
            let fieldPane = document.getElementById('fieldPane');
            if (answer === "true") {
                console.log('answer');

                let result = sav();
                if (result) {
                    console.log('apparently successful')
                }

            }

            messageDiv.classList.add('hidden');
            fieldPane.classList.remove('hidden');
            el3.removeEventListener('click', savHelper);
            el3.removeEventListener('click', savHelper);
        }, 50);
    }
    let el2 = document.getElementById('fieldPane');
    el2.classList.add('hidden')
    let el = document.getElementById('messageDiv');
    el.classList.remove('hidden');
    let el5 = document.getElementById('message');
    el5.textContent = 'Are you sure you want to save the information?';
    el3 = document.getElementById('yes');
    el3.addEventListener('click', savHelper);
    let el4 = document.getElementById('no');
    el4.addEventListener('click', savHelper);
}
let del = (e) => {
    e.preventDefault();
    let delHelper = () => {
        setTimeout(() => {
            let answer = sessionStorage.getItem('yesNo');
            let messageDiv = document.getElementById('messageDiv');

            let fieldPane = document.getElementById('fieldPane');
            if (answer === "true") {


                let result = delEntry();
                if (result) {
                    console.log('apparently successful')
                }

            }
            messageDiv.classList.add('hidden');
            fieldPane.classList.remove('hidden');
            el3.removeEventListener('click', delHelper);
            el3.removeEventListener('click', delHelper);


        }, 50);
    }
    let el2 = document.getElementById('fieldPane');
    el2.classList.add('hidden')
    let saveBut = document.getElementById('modSav');
    if (!saveBut.classList.contains('hidden')) {
        saveBut.classList.add('hidden');
    }
    let el = document.getElementById('messageDiv');
    el.classList.remove('hidden');

    let el3 = document.getElementById('yes');
    el3.addEventListener('click', delHelper);
    let el4 = document.getElementById('no');
    el4.addEventListener('click', delHelper);

}

let moduleOption = (e) => {
    e.preventDefault();
    let els = document.getElementById('failureSystem');
    let path = JSON.parse(sessionStorage.getItem('fPath'));
    if (path.length === 0) {
        els.innerHTML = '';
        let modSav = document.getElementById('modSav');
        modSav.classList.remove('hidden');
        let el5 = document.getElementById('message');
        el5.textContent = '';
        let yes = document.getElementById('yes');
        let no = document.getElementById('no');

        yes.classList.add('hidden');
        no.classList.add('hidden');
        let el2 = document.getElementById('menuSelection');
        el2.classList.add('hidden')
        let el = document.getElementById('messageDiv');
        el.classList.remove('hidden');
        let el1 = document.getElementById('moduleField');
        el1.classList.remove('hidden');
        console.log('one');
        let insertTag = document.getElementById('insert');
        insertTag.classList.remove('hidden');
        let intro = document.getElementById('introduction');
        intro.classList.remove('hidden');

        let moHelp = () => {
            modSav.classList.add('hidden');
            el5.textContent = 'Are you sure you want to save the module?';
            console.log('one');
            setTimeout(() => {

                console.log('two');

                let el1 = document.getElementById('moduleField');
                // create moduleInsert function;
                modInsert(el1.value);




            }, 100);


        };


        modSav.addEventListener('click', moHelp);
    } else {
        els.innerHTML = '<p>Please deselect the levels.</p>';
    }

}


let view = (e, opt = false) => {
    e.preventDefault();
    if (!opt) {

        let el2 = document.getElementById('fieldPane');
        el2.classList.add('hidden');
        getAndViewObjectsInfo();
        let el = document.getElementById('viewIndividualOption');
        el.classList.remove('hidden');
    } else {
        let el2 = document.getElementById('menuSelection');
        el2.classList.add('hidden');
        getAndViewObjectsInfo()
        let el = document.getElementById('viewIndividualOption');
        el.classList.remove('hidden');

    }
}
