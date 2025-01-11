import { HfInference } from "@huggingface/inference";

const inference = new HfInference(
  import.meta.env.VITE_HUGGINGFACE_ACCESS_TOKEN
);

const summarizeText = async (text: string) => {
  try {
    console.log(text);
    const prompt = `Summarize the following text, making sure to separate by headings: \n\n${text}`;

    const result = await inference.summarization({
      model: "facebook/bart-large-cnn",
      // model: "t5-base",
      inputs: prompt,
    });

    return result.summary_text;
  } catch (err) {
    console.error(err);
  }
};

export default summarizeText;
