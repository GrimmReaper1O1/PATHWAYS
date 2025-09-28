let pressFunction = (e, opt) => {
    e.preventDefault();
    let initialDiv = document.getElementById('initial');
    initialDiv.classList.add('hidden');
    sessionStorage.removeItem('fPath2');
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
    sessionStorage.removeItem('fPath2');
    for (let key in obj) {
        nObj = obj[key];
        if (typeof nObj !== 'undefined' && typeof nObj.bS !== 'undefined') {
           
                func = `selectFunkytion(event, 'second', '${key}')`;
        
                console.log(key);
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
    let el2 = document.getElementById('trainingDiv');
    el2.classList.add('hidden');
    let img = document.createElement('img');
    img.setAttribute('src', "./IMAGES/"+imageFileName);
    img.classList.add('image-height-100')
    el.appendChild(img);
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
        if (opt === 'second') {
            console.log(opt2);
        let fPath1 = [];
        let fPath2 = [];
            console.log('second');
            if (sessionStorage.getItem('fPath2') !== null) {
                fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
                if (back && followed) {
                    fPath2[fPath2.length-1].pop();
                    fPath2[fPath2.length-1].pop();
                }
                if (followed) {
                    // fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
                    resumeObj = gatherInfoViaPath(fPath2[fPath2.length-2]);
                }
                // if (followed) {

                
                for (let i = 0; i < fPath2[fPath2.length-1].length; i++) {
                fPath1.push(fPath2[fPath2.length-1][i]);
                }
                // }
            }
            if (!back && !followed) {
        fPath1.push(opt2)
        fPath2.push(fPath1);
            }
        console.log()
        if (back && followed && fPath2.length > 2) {
            fPath2.pop();
         
        } else if (back && followed) {
            fPath2.pop();
          
        }
        console.log(fPath2);
        console.log(opt2);
        // if (followed) {
    //    }
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
        console.log(fPath2);
        let obj = gatherInfoViaPath(fPath2[fPath2.length-1]);
        let string = '';
        let numeral;
          numeral = 'second';
       
        if (typeof obj.dB !== 'undefined') {
            if (obj.dB !== '') {
                displayImageOnScreenBreifly(obj.pFN, obj.s);
            }
            if (obj.dIW !== '') {
                string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" class="image-height-100"/></div>`;
 
            }
        }
        let fPathNum = fPath2[fPath2.length-1];
        console.log(fPathNum);
        fPathNum = fPathNum[fPathNum.length-1];
        string += `<br><br><br>`;
        console.log(fPathNum);
        
        if (fPath2.length === 1) {
        string += `<button onclick="loopMods()" class="selectionbutton">BACK</button><br><br>`;
        
        } else {
        string += `<button onclick="selectFunkytion(event, 'second', '${fPathNum}', 'true', false, true)" class="selectionbutton">BACK</button><br><br>`;
        }
        if (followed && !back) {
            string += `<p>${paragraphReplace(resumeObj.l)}</p>`
        } else if (obj.type === 'module') {

             string += `<p>${paragraphReplace(obj.i)}</p>`;
       
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
             
            numeral = 'third';
        
                string += `<button class="selectionbutton" onclick="selectFunkytion(event, '${numeral}', '${links[i][links[i].length-1]}', false, 'a${i}')">`;
                string += `Option: ${counter} <br>`;
              
                    string += '<p>' + paragraphReplace(tempObj.o) + '</p>';
            
                string += `</button><br><br>`;
                console.log(links[i]);
                sessionStorage.removeItem(`a${i}`)
                sessionStorage.setItem(`a${i}`, JSON.stringify(links[i]));
                }
        }
        let trainingInfo = document.getElementById('info');
        trainingInfo.innerHTML = string;
    } else if (opt = 'third') {
        console.log(link);
        let link2 = JSON.parse(sessionStorage.getItem(link));
        
        console.log(opt2);
        console.log(link2);
        let fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
        
        sessionStorage.setItem('lastPath', sessionStorage.getItem('fPath2'));
        fPath2.push(link2);
        console.log(fPath2);
        sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
  
        selectFunkytion(e, 'second', opt2, false, false, true);
       
      
    }

}
let rand = (min, max) => {
    return Math.floor(Math.random() * (max - min +1) +min)
}
// let automatedFunkytion = (e, key, start = true, back = false) => {
//     e.preventDefault();
//     let fPath2;
 
//     if (start) {
//         fPath2 = [];
        
//     } else {
//         fPath2 = JSON.parse(sessionStorage.getItem('fPath2'));
        
//     }
//     if (back) {
//     fPath2.pop();
//     fPath2.pop();
//     if (fPath2.length === 0) loopMods(false);
//     }
//     if (start) {
//             fPath2.push(key);
//         sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
    
//     }

       
//         if (!start) {
    
//         fPath2.push(key);
//         sessionStorage.setItem('fPath2', JSON.stringify(fPath2));
//         } 

//         let obj = gatherInfoViaPath(fPath2);
//         let string = '';
//         let start2;
//         if (fPath2.length > 2) {
//             start2 = false;
//         } else {
//             start2= true;
//         }
//         if (typeof obj.dB !== 'undefined') {
//             if (obj.dB === 'on') {
//                 displayImageOnScreenBreifly(obj.pFN, obj.s);
//             }
//             if (obj.dIW === 'on') {
//                 string += `<br><br><br><div id="trainingImage" class="margin-auto width-80"><img src="./IMAGES/${obj.pFN}" class="image-height-100"/></div>`;
   
//             }
//         }
//         string += `<br><br><br>`;
//         string += `<button onclick="automatedFunkytion(event, '${fPath2[fPath2.length-2]}', ${start2}, 'true')" class="selectionbutton">BACK</button><br><br>`;
//         if (start) {
//         string += `<p>${paragraphReplace(obj.i)}</p>`;
        
//         } else {
//         string += `<p>${paragraphReplace(obj.r)}</p>`;
//         }
//         let obj2;
//         let keyArr = [];
//         let counter = -1;
//         for (let key in obj) {
//             obj2 = obj[key];
        
//             if (typeof obj2.bS !== 'undefined') {
//                 keyArr.push(key);
//                 counter = counter +1;
//             } 
//         }
//         let selectionNumeral = rand(0, (keyArr.length-1));
   
//         let selectedKey = keyArr[selectionNumeral];
//         if (typeof obj[selectedKey] !== 'undefined') {
//         string += `<p onclick="automatedFunkytion(event, '${selectedKey}', false)">` + paragraphReplace(obj[selectedKey].o) + '</p>';
//         string += `<button onclick="automatedFunkytion(event, '${selectedKey}', false)" class="selectionButton">ONWARD!</button>`;
//         }
//         let trainingInfo = document.getElementById('info');
//         trainingInfo.innerHTML = string;
 
// }