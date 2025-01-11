import { useState } from "react";
import { Button } from "./ui/button";
import summarizeText from "@/utils/huggingFaceAi";
import { cn } from "@/lib/utils";

const stripHtml = (html: any) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const LoadingSpinner = ({ className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
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
