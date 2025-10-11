
let pressFunction2 = (e, opt) => {
    e.preventDefault();
    let el = document.getElementById('main');
    if (opt === 'retrieve' || opt === 'input') {
        el.classList.add('hidden')

    }
    if (opt === 'retrieve') {
    let el2 = document.getElementById('retrievalDivBox');
    el2.classList.remove('hidden');
    let obj = gatherInfoViaPath(fPath);
    let el3 = document.getElementById('retreivalTextArea');
    let obj2 = {};
    obj2.lastPath = fPath;
    obj2.obj = obj
    el3.textContent = JSON.stringify(obj2);

    } else if (opt === 'input') {
    let el2 = document.getElementById('inputDiv');
    el2.classList.remove('hidden');


    } else if (opt === 'copy') {
        let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    // if (fPath.length !== 0) {
    sessionStorage.setItem('lastPath', fPath);
    let obj = gatherInfoViaPath(fPath);
    sessionStorage.setItem('copyObj', JSON.stringify(obj));
    sessionStorage.setItem('lastPath', JSON.stringify(fPath));
    // }
    } else if (opt === 'paste') {
        if (sessionStorage.getItem('copyObj') !== null) {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
   if (sessionStorage.getItem('copyObj') !== null) {
    let info = JSON.parse(sessionStorage.getItem('copyObj'));
    let obj = uidH(false, info, false);

    let place = JSON.parse(sessionStorage.getItem('menu'));
    
    if (typeof obj.bS !== 'undefined') {
        
       place = findPathAndSave(place, fPath, obj, 'option4', false, true);
        
    } else {
     
        place = findPathAndSave(place, fPath, obj, 'option4', false, false);
    }
    // if (fPath.length !== 0) {

    // place = findAndReplaceLinks(place, fPath, 'option4');
        
    // }
    sessionStorage.setItem('menu', place);
    saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
    setTimeout(() => {
        location.reload();
    }, 50);
}
   }
    } 
};

let pressBack = (e, opt) => {
    e.preventDefault();
    if (opt === 'retrieval') {
    let el = document.getElementById('retrievalDivBox');
    el.classList.add('hidden')
    } else if (opt === 'input') {
    let el = document.getElementById('inputDiv');
    el.classList.add('hidden')
    }
    let el2 = document.getElementById('main');
    el2.classList.remove('hidden');
}

let copyToClipboardRetrieval = (e) => {
    e.preventDefault();

    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    let obj2 = {};
    obj2.lastPath = fPath;
    obj2.obj = obj
    let json = JSON.stringify(obj2);
    let el3 = document.getElementById('sucClipboardCopy');
    navigator.clipboard.writeText(json).then(response => {
        el3.textContent = 'Success!';

    }).catch(erro => {
        el3.textContent = 'There was a problem please try again!';
    });

};
let insertInformationPage = (e) => {
    e.preventDefault();

            let place = JSON.parse(sessionStorage.getItem('menu'));

    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    // let obj = gatherInfoViaPath(fPath);
    let el = document.getElementById('saveTextArea');
    let complete = false;
    // try {
        let info = {};
       info = JSON.parse(el.value);
    sessionStorage.setItem('lastPath', JSON.stringify(info.lastPath));
        console.log(info);
     
    let obj = uidH(false, info.obj, false);
    console.log(obj);
    if (typeof obj.bS !== 'undefined') {
        console.log('oijopijopno;kjno');
        place = findPathAndSave(place, fPath, obj, 'option4', false, true);
        
    } else {
        
       place =  findPathAndSave(place, fPath, obj, 'option4', false, false);
    }
    // if (fPath.length !== 0) {
    //   place = findAndReplaceLinks(place, fPath, 'option4');
        
    // }
    complete = true;
    sessionStorage.setItem('menu', place);
    saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');

    // } catch {
    //     el.textContent = 'There was a problem with the inforamtion entered. It likely was not valid json structure or there are too many entries. Please try again and refraim from altering the text';
    // }
    if (complete) {
        setTimeout(() => {
            location.reload();
        }, 90);
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
  
};
// enter into functions.js
// use this one





