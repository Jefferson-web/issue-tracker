function searchParams(search) {
    var result = {};
    const searchParams = new URLSearchParams(search);
    for (var entrie of searchParams.entries()) {
        result[entrie[0]] = entrie[1];
    }
    return result;
}

function toQueryString(paramsObject) {
    return Object
        .keys(paramsObject)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        .join('&')
}

export { searchParams, toQueryString };