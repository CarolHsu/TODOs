const index = (callback) => {
    return fetch(`/events`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
};

const create = (options, callback) => {
    const summary = options.summary
    const startTime = options.startTime
    return fetch(`/events?summary=${summary}&startTime=${startTime}`, {
        method: 'POST',
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
};

const destroy = (id, callback) => {
    return fetch(`/event/{id}`, {
        method: 'DELETE',
        accept: "application/json"
    })
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
    create,
    destroy
};

export default Client;
