const db = require('../data/dbConfig.js');

module.exports = {
    getDishes,
    getDish,
    addDish,
}

function getDishes() {
    return db('dishes')
};

function getDish(id) {
    return db('dishes')
    .join('recipes', 'recipes.dish_id', 'dishes.id')
    .select({
        dish: 'dishes.name',
        recipe: 'recipes.name',
        recipe_id: 'recipes.id',
        id: 'dishes.id'
    })
    .where({ "dishes.id": id })
}


function findById(id) {
    return db('dishes')
    .where({ id })
    .first()
}

function addDish(dish) {
    return db('dishes')
    .insert(dish, 'id')
    .then(id => {
        return findById(id[0])
    })
}