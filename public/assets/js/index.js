document.addEventListener('DOMContentLoaded', () => {
    // GLOBAL VARIABLES
    let PUSHED = false;
    
    // clearing data from localStorage
    window.localStorage.setItem('filter_free', '')
    window.localStorage.setItem('filter_paid', '')
    window.localStorage.setItem('filter_government', '')
    window.localStorage.setItem('filter_private', '')

    // elements
    const search_form = document.querySelector(".search");
    const search_input = document.querySelector(".search__input");
    const selectBox = document.querySelector(".selectBox");
    const sub_selectBox = document.querySelector(".sub-selectBox");
    const allHopitals = [...document.querySelectorAll("tbody tr")].map(el => el.outerHTML);
    const allHopitalsTypes = [...document.querySelectorAll(".hospital-type")]
    const tableBody =  document.querySelector("table tbody");

    // EVENTS
    // selecting cities
    selectBox.addEventListener("change", (e) => {
        window.location.pathname = e.target.value.split(" ").join("_").toLowerCase(); 
    })

    // selecting filter
    sub_selectBox.addEventListener("change", (e) => {
        PUSHED = false;
        const value =  e.target.value.toLowerCase();


        if (value && window.location.pathname.includes("/bed-status")) {
            tableBody.innerHTML = ""
            let data;
            if ( value === 'all') {
                data = window.localStorage.getItem('filter_all') ? JSON.parse(window.localStorage.getItem('filter_all')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_all') ? false : true;
            } else if (value === "government") {
                data = window.localStorage.getItem('filter_government') ? JSON.parse(window.localStorage.getItem('filter_government')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_government') ? false : true;
            } else if (value === "private") {
                data = window.localStorage.getItem('filter_private') ? JSON.parse(window.localStorage.getItem('filter_private')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_private') ? false : true;
            }


            return data.forEach(data => (
                tableBody.insertAdjacentHTML('beforeend', data)
            ))
        }
        else if (value && window.location.pathname.includes("/vaccine-info")) {
            tableBody.innerHTML = ""
            let data;
            if ( value === 'all') {
                data = window.localStorage.getItem('filter_all') ? JSON.parse(window.localStorage.getItem('filter_all')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_all') ? false : true;
            } else if (value === "free") {
                data = window.localStorage.getItem('filter_free') ? JSON.parse(window.localStorage.getItem('filter_free')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_free') ? false : true;
            } else if (value === "paid") {
                data = window.localStorage.getItem('filter_paid') ? JSON.parse(window.localStorage.getItem('filter_paid')) : [`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`]
                PUSHED = window.localStorage.getItem('filter_paid') ? false : true;
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
            tableBody.innerHTML = ""
            PUSHED = false;

            if (window.location.pathname.includes("/bed-status")) {
                allHopitalsNames.forEach(el => {
                    if (el.innerText.toLowerCase().trim().includes(value)) {
                        data.push(el.parentElement.parentElement.outerHTML);
                        PUSHED = true;
                    }
                })

            }
            
            else if (window.location.pathname.includes("/vaccine-info")) {
                for (let i = 0; i< allHopitalsAddress.length; i++) {
                    const el = allHopitalsAddress[i];
                    const el2 = allHopitalsNames[i];
                    if (el.innerText.toLowerCase().trim().includes(value)) {
                        data.push(el.parentElement.parentElement.outerHTML);
                        PUSHED = true;
                        continue;
                    }

                    if (el2.innerText.toLowerCase().trim().includes(value)) {
                        data.push(el2.parentElement.parentElement.outerHTML);
                        PUSHED = true;
                        continue;

                    }
                }
                
            }    
        }
        
        if ( !PUSHED ) {
            if (data.length === 0) {
                PUSHED = true;
                data.push(`<li class="title" style="text-align: center; list-style: none; margin-top: 5rem; ">No Results Found</li>`);
            }
            
        }
        data.forEach(data => {
            if (data) {
                tableBody.insertAdjacentHTML('beforeend', data)
            }
        })

        search_input.value = ''
    })

    // storing table filter data
    // 1. ALL
    window.localStorage.setItem('filter_all', JSON.stringify(allHopitals))

    // 2-3 Government, Private
    const list = {}


    allHopitalsTypes.map(el => {
        const type = el.innerText.toLowerCase()
        if (!list[type]) list[type] = [];
        list[type].push(el.parentElement.parentElement.outerHTML);

    })

    if (list.free) window.localStorage.setItem('filter_free', JSON.stringify(list.free))
    if (list.paid) window.localStorage.setItem('filter_paid', JSON.stringify(list.paid))
    if (list.government) window.localStorage.setItem('filter_government', JSON.stringify(list.government))
    if (list.private) window.localStorage.setItem('filter_private', JSON.stringify(list.private))


});
