"use client";
import { useState } from 'react';
import { Plus, Settings2, ChevronDown, Mic, SendHorizontal } from "lucide-react";

interface FakeGeminiInputProps {
  injectedPromptAtEnd?: string;
}

export default function FakeGeminiInput({ injectedPromptAtEnd = "" }: FakeGeminiInputProps) {
  const [geminiUserInput, setGeminiUserInput] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [inject, setInject] = useState(false);

  async function onSubmit() {
    // console.log("submit", geminiUserInput);
    if (!geminiUserInput.trim()) return;

    setGeminiResponse("");
    const prompt = geminiUserInput + (inject ? injectedPromptAtEnd : "");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) return;

    // ストリームを読み取る
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setGeminiResponse((prev) => prev + chunk);
    }
  }

  return (
    <>
      <div>
        <div>例えば「格式高く書くレポートの書き出しの1文だけを示してください。説明は不要です。」と入力すると、プロンプトインジェクションが有効な場合には、見た目の入力内容が同じでもGeminiの返答に変化が現れます。</div>
        <label key="inject">
          <input type="checkbox" checked={inject} onChange={(e) => setInject(e.target.checked)}></input>
          プロンプトインジェクション
        </label>
      </div>
      <div className="border border-slate-200 rounded-3xl p-4 bg-white shadow-lg shadow-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            value={geminiUserInput}
            onChange={(e) => setGeminiUserInput(e.target.value)}
            placeholder="Gemini へのプロンプトを入力"
            className="flex-grow text-slate-800 placeholder:text-slate-500 focus:outline-none bg-transparent"
            onKeyDown={
              (e) => e.key === "Enter" && onSubmit()
            }
          />
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-5">
            <button className="hover:text-blue-600 transition"><Plus className="w-5 h-5" /></button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition">
              <Settings2 className="w-5 h-5" />
              <span className="text-sm font-medium">ツール</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-blue-600 transition group">
              <span className="text-sm font-medium text-slate-800">高速モード</span>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
            </button>
            <button
              onClick={onSubmit}
              className={`p-2 rounded-full transition ${geminiUserInput
                ? "bg-slate-100 text-slate-900"
                : "hover:text-blue-600"
                }`}
            >
              {geminiUserInput ? (
                <SendHorizontal className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 回答表示エリア */}
        {geminiResponse && (
          <div className="mt-4 p-4 bg-slate-100 rounded-2xl text-slate-800 whitespace-pre-wrap">
            {geminiResponse}
          </div>
        )}
      </div>
    </>
  );
}