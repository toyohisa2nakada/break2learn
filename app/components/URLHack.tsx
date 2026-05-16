"use client";
import { useState } from "react";
import Link from "next/link";
import { useSaveTask } from "@/context/StorageContext";

// IDOR (Insecure Direct Object Reference)
export default function URLHack() {
  const saveStorage = useSaveTask();
  const [mail, setMail] = useState("");

  const check = () => {
    // console.log("check", mail);
    if (mail === "saru@example.com") {
      saveStorage({ solved: true });
    } else {
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div>あなたの氏名は「徳川家康」とします。「ユーザ情報の表示」ボタンを押すと自分の情報を確認できます。しかし、このシステムには他ユーザの情報も閲覧できてしまう脆弱性があります。ユーザ名「豊臣秀吉」のユーザ情報を表示し、豊臣秀吉のメールアドレスを確認してください。</div>
      <Link href="/URLHack?id=1" className="bg-slate-600 text-white p-2 rounded">ユーザ情報の表示</Link>
      <div className="flex flex-col">
        <span>ユーザ名: 豊臣秀吉 のメールアドレス</span>
        <input
          type="text"
          placeholder="豊臣秀吉のメールアドレス"
          className="border p-1"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") check(); }}
        ></input>
      </div>
      <button className="bg-slate-600 text-white p-2 rounded hover:cursor-pointer active:bg-slate-700" onClick={check}>チェック</button>
    </div>
  );
}