import type { Knex } from "knex";

const tableName = "blog_posts";
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("author_id").notNullable();
        table.foreign("author_id").references("id").inTable("users").onDelete("CASCADE");
        table.string("title").notNullable();
        table.text("content").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

