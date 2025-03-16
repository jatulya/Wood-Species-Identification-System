from openai import OpenAI
import json

# Set your OpenAI API key
OPENAI_API_KEY = ""

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# Function to get wood species details
def get_species_details(species_name):
    prompt = f'''Provide structured JSON data for the wood species "{species_name}" with the following format:
    {{
      "scientific_name": "Scientific name of the species",
      "common_name": "Common name of the species",
      "areas_found": ["Region1", "Region2"],
      "best_used_for": ["Use case 1", "Use case 2"],
      "not_suitable_for": ["Unsuitable use case 1", "Unsuitable use case 2"],
      "price_range": "$X - $Y per unit"
    }}'''

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides structured information about wood species."},
                {"role": "user", "content": prompt}
            ],
        )

        # Extract response
        data = response.choices[0].message.content
        data = data.strip('`')
        print("Response from OpenAI:", data)  # --- Added print statement
        return data  # Convert string JSON response to Python dictionary

    except Exception as e:
        print("Error fetching data from OpenAI:", e)
        return {"error": "Failed to retrieve species details"}

# Example usage
if __name__ == "__main__":
    species_name = input("Enter wood species name: ")
    species_details = get_species_details(species_name)
    print(json.dumps(species_details, indent=4))
