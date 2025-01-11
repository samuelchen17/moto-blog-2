import { HfInference } from "@huggingface/inference";

const inference = new HfInference(
  import.meta.env.VITE_HUGGINGFACE_ACCESS_TOKEN
);

const summarizeText = async (text: string) => {
  try {
    // console.log(text);
    const prompt = `Summarize: \n\n${text}`;

    const result = await inference.summarization({
      model: "facebook/bart-large-cnn",
      // model: "t5-base",
      inputs: prompt,
      parameters: {
        max_length: 250, // max tokens in output
        min_length: 200,
        temperature: 0.4, // randomness, 0 = more factual, 1 = more creative
        top_k: 30, // lower ensure relevance, higher adds diversity
        top_p: 0.9, // allows flexibility, balancing, diversity and relevance
      },
    });

    return result.summary_text;
  } catch (err) {
    console.error(err);
  }
};

export default summarizeText;
