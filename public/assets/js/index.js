
document.addEventListener('DOMContentLoaded', () => {
    if (screen.width <= 600) {
        document.getElementById("viewport").setAttribute("content", "width=600; initial-scale=0.8");
    }

    // GLOBAL VARIABLES
    let PUSHED = false;
    let HAS_ERROR = false;
    
    // clearing data from localStorage
    window.localStorage.setItem('filter_free', '')
    window.localStorage.setItem('filter_paid', '')
    window.localStorage.setItem('filter_government', '')
    window.localStorage.setItem('filter_private', '')
    
    // elements
    const Str = {
        button: 'show-all-btn'
    }
    const search_form = document.querySelector(".search");
    const search_input = document.querySelector(".search__input");
    const selectBox = document.querySelector(".selectBox");
    const sub_selectBox = document.querySelector(".sub-selectBox");
    const sub_selectBoxItems = document.querySelectorAll(".sub-selectBox-box__option");
    const allHopitals = [...document.querySelectorAll("tbody tr")].map(el => el.outerHTML);
    const allHopitalsTypes = [...document.querySelectorAll(".hospital-type")]
    const tableBody =  document.querySelector("table tbody");

        
    document.addEventListener("DOMNodeInserted", e => {
        if (HAS_ERROR) {
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
                HAS_ERROR = !window.localStorage.getItem('filter_all') ? true : false;
                data = window.localStorage.getItem('filter_all') ? JSON.parse(window.localStorage.getItem('filter_all')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
                PUSHED = window.localStorage.getItem('filter_all') ? false : true;
            } else if (value === "government") {
                HAS_ERROR = !window.localStorage.getItem('filter_government') ? true : false;
                data = window.localStorage.getItem('filter_government') ? JSON.parse(window.localStorage.getItem('filter_government')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
                PUSHED = window.localStorage.getItem('filter_government') ? false : true;
            } else if (value === "private") {
                HAS_ERROR = !window.localStorage.getItem('filter_private') ? true : false;
                data = window.localStorage.getItem('filter_private') ? JSON.parse(window.localStorage.getItem('filter_private')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
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
                HAS_ERROR = !window.localStorage.getItem('filter_all') ? true : false;
                data = window.localStorage.getItem('filter_all') ? JSON.parse(window.localStorage.getItem('filter_all')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
                PUSHED = window.localStorage.getItem('filter_all') ? false : true;
            } else if (value === "free") {
                HAS_ERROR = !window.localStorage.getItem('filter_free') ? true : false;
                data = window.localStorage.getItem('filter_free') ? JSON.parse(window.localStorage.getItem('filter_free')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
                PUSHED = window.localStorage.getItem('filter_free') ? false : true;
            } else if (value === "paid") {
                HAS_ERROR = !window.localStorage.getItem('filter_paid') ? true : false;
                data = window.localStorage.getItem('filter_paid') ? JSON.parse(window.localStorage.getItem('filter_paid')) : [`
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `]
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
            PUSHED = false;
            
            allHopitalsNames.forEach(el => {
                el.parentElement.parentElement.classList.add("hidden")

                if (el.innerText.toLowerCase().trim().includes(value)) {
                    el.parentElement.parentElement.classList.remove("hidden")
                    // data.push(el.parentElement.parentElement.outerHTML);
                    PUSHED = true;
                }
            })
            
            
            
            
        }
        
        if ( !PUSHED ) {
            if (data.length === 0) {
                tableBody.innerHTML = ""
                PUSHED = true;
                HAS_ERROR = true;
                data.push( `
                    <div class="no-results" style="display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; list-style: none; margin-top: 5rem; ">
                        <li class="title">No Results Found</li>
                        <a class="button-primary show-all-btn" style="margin-top: 2.5rem">
                            <span>Show All</span> 
                        </a>
                    </div>
                `
                );
                tableBody.insertAdjacentHTML('beforeend', data)
            }
            
        }
        

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
