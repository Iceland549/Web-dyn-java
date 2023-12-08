function login(credentials) {
    return fetch('localhost', {
        method: 'POST',
        body: JSON.stringify(credentials)
    })
    .then((res) => res.json())
    .then((log => log))
}

function getWorks() {
    return fetch('localhost/works')
    .then((res) => res.json())
    .then(log => log)
}

function getCategories() {
    return fetch('localhost/categories')
    .then((res) => res.json())
    .then(log => log)
}

function createWork(work) {
    return fetch('localhost/works',{
        method: 'POST',
        body: JSON.stringify(work)
    })
    .then((res) => res.json())
    .then(log => log)
}

function deleteWork(id) {
    return fetch('localhost/works' + id,{
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then(log => log)
}