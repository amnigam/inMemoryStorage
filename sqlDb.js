const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

// We don't pass a file name here because we don't want to store
// anything on disk
const db = connect();

async function prepare() {
  await db.query(sql`
    CREATE TABLE app_data (
      id VARCHAR NOT NULL PRIMARY KEY,
      value VARCHAR NOT NULL
    );
  `);
}
const prepared = prepare();

async function set(id, value) {
    await prepared;
    await db.query(sql`
      INSERT INTO app_data (id, value)
        VALUES (${id}, ${value})
      ON CONFLICT (id) DO UPDATE
        SET value=excluded.value;
    `);
  }
  
  async function get(id) {
    await prepared;
    const results = await db.query(sql`
      SELECT value FROM app_data WHERE id=${id};
    `);
    if (results.length) {
      return results[0].value;
    } else {
      return undefined;
    }
  }
  
  async function remove(id) {
    await prepared;
    await db.query(sql`
      DELETE FROM app_data WHERE id=${id};
    `);
  }
  
// module.exports.db = db; 
module.exports.set = set; 
module.exports.get = get; 
module.exports.remove = remove; 
