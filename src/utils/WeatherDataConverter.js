const updateState = (data) => {
    const tempDays = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
        const currentData = data.list[dayIndices[i]];
        tempDays.push({
            date: currentData.dt_txt,
            weather_desc: currentData.weather[0].description,
            icon: currentData.weather[0].icon,
            temp: currentData.main.temp,
        });
    }

    const forecast = {
        weather: tempDays,
        city: data.city
    }    
    
    return forecast;
};


// returns array with Indices of the next five days in the list from the API data (every day at 12:00 pm)
const getDayIndices = (data) => {
    
    let dayIndices = [0];
    let currentDay = data.list[0].dt_txt.slice(8, 10);

    for (let i = 1; i < data.list.length; i++) {
        let day = data.list[i].dt_txt.slice(8, 10);
        let hour = data.list[i].dt_txt.slice(11, 13);

        if (day !== currentDay && hour === "12") {
            dayIndices.push(i);
            currentDay = day;

            // Stop after finding 4 different days
            if (dayIndices.length === 5) {
                break;
            }
        }
    }
    

    return dayIndices;
};


export default updateState;