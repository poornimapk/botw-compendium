let monsters = [];
let currentMonsterIndex = 0;

window.onload = async (event) => {
    await serviceLayer();
}

function serviceLayer() {
    let url = 'https://botw-compendium.herokuapp.com/api/v2/category/monsters';
    return fetch(url)
        .then(res => res.json()) // parse response as JSON
          .then(data => {
            //console.log(data);           
            monsters = data.data;
            console.log(monsters);
            currentMonsterIndex = 0;
            displayMonster();
            /* if(!nIntervId) {
                nIntervId = setInterval(displayMonster, 3000);                
            } */
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
}

function displayMonster() {
    console.log('Before Display index' + currentMonsterIndex);
    let movieImg = document.getElementById('monster-img');
    let enemyName = document.getElementById('name');
    let locations = document.getElementById('locations');
    let drops = document.getElementById('drops');
    movieImg.src = monsters[currentMonsterIndex].image;
    enemyName.innerText = monsters[currentMonsterIndex].name;
    let tempLocations = '';
    monsters[currentMonsterIndex].common_locations.forEach((location) => {
        tempLocations += location + ', ';
    })
    locations.innerText = tempLocations;
    let tempDrops = '';
    monsters[currentMonsterIndex].drops.forEach((drop) => {        
        tempDrops += drop + ', ';
    })
    drops.innerText = tempDrops; 
}

const leftArrow = document.getElementById('arrow-left');
leftArrow.addEventListener('click', leftArrowClicked);

function leftArrowClicked() {
    if(currentMonsterIndex < 0) {
        currentMonsterIndex = 0;
    } else {
        currentMonsterIndex--;
    }
    displayMonster();
}

const rightArrow = document.getElementById('arrow-right');
rightArrow.addEventListener('click', rightArrowClicked);

function rightArrowClicked() {
    if(currentMonsterIndex >= monsters.length) {
        currentMonsterIndex = 0;
    } else {
        currentMonsterIndex++;
    }
    displayMonster();
}