const index = (callback) => {
    return fetch(`/events`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
};

const create = (summary, callback) => {
    return fetch(`/events?summary=${summary}`, {
        method: 'POST',
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
};

const parseJSON = (response) => {
    return response.json();
};

const Client = {
    index,
    create
};

export default Client;
