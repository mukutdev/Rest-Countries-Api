// selectors
const countryGrid = document.querySelector('.country-grid');
const searchCountryName = countryGrid.getElementsByTagName('div');
const dropdown = document.querySelector('.dropdown');
const filterRegions = document.querySelector('.filterRegion');
const switcher = document.querySelector('.switcher');
const rotate_i = document.querySelector('.uil-angle-down');
const modal = document.querySelector('.modal-container');
const singleDetails = document.querySelector('.single-country-details');

//show dropdown

const showDropdown = () =>
{
    dropdown.classList.toggle('showUl');
    rotate_i.classList.toggle('rotate_i');
}

// dark mode

const toggleMode = () =>
{
    const icon = switcher.querySelector('i');
    const span = switcher.querySelector('span');

    if (icon.classList.contains('uil-moon'))
    {
        icon.classList.toggle('uil-sun');
        span.innerHTML = 'Light Mood'
        document.body.classList.toggle('dark')
    } else
    {
        icon.classList.toggle('uil-moon');
        span.innerHTML = 'Night Mood'
        document.body.classList.toggle('dark')
    }

}
//fetching data from restcountries api

const allCountries = 'https://restcountries.com/v2/all';
fetch(allCountries)
    .then(res => res.json())
    .then(countries => displayAllCountries(countries))

// display all countries
const displayAllCountries = countries =>
{

    countries.forEach(country =>
    {

        const createDiv = document.createElement('div');
        createDiv.setAttribute('class', 'country-info');
        createDiv.innerHTML = `
           <div class="country-img">
                    <img src="${country.flags.png}">
                </div>
                <h2 class="country-name">${country.name}</h2>
                <div class="country-details">
                    <p>Population :<span>${country.population.toLocaleString('en-us')}</span> </p>
                    <p>Region : <span class="regions">${country.region}</span></p>
                    <p>Capital : <span>${country.capital}</span> </p>
                </div>                 
        `

        createDiv.addEventListener('click', () =>
        {
            modal.style.display = 'block';
            showSingleCountryDetails(country)
        });
        countryGrid.appendChild(createDiv);
    })
    // event listener for showing single country details

}

// search function for countries

const searchFunction = () =>
{
    const searchInput = document.getElementById('search').value.toUpperCase();



    for (let i = 0; i < searchCountryName.length; i++)
    {
        let h2 = searchCountryName[i].getElementsByTagName('h2')[0];
        if (h2)
        {
            let textValue = h2.textContent || h2.innerHTML;

            if (textValue.toUpperCase().indexOf(searchInput) > -1)
            {
                searchCountryName[i].style.display = '';
            } else
            {
                searchCountryName[i].style.display = 'none';
            }
        }

    }

}

// region filer functions

const filterRegion = (event) =>
{
    const filterByRegion = event.target.innerText;
    const regionName = document.querySelectorAll('.regions');

    regionName.forEach(regionN =>
    {
        if (regionN.innerText.toUpperCase().includes(filterByRegion.toUpperCase()) || filterByRegion === 'All')
        {
            filterRegions.innerText = filterByRegion;
            regionN.parentElement.parentElement.parentElement.style.display = 'block';
        } else
        {
            regionN.parentElement.parentElement.parentElement.style.display = 'none';
        }
    })
}

// display single country details

const showSingleCountryDetails = country =>
{

    singleDetails.innerHTML = `
    <div class="country-single-img">
                    <img src="${country.flags.png}">
                </div>
               <div class="single-country-details-wrapper">
                     <h2 class="single-country-name">${country.name}</h2>
                    <div class="country-info-wrapper">
                        <div class="single-country-left-site">
                            <p>Native Name  :<span>${country.nativeName}</span></p>
                            <p>Population :<span>${country.population.toLocaleString('en-us')}</span></p>
                            <p>Region : <span class="regions">${country.region}</span></p>
                            <p>Sub region : <span class="regions">${country.subregion}</span></p>
                            <p>Capital : <span>${country.capital}</span> </p>
                        </div>
                        <div class="single-country-right-site">
                            <p>Top Level Domain : <span>${country.topLevelDomain[0]}</span> </p>
                            <p>Region : <span class="regions">${country.region}</span></p>
                            <p>Currencies: <span>${country.currencies.map(currency => currency.code)}</span> </p>
                        </div>
                    </div>

                    <div class="borders">
                    <p class="borders-title">Border Countries:</p>
                    <span class="borders-list">

                    </span>
                    </div>

               </div>
    `

    // border display function 

    function displayBorders()
    {
        const borderBox = document.querySelector('.borders-list')
        const bordersName = country.borders;

        if (bordersName === undefined)
        {
            borderBox.innerHTML = `
              
            <p>No border found</p>
            `
        } else
        {
            for (let i = 0; i < bordersName.length; i++)
            {
                const element = bordersName[i];
                const createAnchor = document.createElement('a');
                createAnchor.innerHTML = `
           <p>${element}</p>
     `
                borderBox.appendChild(createAnchor);

            }
        }


    }
    displayBorders(country);





}
