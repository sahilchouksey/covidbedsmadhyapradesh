// local
const hospitalData = require("../model/hospitalData");

// json
const citiesList = require("../list.json");


module.exports = (app) => {
    

    app.get("/",  (req, res) => {
        res.redirect('/jabalpur');
    })

    app.get("/:id", (req, res) => {
        const city = req.params.id;

        let isCityAvailable = false;

        citiesList.forEach((city_obj) => {
            if (city_obj.city_name.toLowerCase().split(" ").join("_").trim() === city.toLowerCase()) isCityAvailable = true;
        })
        
        if (isCityAvailable) {
            return res.redirect(`/city/${city}/bed-status`);
        } else {
            res.render("page404")
        }

    })

    app.get("/city/:id/:dataType", async (req, res) => {
        const city = req.params.id;


        const data_type = req.params.dataType;

        const currentDate = new Date();
        const currrent_date = currentDate.getDate();
        const currrent_month = currentDate.getMonth() + 1;
        const currrent_year = currentDate.getFullYear();

        const fullDate= `${currrent_date}-${currrent_month}-${currrent_year}`;

        console.log(fullDate);

        // Finding city id
        let ids;
        citiesList.forEach((city_obj) => {
            if (city_obj.city_name.toLowerCase().split(" ").join("_") === city.toLowerCase()) {        
                ids = {
                    hospitalID: city_obj.hospitalInfoID,
                    vaccineID: city_obj.vaccinationInfoID
                }
            }
        })

        if (data_type === "bed-status") {
            let data  = await hospitalData(city.toLowerCase())
            
            const url = {}
            url.data_type = data_type

            console.log(data.length);
            if (!data || data.length < 1) {
                return res.render("page404")

            }

            return res.render("index", { data: data, data_type: url})
        }
        
        else if (data_type === "vaccine-info") {
            const url = {}
            url.data_type = data_type

            return res.render("vaccine-info", { data_type: url})
        }
    })


    app.get("*",  (req, res) => {
        res.render("page404")
    })

}
