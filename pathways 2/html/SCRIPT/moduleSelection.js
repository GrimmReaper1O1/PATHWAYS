loadFromIndexedDB('menuObject', 'train', 'trainingMenu').then(response => {
    let res = response.id;
    console.log(res);
    sessionStorage.setItem('menu', res);
    let blank = [];
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
}).catch(error => {
    let blank = [];
    sessionStorage.setItem('menu', JSON.stringify({ length: 0 }));
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
});

let paragraphReplace = (string) => {
    let text = string.replace(/[\n\r]/g, '</p><p>');
    return text;
}
let paragraphRemove = (text) => {
    let string = text.replace('</p><p>', "\n");
    return string
};



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
    
};
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
   // debugger;
    let nObj = obja;
    let obj2 = {};
    let obj;
    let temp;
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let nObj2;
    let t2 = false;
    // if (!objPath) {
    //     let objPath = {};
    //     counter2 = 0;
    // }
        if (t !== true) {
            obj2.s = nObj.s;
            obj2.itemKey =  nObj.itemKey;
            obj2.length = 0;
            obj2.dB = nObj.dB;
            obj2.dIW = nObj.dIW;
            obj2.pFN = nObj.pFN;
            obj2.bS = nObj.bS;
            obj2.o = nObj.o;
            obj2.r = nObj.r;
            obj2.uid = uidOne();
            obj2.cONC = "correct";
            findPathAndSave(fPath, obj2, 'option2', t);
            fPath = JSON.parse(sessionStorage.getItem('fPath'));
        }

let counter = 0

counter2 = counter2 + 1;
// objPath.length = counter2;
for (let key2 in nObj) {
    nObj2 = nObj[key2];
    if (typeof nObj2.bS !== 'undefined') {
        // objPath[counter2-1].location = counter -1;
        console.log('here');
        t = false;
        // if (t2) {
        //     counter = counter + 1;
        // fPath.push(counter);
        // console.log(fPath);
        // sessionStorage.setItem('fPath', JSON.stringify(fPath));
        // }
        obj = uidH(nObj2, t, arr, objPath);
        if (t2) {
            // fPath.pop();
            // sessionStorage.setItem('fPath', JSON.stringify(fPath));
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
}
;

//reused insert into functions page
// insert into functions page
// use this one
let findPathAndSave = (fPath, infoObj, option, truthy2 = false) => {
    let path = fPath;
    console.log(path);
    console.log(';lkj;lkl;kl;k;lkj;lkj;ljk;kljk;jl;klj;kjlk;jl;kjl;klj;klj;ilkjjk;ljkl;;kljkjl;;ljk;klj;ljk;lijk');
    // debugger;
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
        obj2 = obj2[String(keys)];
        obj3 = obj3[String(keys)];

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

        keyLength = obj3.length;
    }

    if (option === 'option' && typeof obj2 !== 'undefined') {
        obj2[keyLength] = {
            s: obj.secs.value, itemKey: keyLength, length: 0,
            dB: (obj.displayBefore.checked ? obj.displayBefore.value : ''),
            dIW: (obj.displayImageWhile.checked ? obj.displayImageWhile.value : ''), pFN: obj.picName.value,
            bS: paragraphReplace(obj.breifDescription.value), o: paragraphReplace(obj.option.value), r: paragraphReplace(obj.answerToOption.value), uid: uidOne(), cONC: 'correct'
        };
        obj3.length = obj3.length + 1;
        console.log(obj2);
        console.log(place);
        return place
    } else if (option === 'option2' && typeof obj2 !== 'undefined') {
        let opt = truthy2 === false ? keyLength : obj.itemKey;
        console.log(obj);
        console.log(';lkj;lk;jlk');
        console.log(opt);
        obj2[opt] = {
            s: obj.s, itemKey: opt, length: 0,
            dB: obj.dB,
            dIW: obj.dIW, pFN: obj.pFN,
            bS: paragraphReplace(obj.bS), o: paragraphReplace(obj.o), r: paragraphReplace(obj.r), uid: obj.uid, cONC: 'correct'
        };
        fPath.push(String(opt));
        sessionStorage.setItem('fPath', JSON.stringify(fPath));
        obj3.length = obj3.length + 1;
        console.log(obj2);
        console.log(place);
        saveToIndexedDB('menuObject', {id: JSON.stringify(place)}, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
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
        obj2.cONC = "correct";
        return place

    }
    sessionStorage.setItem('option', null);
    return false
};



let retrieveInformation = (e) => {
    e.preventDefault();
    let el = document.getElementById('main');
    el.classList.add('hidden')
    let el2 = document.getElementById('retrievalDivBox');
    el2.classList.remove('hidden');   
    let obj = gatherInfoViaPath(fPath);
    let el3 = document.getElementById('retreivalTextArea');
    el3.textContent = JSON.stringify(obj);

    



};
let inputInformation = (e) => {
    e.preventDefault();
    let el = document.getElementById('main');
    el.classList.add('hidden')
    let el2 = document.getElementById('inputDiv');
    el2.classList.remove('hidden');


    
};
let copy = (e) => {
    e.preventDefault();
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    sessionStorage.setItem('copyObj', JSON.stringify(obj));
        
};
let paste = (e) => {
    e.preventDefault();
   // debugger;
    let item = JSON.parse(sessionStorage.getItem('copyObj'));
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let option = 'entire';
    let obj2 = {};
    if (option === 'entire' && typeof obj2.bS !== 'undefined') {
       
                
    } 
    console.log(item);
    uidH(item);    
    setTimeout(()=> {
    location.reload();
    }, 50);
};
let backFromRetrieval = (e) => {
    e.preventDefault();
    let el = document.getElementById('retrievalDivBox');
    el.classList.add('hidden')
    let el2 = document.getElementById('main');
    el2.classList.remove('hidden');
};
let copyToClipboardRetrieval = (e) => {
    e.preventDefault();
    
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    let json = JSON.stringify(obj);
    let el3 = document.getElementById('sucClipboardCopy');
    navigator.clipboard.writeText(json).then(response => {
        el3.textContent = 'Success!';
        
    }).catch(erro => {
        el3.textContent = 'There was a problem please try again!';
    });
    
};
let backFromInput = (e) => {
    e.preventDefault();
    let el = document.getElementById('inputDiv');
    el.classList.add('hidden')
    let el2 = document.getElementById('main');
    el2.classList.remove('hidden');
    
};
let insertInformationPage = (e) => {
    e.preventDefault();
    
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    // let obj = gatherInfoViaPath(fPath);
    let el = document.getElementById('saveTextArea');
    let complete = false;
    try {
        let info = JSON.parse(el.textContent);
        uidH(info, false);   
        complete = true;    
    } catch {
        el.textContent = 'There was a problem with the inforamtion entered. It likely was not valid json structure. Please try again and refraim from altering the text';
    }
    if (complete) {
    setTimeout(()=>{
    location.reload();
    },90); 
}
};
let pasteInfoPage = (e) => {
    e.preventDefault();
    // let json = sessionStorage.getItem('copyObj');
    let asyncFuncytionPasteClipboard = async () => {
        let text = await navigator.clipboard.readText();
        let el3 = document.getElementById('saveTextArea');
        el3.textContent = text;
    };
    asyncFuncytionPasteClipboard();
    // setTimeout(()=>{
    //     location.reload();
    // },90); 
};

