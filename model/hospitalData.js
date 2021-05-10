const axios = require('axios');


module.exports = async(city_name) => {
    // request(`http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=${id}&facility_org_type=0&facility=0&show=200&pagenum=1`, 
    // (error, response, html) => {
    //     const $ = cheerio.load(html)
    //     var nodes = $(".hospital-status tbody tr .hospitalname")
        
    //     var data = nodes.map((i, node) => {
    //         const item = $(node)
    //         const parent = item.parent().parent();
    
    //         const numberCommon = parent.next().find("td .card-body").children("span")
           
    
    //         const nucity_namembers = [
    //             [
    //                 numberCommon.first().text().trim().split(":")[0].trim(), parseInt(numberCommon.first().text().trim().split(":")[1])
    //             ],
    //             [
    //                 numberCommon.first().next().text().trim().split(":")[0].trim(), parseInt(numberCommon.first().next().text().trim().split(":")[1])
    //             ],
    //             [
    //                 numberCommon.first().next().next().text().trim().split(":")[0].trim(), parseInt(numberCommon.first().next().next().text().trim().split(":")[1])
    //             ]
    //         ]
    
    //         const num1 = {},
    //               num2 = {},
    //               num3 = {}
    
    //         num1[numbers[0][0]] = numbers[0][1]
    //         num2[numbers[1][0]] = numbers[1][1]
    //         num3[numbers[2][0]] = numbers[2][1]
    
    
    //         const hospital = item.text().trim();
    
    //         const hospitalName =  hospital.includes("शासकीय") ? hospital.split("शासकीय")[0].trim() : hospital.split("निजी")[0].trim();
    
    //         let hospitalType = "";
    //         if (hospital.includes("शासकीय")) hospitalType = "Government"
    //         else if (hospital.includes("निजी")) hospitalType = "Private"
    
    //         return { 
    //             hospitalname: hospitalName, 
    //             hospitaltype: hospitalType,
    //             bedstatus: parent.children(".text-center").children(".bed-status").text(),
    //             isolationbeds: parent.find(".deecriptions ul").children().first().text().split(":")[1].trim(),
    //             oxygensupported: parent.find(".deecriptions ul").children().first().next().text().split(":")[1].trim(),
    //             reservedICU_HDU: parent.find(".deecriptions ul").children().last().text().split(":")[1].trim(),
    //             numbers: [
    //                 num1,
    //                 num2,
    //                 num3
    //             ],
    //             package: item.next().find("a").last().attr('href'),
    //             lastUpdate: parent.find(".last-updated span").text().trim()
    //         }
    //     })
    
    //     // console.log(nodes);
    
    //     console.log(data.map(el => el));
    
    // })

    const list = {}
    try {
        const response = await axios.get("https://api.covidbedsindia.in/v1/storages/608983ca03eef3dd7ad05a75/Madhya%20Pradesh");

        const data = response.data;
        data.map((city) => {
            const district_name = city.DISTRICT.toLowerCase().trim().split(" ").join("_");
    
            if (!list[district_name]) list[district_name] = [];
            list[district_name].push(city);
        })

        
        return list[city_name]
        
    } catch (error) {
        console.log(error);
    }

}




