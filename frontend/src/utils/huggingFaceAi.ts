import { HfInference } from "@huggingface/inference";

const inference = new HfInference(
  import.meta.env.VITE_HUGGINGFACE_ACCESS_TOKEN
);

const generateRandVal = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const parameters = {
  max_length: 250, // max tokens in output
  min_length: 150,
  temperature: generateRandVal(0.3, 0.6), // randomness, 0 = more factual, 1 = more creative
  top_k: Math.floor(generateRandVal(30, 50)), // lower ensure relevance, higher adds diversity
  top_p: 0.9, // allows flexibility, balancing, diversity and relevance
};

// const parameters = {
//   max_length: 250, // max tokens in output
//   min_length: 150,
//   temperature: 0.6, // randomness, 0 = more factual, 1 = more creative
//   top_k: 40, // lower ensure relevance, higher adds diversity
//   top_p: 0.9, // allows flexibility, balancing, diversity and relevance
// };

const summarizeText = async (text: string) => {
  try {
    // console.log(text);
    const prompt = `Summarize this text into concise points with bullet lists: \n\n${text}`;

    const result = await inference.summarization({
      model: "facebook/bart-large-cnn",
      // model: "t5-base",
      inputs: prompt,
      parameters,
    });

    console.log(parameters);

    return result.summary_text;
  } catch (err) {
    console.error(err);
  }
};

export default summarizeText;
