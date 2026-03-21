#from transformers import GPT2LMHeadModel, GPT2Tokenizer
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

#tokenizer = GPT2Tokenizer.from_pretrained("gpt2",local_files_only=True)
#model = GPT2LMHeadModel.from_pretrained("gpt2",local_files_only=True)
model_name = "gpt2"
print("Loading model... (first time may take a while)")
tokenizer = AutoTokenizer.from_pretrained(model_name, local_files_only=True) # ten drugi argument jest opcjonalny
model = AutoModelForCausalLM.from_pretrained(model_name, local_files_only=True)


def generate_text(prompt: str, max_length: int = 100):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=max_length,
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        temperature=0.8,
        top_p=0.9
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
