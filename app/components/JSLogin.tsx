import { useState } from 'react';
import { useSaveTask } from "@/context/StorageContext";

export default function JSLogin() {
  const [clientMessage, setClientMessage] = useState("");
  const saveStorage = useSaveTask();

  return (
    <div>
      <div>通常ではありえませんが、このシステムではクライアント側でユーザ認証を行っています。ユーザ名とパスワードがHTMLと一緒にブラウザへ送信されているため、開発者ツールで検索すると認証情報を見つけることができます。</div>
      <form
        action={
          (e: FormData) => {
            const username = e.get('username');
            const password = e.get('password');
            if (username === "admin" && password === "adminpassword") {
              setClientMessage("成功!");
              saveStorage({ solved: true });
            } else {
              setClientMessage("失敗: ユーザ名またはパスワードが違います")
            }
          }
        }
        className="flex flex-col items-start gap-1">
        <div>
          <label>ユーザ名: </label>
          <input type="text" name="username" required className="border p-1" />
          <span className="hidden text-green-800 border mx-2 p-1">F12キー, Ctrl+Shift+F (Command+Shift+F), password等</span>
        </div>
        <div>
          <label>パスワード: </label>
          <input type="password" name="password" required className="border p-1" />
        </div>
        <button className="bg-slate-600 text-white p-2 rounded hover:cursor-pointer active:bg-slate-700">JSでログイン</button>
      </form>
      <p>{clientMessage}</p>
    </div>
  );
}