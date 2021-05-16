// import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  if (screen.width <= 600) {
    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=600, initial-scale=0.8');
  }
    // GLOBAL VARIABLES
    const LOCATIONLEN = window.location.pathname.split("/").length;
    const CITY_NAME = window.location.pathname.split("/city")[1].split("/vaccine-info")[0].replace("/", "").trim();
    let PUSHED = false;


    
    // clearing data from localStorage
    window.localStorage.setItem('filter_free', '')
    window.localStorage.setItem('filter_paid', '')
    window.localStorage.setItem('filter_government', '')
    window.localStorage.setItem('filter_private', '')

    // elements
    const body = document.querySelector("body");
    const search_form = document.querySelector(".search");
    const search_input = document.querySelector(".search__input");
    const selectBox = document.querySelector(".selectBox");
    const sub_selectBox = document.querySelector(".sub-selectBox");
    const sub_selectBoxItems = document.querySelectorAll(".sub-selectBox-box__option");

    const allHopitals = [...document.querySelectorAll("tbody tr")].map(el => el.outerHTML);
    const allHopitalsTypes = [...document.querySelectorAll(".hospital-type")]
    const tableBody =  document.querySelector("table tbody");
    const constcityTitleWrapper = document.querySelector(".city-title-wrapper");

    // Cities list
    const citiesList = [
        {
          "city_name": "Agar Malwa",
          "hospitalInfoID": 46,
          "vaccinationInfoID": 320
        },
        {
          "city_name": "Alirajpur",
          "hospitalInfoID": 14,
          "vaccinationInfoID": 357
        },
        {
          "city_name": "Anuppur",
          "hospitalInfoID": 43,
          "vaccinationInfoID": 334
        },
        {
          "city_name": "Ashoknagar",
          "hospitalInfoID": 10,
          "vaccinationInfoID": 354
        },
        {
          "city_name": "Balaghat",
          "hospitalInfoID": 22,
          "vaccinationInfoID": 338
        },
        {
          "city_name": "Barwani",
          "hospitalInfoID": 15,
          "vaccinationInfoID": 343
        },
        {
          "city_name": "Betul",
          "hospitalInfoID": 30,
          "vaccinationInfoID": 362
        },
        {
          "city_name": "Bhind",
          "hospitalInfoID": 8,
          "vaccinationInfoID": 351
        },
        {
          "city_name": "Bhopal",
          "hospitalInfoID": 1,
          "vaccinationInfoID": 312
        },
        {
          "city_name": "Burhanpur",
          "hospitalInfoID": 16,
          "vaccinationInfoID": 342
        },
        {
          "city_name": "Chhatarpur",
          "hospitalInfoID": 37,
          "vaccinationInfoID": 328
        },
        {
          "city_name": "Chhindwara",
          "hospitalInfoID": 23,
          "vaccinationInfoID": 337
        },
        {
          "city_name": "Damoh",
          "hospitalInfoID": 38,
          "vaccinationInfoID": 327
        },
        {
          "city_name": "Datia",
          "hospitalInfoID": 12,
          "vaccinationInfoID": 350
        },
        {
          "city_name": "Dewas",
          "hospitalInfoID": 47,
          "vaccinationInfoID": 324
        },
        {
          "city_name": "Dhar",
          "hospitalInfoID": 18,
          "vaccinationInfoID": 341
        },
        {
          "city_name": "Dindori",
          "hospitalInfoID": 29,
          "vaccinationInfoID": 336
        },
        {
          "city_name": "Guna",
          "hospitalInfoID": 13,
          "vaccinationInfoID": 348
        },
        {
          "city_name": "Gwalior",
          "hospitalInfoID": 9,
          "vaccinationInfoID": 313
        },
        {
          "city_name": "Harda",
          "hospitalInfoID": 31,
          "vaccinationInfoID": 361
        },
        {
          "city_name": "Hoshangabad",
          "hospitalInfoID": 32,
          "vaccinationInfoID": 360
        },
        {
          "city_name": "Indore",
          "hospitalInfoID": 17,
          "vaccinationInfoID": 314
        },
        {
          "city_name": "Jabalpur",
          "hospitalInfoID": 24,
          "vaccinationInfoID": 315
        },
        {
          "city_name": "Jhabua",
          "hospitalInfoID": 19,
          "vaccinationInfoID": 340
        },
        {
          "city_name": "Katni",
          "hospitalInfoID": 25,
          "vaccinationInfoID": 353
        },
        {
          "city_name": "Khandwa",
          "hospitalInfoID": 20,
          "vaccinationInfoID": 339
        },
        {
          "city_name": "Khargone",
          "hospitalInfoID": 21,
          "vaccinationInfoID": 344
        },
        {
          "city_name": "Mandla",
          "hospitalInfoID": 26,
          "vaccinationInfoID": 335
        },
        {
          "city_name": "Mandsaur",
          "hospitalInfoID": 48,
          "vaccinationInfoID": 319
        },
        {
          "city_name": "Morena",
          "hospitalInfoID": 6,
          "vaccinationInfoID": 347
        },
        {
          "city_name": "Narsinghpur",
          "hospitalInfoID": 27,
          "vaccinationInfoID": 352
        },
        {
          "city_name": "Neemuch",
          "hospitalInfoID": 49,
          "vaccinationInfoID": 323
        },
        {
          "city_name": "Panna",
          "hospitalInfoID": 39,
          "vaccinationInfoID": 326
        },
        {
          "city_name": "Raisen",
          "hospitalInfoID": 2,
          "vaccinationInfoID": 359
        },
        {
          "city_name": "Rajgarh",
          "hospitalInfoID": 3,
          "vaccinationInfoID": 358
        },
        {
          "city_name": "Ratlam",
          "hospitalInfoID": 50,
          "vaccinationInfoID": 322
        },
        {
          "city_name": "Rewa",
          "hospitalInfoID": 33,
          "vaccinationInfoID": 316
        },
        {
          "city_name": "Sagar",
          "hospitalInfoID": 40,
          "vaccinationInfoID": 317
        },
        {
          "city_name": "Satna",
          "hospitalInfoID": 34,
          "vaccinationInfoID": 333
        },
        {
          "city_name": "Sehore",
          "hospitalInfoID": 4,
          "vaccinationInfoID": 356
        },
        {
          "city_name": "Seoni",
          "hospitalInfoID": 28,
          "vaccinationInfoID": 349
        },
        {
          "city_name": "Shahdol",
          "hospitalInfoID": 44,
          "vaccinationInfoID": 332
        },
        {
          "city_name": "Shajapur",
          "hospitalInfoID": 51,
          "vaccinationInfoID": 321
        },
        {
          "city_name": "Sheopur",
          "hospitalInfoID": 7,
          "vaccinationInfoID": 346
        },
        {
          "city_name": "Shivpuri",
          "hospitalInfoID": 11,
          "vaccinationInfoID": 345
        },
        {
          "city_name": "Sidhi",
          "hospitalInfoID": 35,
          "vaccinationInfoID": 331
        },
        {
          "city_name": "Singrauli",
          "hospitalInfoID": 36,
          "vaccinationInfoID": 330
        },
        {
          "city_name": "Tikamgarh",
          "hospitalInfoID": 41,
          "vaccinationInfoID": 325
        },
        {
          "city_name": "Ujjain",
          "hospitalInfoID": 52,
          "vaccinationInfoID": 318
        },
        {
          "city_name": "Umaria",
          "hospitalInfoID": 45,
          "vaccinationInfoID": 329
        },
        {
          "city_name": "Vidisha",
          "hospitalInfoID": 5,
          "vaccinationInfoID": 355
        }
    ]
    
    // Finding city id
    let ids;
    citiesList.forEach((city_obj) => {
        if (city_obj.city_name.toLowerCase().split(" ").join("_") === CITY_NAME.toLowerCase()) {        
            ids = {
                hospitalID: city_obj.hospitalInfoID,
                vaccineID: city_obj.vaccinationInfoID
            }
        }
    })
    
    
    // API CALL
    const currentDate = new Date();
    const currrent_date = currentDate.getDate();
    const currrent_month = currentDate.getMonth() + 1;
    const currrent_year = currentDate.getFullYear();

    const fullDate= `${currrent_date}-${currrent_month}-${currrent_year}`;


    // Model
    const vaccineData = async(id, date) => {
        try {
            
            const response = await axios(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`);
    
            const data = response.data.centers;
       
            return data;
            
        } catch (error) {
            console.log(error);
        }
    }
    
    // View
    const displayTableListItem = (item, i) => {
        const mockUp = `
            <tr>

                <td class="hospital-name title hospital-td medium" >
                  

                  <span class="hospital-name-text">
                        ${item.name}
                    </span>
                    <span class="hospital-address">
                        ${item.address ? item.address + '\n' : "-"},
                        ${item.block_name ? item.block_name : "-"},
                        ${item.district_name ? item.district_name : "-"},
                        ${item.pincode ? item.pincode : "-"}
                    </span>

                    <div class="hospital-type small-text--bold">${item.fee_type}</div>

                        
                </td>

                <td class="session-wrp title desktop-row text-center vaccine-wrapper" >
                    <div>
                      ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-1 small-text--bold">session-1:</span>' : ""}
                      <span class="availability vaccine-name">${item.sessions[0] ? item.sessions[0].vaccine : "-"}</span>
                      <span class="vaccination-age-limit age-filter"> age: ${item.sessions[0] ? item.sessions[0].min_age_limit : ""}+ </span>

                      ${item.sessions[1] ?
                        `
                          ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-2 small-text--bold">session-2:</span>' : ""}
                          <span class="availability">${item.sessions[1] ? item.sessions[1].vaccine : "-"}</span>
                          <span class="vaccination-age-limit"> age: ${item.sessions[1] ? item.sessions[1].min_age_limit : ""}+ </span>
                        
                        `
                        : ""
                      }
                    </div>
                </td>

                <td class="slots-wrp title desktop-row text-center" >
                    <div class="${(item.sessions[0] && item.sessions[1]) ? 'h-100' : ''}">
                      ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-1 small-text--bold">session-1:</span>' : ""}
                      <span class="availability ${(item.sessions[0] && item.sessions[0].available_capacity !== null) ? (parseInt(item.sessions[0].available_capacity) > 0 ? 'green-bg' : 'red-bg' ) : ''}">${(item.sessions[0] && item.sessions[0].available_capacity) ? item.sessions[0].available_capacity : "0" }</span>
                    
                      ${item.sessions[1] ?
                        `
                          ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-2 small-text--bold">session-2:</span>' : ""}
                          <span class="availability ${(item.sessions[1] && item.sessions[1].available_capacity !== null) ? (parseInt(item.sessions[1].available_capacity) > 0 ? 'green-bg' : 'red-bg' ) : ''}">${(item.sessions[1] && item.sessions[1].available_capacity) ? item.sessions[1].available_capacity : "0" }</span>
                        `
                        : ""
                      }
                    </div>
                </td>
                <td class="slots-wrp title desktop-row text-center" >
                      <div class="${(item.sessions[0] && item.sessions[1]) ? 'h-100' : ''}">
                        ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-1 small-text--bold">session-1:</span>' : ""}
                        <span class="vaccination-date">${(item.sessions[0] && item.sessions[0].date) ? item.sessions[0].date : "-"}</span>
                        ${item.sessions[1] ?
                          `
                            ${(item.sessions[0] && item.sessions[1]) ? '<span class="session-2 small-text--bold">session-2:</span>' : ""}
                            <span class="vaccination-date">${(item.sessions[1] && item.sessions[1].date) ? item.sessions[1].date : "-"}</span>
                          `
                          : ""
                        }
                      </div>
                </td>



                <td class="small-text--bold text-center hidden mobile-row mobile-row-td" >
                    <div class="vaccine-data">
                        <p>Vaccine</p> 

                        <span class="availability">${item.sessions[0] ? item.sessions[0].vaccine : "-"}</span> -
                        <span class="vaccination-age-limit"> age: ${item.sessions[0] ? item.sessions[0].min_age_limit : ""}+ </span>
                    </div>

                    <div class="vaccine-capacity-data">
                        <p>Capacity</p> 

                        <span class="availability ${(item.sessions[0] && item.sessions[0].available_capacity !== null) ? (parseInt(item.sessions[0].available_capacity) > 0 ? 'green-bg' : 'red-bg' ) : '' }">${(item.sessions[0] && item.sessions[0].available_capacity) ? item.sessions[0].available_capacity : "0" }</span>
                    </div>

                    <div class="vaccination-date-mobile">
                        <p>Date</p> 


                        <span class="vaccination-date">${(item.sessions[0] && item.sessions[0].date) ? item.sessions[0].date : "-"}</span>
                    </div>
                </td>

            </tr>
  
        `;

        tableBody.insertAdjacentHTML("beforeend", mockUp)
    }


    

    const displaySubHeading = (data) => {
        const mockUp = `<h2 class="title city-title">Vaccination centers of Covid-19 ${data && `in ${data[0].district_name} district`}</h2> `;

        constcityTitleWrapper.insertAdjacentHTML("beforeend", mockUp);

    } 

    // loader
    const elStr = {
        loader : 'loader'
    };

    const renderLoader = parent => {
        const loader = `
            <div class=${elStr.loader}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 40 40" style="stroke: #5F2EEA">
                    <circle r="15.9154943092" strokeWidth="10"></circle>
                </svg>
            </div>`;
    
        parent.insertAdjacentHTML('afterbegin', loader)
    };

    const clearLoader = () => {
        const loader = document.querySelector(`.${elStr.loader}`);
        if (loader) loader.parentNode.removeChild(loader)
    }

    // Controller
    const HospitalListController = async() => {
        try {
            renderLoader(body);
            const items = await vaccineData(ids.vaccineID, fullDate);

            document.title =  `Vaccination centers of Covid-19 in ${items && items[0].district_name} district | XIX3R`;
            displaySubHeading(items);

            if (items.length === 0) {
                PUSHED = true;
                tableBody.innerHTML = '';
                items.push(`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`);
            }

            items.forEach((item, i) => displayTableListItem(item, i))
                
            
            if (items && tableBody.childElementCount === items.length) {
                const allHopitalsLocally = [...document.querySelectorAll("tbody tr")].map(el => el.outerHTML);
                const allHopitalsTypesLocally = [...document.querySelectorAll(".hospital-type")]
                const allVaccineNameLocally = [...document.querySelectorAll(".vaccine-name")]
                const allAgeGroupLocally = [...document.querySelectorAll(".age-filter")]

                // storing table filter data
                // 1. ALL
                window.localStorage.setItem('filter_all', JSON.stringify(allHopitalsLocally))
    
                // 2-3 Government, Private
                const list = {}
    
    
                allHopitalsTypesLocally.map(el => {
                    const type = el.innerText.toLowerCase()
                    if (!list[type]) list[type] = [];
                    list[type].push(el.parentElement.parentElement.outerHTML);
                })
    
                allVaccineNameLocally.map(el => {
                    const type = el.innerText.toLowerCase()
                    if (!list[type]) list[type] = [];
                    list[type].push(el.parentElement.parentElement.parentElement.outerHTML);
                })
    
                allAgeGroupLocally.map(el => {
                    const type = el.innerText.toLowerCase().split("age:")[1].trim()
                    if (!list[type]) list[type] = [];
                    list[type].push(el.parentElement.parentElement.parentElement.outerHTML);
                })
    
                if (list.free) window.localStorage.setItem('filter_free', JSON.stringify(list.free))
                if (list.paid) window.localStorage.setItem('filter_paid', JSON.stringify(list.paid))
                if (list.covaxin) window.localStorage.setItem('filter_covaxin', JSON.stringify(list.covaxin))
                if (list.covishield) window.localStorage.setItem('filter_covishield', JSON.stringify(list.covishield))
                if (list['18+']) window.localStorage.setItem('filter_18+', JSON.stringify(list['18+']))
                if (list['45+']) window.localStorage.setItem('filter_45+', JSON.stringify(list['45+']))
            }


            clearLoader();
        }
        catch (error) {
            console.log(error);
            clearLoader();
            PUSHED = true;
            tableBody.innerHTML = '';

            displayTableListItem([`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`])

        }
    }
    
    HospitalListController()
    
    
    // EVENTS
    const Str = {
      button: 'show-all-btn'
    }

    document.addEventListener("DOMNodeInserted", e => {
      if (PUSHED) {
          const button = document.querySelector(`.${Str.button}`);
          
          button.addEventListener("click", e => {
              e.preventDefault();
              [...sub_selectBoxItems].forEach(El => El.selected = El.value.toLowerCase() === 'all' ? true : false  )

              const event = new Event('change');

              // Dispatch it.
              sub_selectBox.dispatchEvent(event);
          })
      }
  })

    // selecting cities
    selectBox.addEventListener("change", (e) => {
        window.location.pathname = e.target.value.split(" ").join("_").toLowerCase(); 
    })

    // selecting filter
    sub_selectBox.addEventListener("change", (e) => {
        PUSHED = false;
        const value =  e.target.value.toLowerCase();


        if (value && window.location.pathname.includes("/vaccine-info")) {
            tableBody.innerHTML = ""
            let data;
            if ( value === 'all') {
                data = window.localStorage.getItem('filter_all') ? JSON.parse(window.localStorage.getItem('filter_all')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                PUSHED = window.localStorage.getItem('filter_all') ? false : true;
            } 
            else if (value === "free") {
                data = window.localStorage.getItem('filter_free') ? JSON.parse(window.localStorage.getItem('filter_free')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                PUSHED = window.localStorage.getItem('filter_free') ? false : true;
            } 
            else if (value === "paid") {
                data = window.localStorage.getItem('filter_paid') ? JSON.parse(window.localStorage.getItem('filter_paid')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                PUSHED = window.localStorage.getItem('filter_paid') ? false : true;
            } 
            else if (value === "18+") {
                data = window.localStorage.getItem('filter_18+') ? JSON.parse(window.localStorage.getItem('filter_18+')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                PUSHED = window.localStorage.getItem('filter_18+') ? false : true;
            } 
            else if (value === "45+") {
                data = window.localStorage.getItem('filter_45+') ? JSON.parse(window.localStorage.getItem('filter_45+')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                PUSHED = window.localStorage.getItem('filter_45+') ? false : true;
            } 
            else if (value === "covaxin") {
                  data = window.localStorage.getItem('filter_covaxin') ? JSON.parse(window.localStorage.getItem('filter_covaxin')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                  PUSHED = window.localStorage.getItem('filter_covaxin') ? false : true;
            }
            else if (value === "covishield") {
                  data = window.localStorage.getItem('filter_covishield') ? JSON.parse(window.localStorage.getItem('filter_covishield')) : [`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>`]
                  PUSHED = window.localStorage.getItem('filter_covishield') ? false : true;
            } 


            
          

            return data.forEach(data => (
                tableBody.insertAdjacentHTML('beforeend', data)
            ))
        }
    })


    // searching 
    let prevQuery;
    search_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const allHopitalsNames = [...document.querySelectorAll(".hospital-name-text")]
        const allHopitalsAddress = document.querySelectorAll(".hospital-address") ? [...document.querySelectorAll(".hospital-address")] : []

        const value =  search_input.value.toLowerCase().trim();
        
        let data = [];
        if (value && allHopitalsNames) {
            PUSHED = false;

            for (let i = 0; i< allHopitalsAddress.length; i++) {
                const el = allHopitalsAddress[i];
                const el2 = allHopitalsNames[i];

                el.parentElement.parentElement.classList.add("hidden")
                el2.parentElement.parentElement.classList.add("hidden")

                if (el.innerText.toLowerCase().trim().includes(value)) {
                  el.parentElement.parentElement.classList.remove("hidden")
                  // data.push(el.parentElement.parentElement.outerHTML);
                    PUSHED = true;
                    continue;
                }

                if (el2.innerText.toLowerCase().trim().includes(value)) {
                    el2.parentElement.parentElement.classList.remove("hidden")

                    // data.push(el2.parentElement.parentElement.outerHTML);
                    PUSHED = true;
                    continue;

                }
            }

        }
        
        if ( !PUSHED ) {
          tableBody.innerHTML = ""

          PUSHED = true;
          data.push(`<div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                  <li class="title">No Results Found</li>
                  <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                      <span>Show All</span> 
                  </a>
              </div>`);
            
          tableBody.insertAdjacentHTML('beforeend', data)
            
        }

        

        // data.forEach(data => {
        //     if (data) {
        //         tableBody.insertAdjacentHTML('beforeend', data)
        //     }
        // })

        search_input.value = ''
    })



});
