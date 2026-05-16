import { useState } from "react";

type Props = {
  text: string;
};

export default function CopyableSpan({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block group">
      <span className="text-green-800 border mx-2 p-1 inline-block">
        {text}
      </span>

      <button
        onClick={handleCopy}
        className="absolute right-4 top-0 hidden group-hover:flex items-center justify-center w-6 h-6"
        title="copy"
      >
        📋
      </button>

      {copied && (
        <div className="absolute -top-6 right-4 text-xs bg-black text-white px-2 py-1 rounded">
          コピーしました
        </div>
      )}
    </div>
  );
}
