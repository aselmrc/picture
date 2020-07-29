const postData = async (url, data) => {
    console.log(url)
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

const getResource = async (url) => {

    let res = await fetch();

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.text();
};

export {postData, getResource};