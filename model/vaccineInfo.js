const axios = require('axios');

module.exports = async(id, date) => {
    try {
        const response = await axios(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Microsoft Edge\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "sec-fetch-site": "cross-site",
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
                ":authority": "cdn-api.co-vin.in",
                ":method": "GET",
                ":scheme": "https",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
              }
        });

        const data = response.data.centers;
   
        return data;
        
    } catch (error) {
        console.log(error);
    }
}




