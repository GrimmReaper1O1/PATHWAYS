


// let gatherInfoViaPath2 = (path) => {
//     let obj = {};
//     obj = JSON.parse(sessionStorage.getItem('menu'));

//     let location = obj;
//     if (path.length === 0) {
//         location = location[0];
//     }
//     for (let i = 0; i < path.length; i++) {
//         location = location[path[i]];
       
//     }

//     return location;

// };


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
    el3.textContent = JSON.stringify(obj);

    } else if (opt === 'input') {
    let el2 = document.getElementById('inputDiv');
    el2.classList.remove('hidden');


    } else if (opt === 'copy') {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    sessionStorage.setItem('copyObj', JSON.stringify(obj));

    } else if (opt === 'paste') {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
   
    let info = JSON.parse(sessionStorage.getItem('copyObj'));
    let obj = uidH(false, info, false);
   
      if (typeof info.bS !== 'undefined') {
       
        findPathAndSave(fPath, obj, 'option4', false, true);
     
    } else {
       
        findPathAndSave(fPath, obj, 'option4', false, false);
    }
    setTimeout(() => {
        location.reload();
    }, 50);

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
    let json = JSON.stringify(obj);
    let el3 = document.getElementById('sucClipboardCopy');
    navigator.clipboard.writeText(json).then(response => {
        el3.textContent = 'Success!';

    }).catch(erro => {
        el3.textContent = 'There was a problem please try again!';
    });

};
let insertInformationPage = (e) => {
    e.preventDefault();

    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    // let obj = gatherInfoViaPath(fPath);
    let el = document.getElementById('saveTextArea');
    let complete = false;
    // try {
        let info = {};
       info = JSON.parse(el.value);
        console.log(info);
      let obj =  {}
    obj = uidH(false, info, false);
      if (typeof info.bS !== 'undefined') {
       
        findPathAndSave(fPath, obj, 'option4', false, true);
     
    } else {
       
        findPathAndSave(fPath, obj, 'option4', false, false);
    }
      complete = true;
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
    // setTimeout(()=>{
    //     location.reload();
    // },90); 
};
// enter into functions.js
// use this one





