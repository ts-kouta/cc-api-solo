/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("memo").del();
  await knex("memo").insert([
    { memo: "memo1", create_date: "2024-01-01", update_date: null },
    {
      memo: "memo2",
      create_date: "2024-01-02",
      update_date: "2024-01-04",
    },
    { memo: "memo3", create_date: "2024-01-03", update_date: null },
  ]);
};
