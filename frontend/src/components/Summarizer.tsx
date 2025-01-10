import { useState } from "react";
import { Button } from "./ui/button";
import summarizeText from "@/utils/huggingFaceAi";

const Summarizer = () => {
  const [summarizedText, setSummarizedText] = useState<any>();

  const text = "this needs to be summarised";

  const handleSummarize = () => {
    const summary = summarizeText(text);
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
