exports.up = (knex) => {
  return knex.schema.createTable('transactions', (t) => {
    t.increments('id').primary();
    t.string('description').notNull();
    t.enum('type', ['I', 'O']).notNull();
    t.date('date').notNull();
    t.decimal('amount', 15, 1).notNull();
    t.boolean('status').notNull().default(false);
    t.integer('account_id')
      .references('id')
      .inTable('accounts')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('transactions');
};
