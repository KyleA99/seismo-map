/**
 * Queries earthquake data from the USGS endpoint.
 * @returns Object
 */
async function queryEarthquakeData() {
    const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=earthquake";

    const response = await fetch(baseUrl);
    const data = await response.json();

    console.log(data);
    return data;
}

queryEarthquakeData();