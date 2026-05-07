



let getAndDisplayObjectsInfo = () => {
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    if (obj.type === 'module') {
            let el3 = document.getElementById('introduction');
            let el4 = document.getElementById('introductionLabel');
        el3.classList.remove('hidden');
        el4.classList.remove('hidden');
    }
    enterInformationIntoFields(obj);

}
let blankFields = () => {
    let fieldObj = fieldHelper();
      fieldObj.secs.value = '';
        fieldObj.displayBefore.checked = '';
        fieldObj.displayImageWhile.checked = '';
        fieldObj.picName.value = '';
        fieldObj.breifDescription.value = '';
        fieldObj.option.value = '';
        fieldObj.answerToOption.value = '';
        fieldObj.cONC.checked = '';
        fieldObj.type.checked = '';
        fieldObj.info.value = '';
        fieldObj.l.value = '';
        fieldObj.lPath.checked = '';
}

let pressFunction3 = (e, opt) => {
    e.preventDefault();
    let el2 = document.getElementById('menuSelection');
    el2.classList.add('hidden');
    let path = JSON.parse(sessionStorage.getItem('fPath'));
    if (opt === 'alter') {
    let el = document.getElementById('fieldPane');
    el.classList.remove('hidden');
    sessionStorage.setItem('option', 'alter');
    getAndDisplayObjectsInfo();
    } else if (opt === 'module') {
        let els = document.getElementById('failureSystem');
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
        let insertTag = document.getElementById('insert');
        insertTag.classList.remove('hidden');
        let intro = document.getElementById('introduction2');
        intro.classList.remove('hidden');
        let el = document.getElementById('messageDiv');
        el.classList.remove('hidden');
        let el1 = document.getElementById('moduleField');
        el1.classList.remove('hidden');
        let obj = {};
        obj.intro = intro.value;
        obj.modName = el1.value;
        
        
    } else {
        el2.classList.remove('hidden');
        els.innerHTML = '<p>Please deselect the levels.</p>';
    }
    } else if (opt === 'option') {

        if (path.length > 0) {
            let modSav = document.getElementById('modSav');
            modSav.classList.add('hidden');
            let el1 = document.getElementById('deleteInfo');
            el1.classList.add('hidden');
            let el = document.getElementById('fieldPane');
            el.classList.remove('hidden');
            sessionStorage.setItem('option', 'option');
            blankFields();

        } else {
            el2.classList.remove('hidden');
        }
    } 
};

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



let save = (e) => {
    e.preventDefault();
    let el2 = document.getElementById('fieldPane');
    el2.classList.add('hidden')
    let el = document.getElementById('messageDiv');
    el.classList.remove('hidden');
    let el5 = document.getElementById('message');
    el5.textContent = 'Are you sure you want to save the information?';
   
}



let moHelp = (e) => {
        e.preventDefault();
        let intro = document.getElementById('introduction2');
        let el1 = document.getElementById('moduleField');
        let obj = {};
        obj.intro = intro.value;
        obj.modName = el1.value;

   
        let fPath = JSON.parse(sessionStorage.getItem('fPath'));
      
        findPathAndSave(fPath, obj, 'module');
    setTimeout(()=>{
        location.reload();
    }, 100);
    };


