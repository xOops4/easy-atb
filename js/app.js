const toggleScreen = (screen) => {
    document.querySelector('.active').classList.remove('active')
    document.querySelector('#'+screen).classList.add('active')
}


const getSpecialite = () => {
    let div = document.querySelector('#specialite');
    let render = `<div class="spacer p5"></div>`;

    fetch('./data/atb.json')
    .then(response => response.json())
    .then(data => {
        let specialites = data[0].list_specialite

        specialites.forEach(element => {
            render += `
                 <section class="center spe" style="background: ${element.couleur}; color: ${element.color}" onClick="getIntervention('${element.code}');">
                    <span class="big-icon material-icons-round">${element.icon}</span>
                    <div class="subtitle">${element.nom}</div>
                </section>
            `
        });
        div.innerHTML = render;
    });
}

const getIntervention = (specialite = 'vasculaire') => {
    console.log(specialite);
    let div = document.querySelector('#intervention');
    let render = ``;

    fetch('./data/atb.json')
    .then(response => response.json())
    .then(data => {
        console.log(data[0].list_specialite);
        let selectedSpecialite = data[0].list_specialite.filter( e => e.code == specialite)

        render = `
        <div class="sub-header"  style="background: ${selectedSpecialite[0].couleur}; color: ${selectedSpecialite[0].color}">
            <div class="f2 center">
                <span class="material-icons-round">${selectedSpecialite[0].icon}</span>
            </div>
            <div class="f6">${selectedSpecialite[0].nom}</div>
        </div>
`;
        let interventions = data[0].data.filter( e => e.specialite == specialite)
        console.log(interventions)

         interventions.forEach(element => {
            render += `
            <div class="tile" id="${element.chir_code}" onClick="selectIntervention('${element.chir_code}');">
                <div class="tile-title">
                     ${element.intervention}
                </div>
                <div class="display-atb">${element.display}</div>
                <div class="main-atb">${element.main_atb}</div>
                `
                if ( element.alternate_atb != '') {
                    render += `
                    <div class="subtitle-atb">Alternative :</div>
                    <div class="alternate-atb">${element.alternate_atb}</div>
                    `
                }
                if ( element.allergy_atb != '') {
                    render += `
                    <div class="subtitle-atb">Si allergie :</div>
                    <div class="allergy-atb">${element.allergy_atb}</div>
                    `
                }
                render += `
            </div>
            `
        });
        div.innerHTML = render; 
        toggleScreen('intervention')
    });
}

const selectIntervention = (chir_code) => {
    if ( document.querySelector('.selected') == document.querySelector('#'+chir_code)) {
        document.querySelector('.selected').classList.remove('selected')
    } else {
        if ( document.querySelector('.selected') != null ) {
            document.querySelector('.selected').classList.remove('selected')
        }
        document.querySelector('#'+chir_code).classList.add('selected') 
    }


}


getSpecialite();