"use client";
import { useState, useEffect } from "react";
import { useSaveTask } from "@/context/StorageContext";


/*
brute-force attack (総当たり攻撃)

for(let i=0; i<10000; i++) {
  for(let j=0;j<4;j++){
    const el = document.getElementById(`input-number-${j}`);
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const digit = Math.floor(i / Math.pow(10, j)) % 10;
    setter.call(el, digit.toString());
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
*/

export default function FourDigitAuth() {
  const saveStorage = useSaveTask();
  const [targetNumbers, setTargetNumbers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const generateNumbers = () => {
    const randoms = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10).toString()
    );
    setTargetNumbers(randoms);

    setMessage("");

    [0, 1, 2, 3].forEach((i) => {
      const el = document.getElementById(`input-number-${i}`) as HTMLInputElement;
      if (el) el.value = "";
    });
  };

  const checkAnswer = () => {
    const inputs = [0, 1, 2, 3].map(
      (i) => (document.getElementById(`input-number-${i}`) as HTMLInputElement).value
    );

    if (inputs.some((val) => val === "")) return;

    if (inputs.join("") === targetNumbers.join("")) {
      setMessage(`あたり ${targetNumbers.join(" ")}`);
      saveStorage({ solved: true });
    }
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>4桁の数字で認証を行います。数字を入力すると自動で認証チェックが実行され、認証に成功した場合のみメッセージが表示されます。通常は試行回数に制限がありますが、ここでは制限がありません。そのため、繰り返し自動で試行するプログラムを作成し、ブラウザのDeveloper Toolsで実行することで、認証を突破できます。</div>
      <div className="flex flex-row">
        {[...Array(4).keys()].map(i =>
          <input
            key={i}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            id={`input-number-${i}`}
            className="border w-8 text-center"
            onInput={e => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, '').at(-1) ?? "";

              checkAnswer();
            }}
          />
        )}
        <span className="mx-2 text-green-900">{message}</span>
      </div>
      <div>
        <button className="bg-slate-600 text-white p-2 rounded hover:cursor-pointer active:bg-slate-700"
          onClick={generateNumbers}>正解を入れ替えてリセット</button>
      </div>
    </div>
  );
}
