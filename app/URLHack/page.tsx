"use client";

import { useEffect, useState } from "react";

const users = {
  "1": {
    name: "徳川家康",
    kana: "とくがわいえやす",
    email: "ieyasu@example.com",
  },
  "2": {
    name: "豊臣秀吉",
    kana: "とよとみひでよし",
    email: "saru@example.com",
  },
};

export default function IDORPage() {
  const [id, setId] = useState("1");

  // URL → state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get("id") || "1";
    setId(urlId);
  }, []);

  // state → URL
  const changeId = (newId: string) => {
    setId(newId);
    window.history.pushState(null, "", `?id=${newId}`);
  };

  const user = users[id as keyof typeof users];

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* 表示 */}
      <table className="border w-full">
        <tbody>
          <tr>
            <td className="border p-2">ID</td>
            <td className="border p-2">{id}</td>
          </tr>
          <tr>
            <td className="border p-2">氏名</td>
            <td className="border p-2">{user?.name}</td>
          </tr>
          <tr>
            <td className="border p-2">よみがな</td>
            <td className="border p-2">{user?.kana}</td>
          </tr>
          <tr>
            <td className="border p-2">メール</td>
            <td className="border p-2">{user?.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}