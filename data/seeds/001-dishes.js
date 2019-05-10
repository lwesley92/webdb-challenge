exports.seed = function(knex, Promise) { 
    return knex('dishes').truncate()
    .then(function () {
        return knex('dishes').insert([
            .then(function () {
                return knex('dishes').insert([
                { name: 'Tacos' }, 
                { name: 'Pastas' },
                { name: 'Burgers' },
                { name: 'Chili' },
                { name: 'Salads' },
            ])
        })
   ])