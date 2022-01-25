

// Searching for single name:

let submit = document.getElementById('searchForm')
submit.addEventListener("submit", onFormSubmit)

function onFormSubmit(submit) {
    let personName = document.getElementById('search').value
    submit.preventDefault();

    async function getCountryName() {
        try {
            const response = await fetch(`https://api.nationalize.io?name=${personName}`);
            const countryData = await response.json();
            const res = await fetch(`https://restcountries.com/v2/all`)
            const restCountryData = await res.json();

            function printData(data) {
                //To populate card
                let result = document.getElementById('results')
                result.innerHTML = `
                <div class="card" style="width: 18rem;">
                <div class="card-header" id="personName">
                <b>Name: ${data.name}</b>
    
                </div>
                <ul class="list-group list-group-flush" id="listItems">
    
                </ul>
                </div>
                `


                //To populate data within card
                let listContainer = document.getElementById('listItems')
                let listli = ""
                for (const key in data.country) {
                    restCountryData.forEach(element => {
                        if (element.alpha2Code === data.country[key].country_id) {
                            return listli += `<li class="list-group-item">Country Name: ${element.name}<br>Country Code: ${data.country[key].country_id}<br>Probability: ${(data.country[key].probability * 100).toFixed(2)}%</li>`
                        }
                    })

                }

                listContainer.innerHTML = listli

            }
            printData(countryData)

        } catch (err) {
            console.error(err)
        }
    }

    getCountryName()
}


//Searching for Multiple Names

let submit2 = document.getElementById('searchForm2')
submit2.addEventListener("submit", onFormSubmit2)

function onFormSubmit2(submit) {
    submit.preventDefault();
    let peopleNames = document.getElementById('search2').value.replace(/\s+/g, '').split(',')
    console.log(peopleNames)

    async function getCountryName2() {
        try {
            // Making url with String operation:
            let str = ''
            for (let i = 0; i < peopleNames.length; i++) {
                str += `name=${peopleNames[i]}&`
            }
            let url = `https://api.nationalize.io?${str}`
            console.log(url)


            // Fetching the data:
            const response = await fetch(url);
            const countryData2 = await response.json();
            console.log(countryData2)

            // Function To Print Data
            function printData(data) {
                let result = document.getElementById('results2')

                //To Populate cards for each persons data
                data.forEach((element) => {
                    result.innerHTML += `
                    <div class="card my-3 mx-3" style="width: 18rem;">
                    <div class="card-header">
                        <b>Name: ${element.name}</b>
                    </div>
                    <ul class="list-group list-group-flush">
                    
                    </ul>
                </div>
                    `
                })


                //To Populate cards for each card
                data.forEach((element) => {
                    var listContainer = document.getElementsByTagName('ul')

                    let listli = ""

                    for (const key in element.country) {
                        listli += (`<li class="list-group-item">Country Code: ${element.country[key].country_id}<br>Probability: ${(element.country[key].probability * 100).toFixed(2)}%</li>`)
                    }

                    for (let i = 0; i < listContainer.length; i++) {
                        listContainer[i].innerHTML = listli
                    }
                })

            }
            printData(countryData2)

        } catch (err) {
            console.error(err)

        }
    }
    getCountryName2();

}


