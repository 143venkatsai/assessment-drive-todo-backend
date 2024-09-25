/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').truncate()
  await knex('todos').insert([
    {
      description:"Do Workout"
  },
  {
      description:"DO Coding"
  },
  {
      description:"Study React"
  },
  {
      description:"Study Node"
  }
  ]);
};
