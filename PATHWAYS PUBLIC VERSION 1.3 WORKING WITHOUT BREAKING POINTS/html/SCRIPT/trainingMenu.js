let arr = [];
// sessionStorage.setItem('classP', JSON.stringify(arr));
sessionStorage.setItem('path', JSON.stringify(arr));
// sessionStorage.setItem('fPath', JSON.stringify(arr));

let counter2 = 0;
let fPath = [];
let path = [];
let classP = [];
let toggleToggle = true;
let reflow = () => {
    let element = document.getElementById('menu');
    setTimeout(() => { let width = element.offsetHeight; }, 200);
}    





let menu = {
    INVENTORY: {
        name: 'INVENTORY',
        item: false,

    },    
};    



let one, two, three, four, five, six, seven, eight, idf1, idf2, idf3, idf4, idf5, idf6, idf7, idf8, idf9;




var toggleFunc = (e, toggleNum) => {
    e.preventDefault();
    let uIDButtonList = JSON.parse(sessionStorage.getItem('uidList'));




    let classPath = sessionStorage.getItem('classP');
    let pa = sessionStorage.getItem('path');
    let fP = sessionStorage.getItem('fPath');

    
    if (pa !== null) { path = JSON.parse(pa); }
    
    
    if (fP !== null) { fPath = JSON.parse(fP); }
    if (classPath !== null) { classP = JSON.parse(classPath); }
    
    


    let elArray = document.getElementsByClassName(e.target.id);

    if (!classP.includes(e.target.id) && typeof classP[toggleNum] === 'undefined') {
console.log('one');
        for (let i = 0; i < elArray.length; i++) {
            elArray[i].classList.remove('hidden');
 
        }
    } else if (classP[classP.length - 1] == e.target.id && classP.length - 1 == toggleNum) {
        // console.log('hopefully final test');
        let elArray2 = document.getElementsByClassName(e.target.id);
        if (elArray2[0].classList.contains('hidden')) {
            
        }
        for (let i = 0; i < elArray.length; i++) {
            if (elArray2[i].classList.contains('hidden')) {
                elArray[i].classList.remove('hidden');
            } else {
                elArray[i].classList.add('hidden');
            }

        }
    } else if (classP[classP.length - 1] === e.target.id) {
        // console.log('zerotest')

        if (elArray[0].classList.contains('hidden')) {
            for (let i = 0; i < elArray.length; i++) {
                elArray[i].classList.remove('hidden');
            }
          
        } else {

            for (let i = 0; i < elArray.length; i++) {
                elArray[i].classList.add('hidden');

            }
        }

    } else if (toggleNum <= classP.length - 1) {
        // // // // // console.log(path);
        // console.log('onetest');
        let counter = 0;
        let elArray2 = []
        if (classP.includes(e.target.id)) {
            // // // // // console.log('includes');
            let index = toggleNum;
            for (let i = classP.length - 1; i > index; i--) {
                elArray2[counter] = document.getElementsByClassName(classP[i]);

                for (let a = 0; a < elArray2[counter].length; a++) {
                    elArray2[counter][a].classList.add('hidden');
                }
                counter++;

            }
        } else {
            // // // // // console.log('threetest');
            let pL = classP.length;
            for (let i = pL - 1; i > toggleNum - 1; i--) {
                elArray2[counter] = document.getElementsByClassName(classP[i]);
                for (let a = 0; a < elArray2[counter].length; a++) {
                    elArray2[counter][a].classList.add('hidden');
                }
                counter++;
            }
            for (let i = 0; i < elArray.length; i++) {
                elArray[i].classList.remove('hidden');
                
            }
            
            
        }
    }
    
    
    let length = classP.length - 1;
    let endPos = classP.length;


    if (((!classP.includes(e.target.id) || classP[length].includes(e.target.Id)) && 
    ((classP.length) === toggleNum) || (classP.length === (toggleNum + 1)) && 
    !(classP.length >= toggleNum))) {

        let elo = document.getElementById(e.target.id);
        // // console.log(elo.classList.contains('blue'));
        if (elo.classList.contains('blue')) {
            elo.classList.remove('blue');
            elo.classList.add(uIDButtonList[elo.id].tempColor);
            classP.pop();
            fPath.pop();
            path.pop();
        } else {
            // // console.log('what the');
            elo.classList.remove(uIDButtonList[elo.id].tempColor);
            elo.classList.add('blue');
            classP.push(e.target.id);
            path.push(e.target.id);
            fPath.push(e.target.name);
        }
        console.log('one')
    } else if ((classP[length] == e.target.id && length == toggleNum)) {
        console.log('two');
        let el5 = document.getElementById(e.target.id);

        if (el5.classList.contains('blue')) {
            el5.classList.remove('blue');
            el5.classList.add(uIDButtonList[e.target.id].tempColor);
            classP.pop();
            path.pop();
            fPath.pop();

        } else {
            el5.classList.remove(uIDButtonList[e.target.id].tempColor);
            el5.classList.add('blue');
            // may require push here
            
        }

    } else if (endPos - 1 == (toggleNum)) {
        console.log('three');
        //altered endPos
        let el6 = document.getElementById(classP[endPos - 1]);
        if (classP[length] !== e.target.id) {
            if (el6.classList.contains('blue')) {
                el6.classList.remove('blue');
                el6.classList.add(uIDButtonList[el6.id].tempColor);
                classP.pop();
                fPath.pop();
                path.pop();
                // // // // // console.log('here');

                let el7 = document.getElementById(e.target.id);
                el7.classList.remove(uIDButtonList[el7.id].tempColor);
                el7.classList.add('blue');
                classP.push(e.target.id);
                fPath.push(e.target.name);
                path.push(e.target.id);
            }
        } else {
            el6.classList.remove('blue');
            el6.classList.add(uIDButtonList[el6.id].tempColor);
            classP.pop();
            path.pop();
            fPath.pop();
        }

    }

    //changed this to -1
    else if (classP.length >= toggleNum) {
        // console.log('four');
        let index = toggleNum;
        let el2;
        if (classP.length-1 !== toggleNum) {
        // for (let i = path.length - 1; i >= index; i--) {
          
        //     console.log('one1');
  
        //     //    fPath.pop();
        //     }
        for (let i = classP.length - 1; i >= index; i--) {
            
            
            console.log('two');
            
            el2 = document.getElementById(classP[i]);
            el2.classList.remove('blue');
                el2.classList.add(uIDButtonList[el2.id].tempColor);
                
                path.pop();
                classP.pop();
                     fPath.pop();
                //    path.pop();
            }
            
        } else {
            classP.pop();
        }
            // // console.log(classP.length, toggleNum);
            if (path.length - 1 === toggleNum) {
                fPath.push(e.target.name);
                path.push(e.target.id);
                
            // console.log('three');
            }
            
            let el3 = document.getElementById(e.target.id);
            if (!(classP[classP.length - 1] === e.target.id)) {
                // debugger;
            // console.log('four1');
                classP.push(e.target.id);
                // console.log(el3.classList.contains('blue'));
            if (!el3.classList.contains('blue')) {


                if (e.target.id === classP[classP.length-1]) {
                    // console.log('here');
                    if (classP.length-1 === toggleNum) {
                        let el = document.getElementById(classP[classP.length-1]);
                        el.classList.remove('blue')
                        el.classList.add(uIDButtonList[classP[classP.length-1]].tempColor);
                        classP.pop();
                        classP.push(e.target.id);
                        path.push(e.target.id);
                        fPath.push(e.target.name);
                        el3.classList.remove(uIDButtonList[classP[classP.length-1]].tempColor);
                        el3.classList.add('blue');
                        // console.log(classP);
                        // console.log(fPath);
                        // console.log(path);
                    } else {
                    el3.classList.remove('blue');
                    el3.classList.add(uIDButtonList[el3.id].tempColor);
                    classP.pop();
                    path.pop();
                    fPath.pop();
                    }
                } else {
                el3.classList.remove(uIDButtonList[el3.id].tempColor); 
                el3.classList.add('blue');
                // // console.log('five1');
                // console.log('six1');
                path.push(e.target.id);
                fPath.push(e.target.name);
                }
            } else {
                
            // console.log('six');
                el3.classList.remove('blue');
                el3.classList.add(uIDButtonList[el3.id].tempColor);
                classP.pop();
                path.pop();
                fPath.pop();    
            }
        } else {
            el3.classList.remove('blue');
            classP.pop();
            path.pop();
            fPath.pop();
            
            // // console.log('seven');
        }
        
    } else {
        
        //might be fucked in relation to targ here
        // console.log('five');
        let el2;
        let targ;
        let index = toggleNum;
        targ = document.getElementsByClassName(e.target.id);
        if (!targ[0].classList.contains('blue')) {

            for (let i = classP.length - 1; i >= index; i--) {
                // // console.log('got here 2')
                el2 = document.getElementById(classP[i]);
                el2.classList.remove('blue');
                el2.classList.add(uIDButtonList[el2.id].tempColor);
                if (!(classP[i] === e.target.id))
                    classP.pop();
                    path.pop();
                    fPath.pop();
            }
            classP.push(e.target.id);
            // // // // // console.log(classP);
            // // // // // console.log(path);
            // // // // // console.log(fPath);
            for (let i = 0; i < targ.length; i++) {
                // // // // // console.log(targ[i]);
                targ[i].classList.remove(targ[i].id)
                targ[i].classList.add('blue');
            }
        }
    }

    reflow();
    // // // // // console.log(';asdfjlas;f;kjlk');
   
    // console.log(classP);
    // console.log(path);
    // console.log(fPath);
    // // // // // console.log(path); 
    console.log(fPath);
    console.log(classP);
    sessionStorage.setItem('path', JSON.stringify(path));
    sessionStorage.setItem('classP', JSON.stringify(classP));
    sessionStorage.setItem('fPath', JSON.stringify(fPath));
    console.log(sessionStorage.getItem('fPath'));
}


let openMenu = (path, buttonList) => {
    let el, el2;
    console.log(path);
    console.log(buttonList);
    for (let i = 0; i < path.length; i++)  {
        el = document.getElementById(path[i]);
        el2 = document.getElementsByClassName(path[i]);
        el.classList.remove(buttonList[path[i]].tempColor);
        el.classList.add('blue');
        el2[0].classList.remove('hidden');
        console.log('gothere');
    }
    return

}











let createMenu = (obj) => {
    console.log(obj);
    let createMenu2 = (ob, st = '', c = 0, uid = {}, numeralC = 0) => {
        let obj = ob;
        let uidList = uid;
        let counter = c;
        let string2 = '';
        let string3 = '';
        let string4 = '';
        if (typeof st !== 'undefined') {
            string2 += st;
        }
        let numeralCounter = numeralC;
        let obj1 = false;
        let obj2 = {};
        obj2['0'] = '';
        let count = 0;
        let temp;
        // // console.log(obj);
        let newObj;
        let newerObj;
        let placement = {}
        for (let itemKey in obj) {
          
            newObj = obj[itemKey];

            if (typeof newObj.bS !== 'undefined') {
                // // console.log(itemKey);
                // // console.log(newObj);
                uidList[newObj.uid] = { tempColor: newObj.cONC};
                // // console.log(uidList);


                string2 += `<button id="${newObj.uid}" name="${newObj.itemKey}" value="${newObj.bS}" onclick="toggleFunc(event, ${counter})" `;
                string2 += `class="selectionButtonMenuList button ${uidList[newObj.uid].tempColor}">OPTION: ${Number(newObj.itemKey)+1} LEVEL: ${counter+1} ${newObj.bS}</button><br>`;
                string2 += `<div class="${newObj.uid} hidden">`;
                counter = counter + 1;
                for (let keys in newObj) {
                    // // console.log(keys)
                    newerObj = newObj[keys];
                    // // console.log(newerObj);
                    if (typeof newerObj.bS !== 'undefined') {
                        // // console.log(newerObj);
                        placement['0'] = newerObj;
                        if (count === 0) {
                            obj1 = {};
                            obj1['0'] = '';
                            count = count + 1;
                        }
                        obj2 = createMenu2(placement, string2, counter, uidList, numeralCounter);
                        string2 = obj2['0'];
                        obj1['1'] = obj2['1'];
                        obj1['2'] = obj2['2'];
                    }
                }
                // string3 += '</div>';
                // string2 += string3;                        
                counter = counter - 1
                string4 += '</div>';
                string2 += string4;
                numeralCounter = numeralCounter + 1;
            }
        }
        obj2['2'] = obj2['2'] + 1;

        // // console.log(counter);
        // // console.log(uidList);
        if (obj1 !== false) {
            // // console.log(';lkj;lkjlkj')
            // string += obj1['0']
            obj2['0'] = string2;
            obj2['1'] = obj1['1'];
            obj2['2'] = counter;
            obj2['3'] = numeralCounter;
            obj2['length'] = 3;

            return obj2
        } else if (obj1 === false) {
            // // console.log('here');
            obj2['0'] += string2;
            obj2['1'] = uidList;
            obj2['2'] = counter;
            obj2['3'] = numeralCounter;
            obj2['length'] = 3;

            return obj2
        } else {
            return false
        }
    }
    let uidL = {}
    let menuStringArr = createMenu2(obj, '', 0, uidL);
    // // console.log(menuStringArr);
    let string4 = menuStringArr['0'];
    sessionStorage.setItem('uidList', JSON.stringify(menuStringArr['1']));
    let string5 = '';
    for (let i = 0; i < menuStringArr['3']; i++) {
        string5 += '</div>';
    }
    if (menuStringArr) {
        return menuStringArr['0'] + string5;
    } else {
        return false;
    }
}


let runMenu = () => {
setTimeout(() => {
    // // console.log('here');
    let obj = JSON.parse(sessionStorage.getItem('menu'));
    // // console.log(obj);
    let menuboxel = document.getElementById("menuBoxEl");
    // // console.log(obj);
    let objMenu = createMenu(obj);
    // // console.log(objMenu);
    if (objMenu !== false) {
        // let uIDButtonList = arr['1'];
        menuboxel.innerHTML = objMenu;

    }
    //     openMenu(path, classP, obj);
    // }
    let uIDButtonList = JSON.parse(sessionStorage.getItem('uidList'));
    let path = JSON.parse(sessionStorage.getItem('classP'));
    console.log(path);
    if (path !== null) {
    openMenu(path, uIDButtonList);
    } else {
       let path = [];
     
       sessionStorage.setItem('fPath', JSON.stringify(path));
       sessionStorage.setItem('classP', JSON.stringify(path));
    }

}, 300)
}
runMenu();
