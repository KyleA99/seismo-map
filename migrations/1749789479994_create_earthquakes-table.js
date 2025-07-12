/**
 * @type {import("node-pg-migrate").ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import("node-pg-migrate").MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("earthquakes", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        earthquake_id: {
            type: "varchar(25)",
            unique: true,
            notNull: true
        },
        latitude: {
            type: "numeric(8, 6)",
            notNull: true
        },
        longitude: {
            type: "numeric(9, 6)",
            notNull: true
        },
        magnitude: {
            type: "numeric(7, 5)",
            notNull: true
        },
        location: {
            type: "varchar(200)",
            notNull: true
        },
        depth: {
            type: "numeric(7, 5)",
            notNull: true
        },
        time: {
            type: "timestamp",
            notNull: true
        },
        fetched_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        raw_data: {
            type: "json",
            notNull: true
        },
        earthquake_en: {
            type: "boolean",
            notNull: true,
            default: true
        }
    })
};



/**
 * @param pgm {import("node-pg-migrate").MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("earthquakes");
};
