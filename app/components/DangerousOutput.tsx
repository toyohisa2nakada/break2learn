// dangerousOutput.tsx
import { useState } from "react";
import CopyableSpan from "./CopyableSpan";

export default function DangerousOutput() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const submit = () => {
    setOutput(input);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div>Chatのような画面では、文字を入力して送信すると、その内容が画面下部に表示されます。通常は&lt;img&gt;などのHTMLタグが動作しないよう対策されていますが、ここではあえて無効化していません。そのため、HTMLタグやJavaScriptを入力すると動作を確認できます。いくつか試した後、「&lt;img src=x onerror="document.body.innerHTML='乗っ取りました'" &gt;」を入力してみてください。</div>
      <div>
        <label>入力: </label>
        <input
          className="border p-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder="ここに入力"
        />
        {/* <CopyableSpan text={'<img src=x onerror="document.body.innerHTML=\'乗っ取りました\'">'} /> */}
      </div>

      <button className="bg-slate-600 text-white p-2 rounded hover:cursor-pointer active:bg-slate-700" onClick={submit}>送信</button>

      <div dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}