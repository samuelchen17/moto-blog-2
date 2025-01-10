import { useState } from "react";
import { Button } from "./ui/button";
import summarizeText from "@/utils/huggingFaceAi";

const stripHtml = (html: any) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const Summarizer = ({ text }: { text: string }) => {
  const [summarizedText, setSummarizedText] = useState<string>();

  const handleSummarize = async () => {
    const plainText = stripHtml(text);
    const summary = await summarizeText(plainText);

    console.log(summary);
    if (summary) {
      setSummarizedText(summary);
    } else {
      console.log("Failed to summarize");
    }
  };

  return (
    <div>
      <Button onClick={handleSummarize}>Summarize</Button>
      {summarizedText ? (
        <div>{summarizedText}</div>
      ) : (
        <div>Click the button</div>
      )}
    </div>
  );
};

export default Summarizer;
