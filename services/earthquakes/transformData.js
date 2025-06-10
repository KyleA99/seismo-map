/**
 * Filters USGS earthquake data and maps it to standard properties.
 *
 * @param {Object} data - The unsanitized data queried from the USGS endpoint.
 * @returns {Object} transformedData - The sanitized/mapped data.
 */
export async function transformData(data) {
    const transformedData = data.features.map(feature => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        location: feature.properties.place,
        depth: feature.geometry.coordinates[2],
        time: new Date(feature.properties.time).toISOString()
    }));

    return transformedData;
}
