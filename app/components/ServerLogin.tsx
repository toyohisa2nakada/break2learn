import { useActionState } from 'react';
import { loginServerAction } from '../actions';
import { useSaveTask } from "@/context/StorageContext";
import { useEffect } from "react";


export default function ServerLogin() {
  const saveStorage = useSaveTask();
  const [formServerState, formServerAction] = useActionState(loginServerAction, { message: "" });

  useEffect(() => {
    if (formServerState.message.includes("成功") && formServerState.username !== "admin") {
      saveStorage({ solved: true });
    }
  }, [formServerState, saveStorage])

  return (
    <div>
      <div>このシステムではサーバ側でユーザ認証を行います。登録されたユーザ名とパスワードは「admin / password」です。しかし、脆弱性を悪用することで、これらを使わずにログインできてしまいます。ここでは、「admin / password」を使わずにログインへ成功できれば、ハック成功です。</div>
      <form action={formServerAction} className="flex flex-col items-start gap-1">
        <div>
          <label>ユーザ名: </label>
          <input type="text" name="username" required className="border p-1" />
          <span className="hidden text-green-800 border mx-2 p-1">' OR 1=1 --</span>
        </div>
        <div>
          <label>パスワード: </label>
          <input type="password" name="password" required className="border p-1" />
        </div>
        <button type="submit" className="bg-slate-600 text-white p-2 rounded hover:cursor-pointer active:bg-slate-700">サーバ認証でログイン</button>
      </form>
      {formServerState?.message && <p>{formServerState.message}</p>}
    </div>
  );
}