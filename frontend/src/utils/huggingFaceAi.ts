import { HfInference } from "@huggingface/inference";

const inference = new HfInference(
  import.meta.env.VITE_HUGGINGFACE_ACCESS_TOKEN
);

const result = await inference.textClassification({
  model: "facebook/bart-large-cnn",
  inputs:
    "Today is a great day, there was rain but yet there was sun, so overall it was quite a good day",
});

console.log(result);
