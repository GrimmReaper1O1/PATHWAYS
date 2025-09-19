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
