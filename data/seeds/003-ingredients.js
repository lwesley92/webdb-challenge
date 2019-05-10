exports.seed = function(knex, Promise) {
   
    return knex('ingredients').truncate()
      .then(function () {
       
        return knex('ingredients').insert([
          { name: '1lb Ground Beef'},
          { name: 'Can of Diced Tomatoes'},
          { name: 'Large Onion'},
          { name: 'Can of Kidney beans'}
        ]);
      });
  };