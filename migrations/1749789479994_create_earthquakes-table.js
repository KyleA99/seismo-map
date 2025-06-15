/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('earthquakes', {
        earthquakeId: {
            type: 'serial',
            primaryKey: true,
        },
        id: {
            type: 'varchar(25)',
            notNull: true
        },
        magnitude: {
            type: 'numeric(3, 5)',
            notNull: true
        },
        location: {
            type: 'varchar(200)',
            notNull: true
        },
        depth: {
            type: 'numeric(3, 5)',
            notNull: true
        },
        time: {
            type: 'timestamp',
            notNull: true
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        earthquakeEn: {
            type: 'boolean',
            notNull: true,
            default: true
        }
    })
};



/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('earthquakes');
};
