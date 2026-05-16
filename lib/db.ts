import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

export async function initDB() {
  const wasmPath = path.join(process.cwd(), 'lib/sql-wasm.wasm');
  const buffer = fs.readFileSync(wasmPath);

  const SQL = await initSqlJs({ wasmBinary: new Uint8Array(buffer).buffer });
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE users (id INT, username TEXT, password TEXT, secret TEXT);
    INSERT INTO users VALUES (1, 'admin', 'password', 'FLAG{WELCOME_TO_THE_LAB}');
  `);

  return {
    get: (query: string) => {
      const res = db.exec(query);
      if (res.length === 0) return null;
      // SQLインジェクションの結果を扱いやすくするための簡易変換
      const columns = res[0].columns;
      const values = res[0].values[0];
      const obj: any = {};
      columns.forEach((col, i) => obj[col] = values[i]);
      return obj;
    }
  };
}