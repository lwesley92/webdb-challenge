const db = require('../data/dbConfig.js');

module.exports = {
    getActions,
    getById,
    addAction,
    destroyAct, 
    updateAct
};

function getActions() {
    return db('actions')
    .then(actions => actions.map(obj => changeBoolean(obj)))
};

function getById(id) {
    return db('actions')
    .where({ id })
    .first()
    .then(obj => changeBoolean(obj))
};

function addAction(action) {
    return db('actions')
    .insert(action)
    .then(id => {
        return getById(id[0])
    })
};

function destroyAct(id) {
    return db('actions')
    .where({ id })
    .first()
    .del()
}

function updateAct(id, changes) {
    return db('actions')
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            return getById(id)
        } else {
            return null
        }
    });
};

// Changing boolean from 0/1 to true/false. WORKS PRAISETHESUN
function changeBoolean(obj) {
    return {
        ...obj,
        complete: obj.complete ? true : false
    }
};