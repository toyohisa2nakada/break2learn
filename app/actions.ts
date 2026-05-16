'use server'
import { initDB } from '@/lib/db';

export async function loginServerAction(prevState: any, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  const db = await initDB();

  // 【重要】わざと脆弱にしています。
  // 入力された文字をそのまま命令文（SQL）に合体させています。
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  try {
    const user = await db.get(query);
    console.log(`SQL query=${query}, results=${user}`);
    if (user) {
      return { message: "ログイン成功", username, password };
    }
    return { message: "ログイン失敗：ユーザー名かパスワードが違います", username, password };
  } catch (e) {
    return { message: "エラーが発生しました" };
  }
}
// export async function loginServerAction(prevState: any, formData: FormData) {
//   return { message: "without SQLiteテスト" };
// }
