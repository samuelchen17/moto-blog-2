import { useState } from "react";
import { Button } from "./ui/button";
import summarizeText from "@/utils/huggingFaceAi";
import { LoadingSpinner } from "./LoadingSpinner";

const stripHtml = (html: any) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const Summarizer = ({ text }: { text: string }) => {
  const [summarizedText, setSummarizedText] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const plainText = stripHtml(text);
      const summary = await summarizeText(plainText);

      console.log(summary);
      if (summary) {
        setSummarizedText(summary);
      } else {
        console.log("Failed to summarize");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border rounded-md p-4 flex flex-col gap-4 mt-14">
      <Button className="mx-auto" onClick={handleSummarize}>
        Summarize
      </Button>
      {isLoading ? (
        <LoadingSpinner className="h-10 w-10 animate-spin mx-auto mb-5 mt-2" />
      ) : summarizedText ? (
        <div className="mb-5 mt-2">{summarizedText}</div>
      ) : (
        <div className="mx-auto mb-5 mt-2">
          Can't be bothered reading everything? Try the summary
        </div>
      )}
    </div>
  );
};

export default Summarizer;
