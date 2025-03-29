import json
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access your secret key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# Function to retrieve wood species details
def get_species_details(species_name):
    """
    Fetch structured information about a given wood species using OpenAI's API.
    """
    prompt = f'''
    Provide structured JSON data for the wood species "{species_name}" with the following format:
    {{
      "scientific_name": "Scientific name of the species",
      "common_name": "Common name of the species",
      "areas_found": ["Region1", "Region2"],
      "best_used_for": ["Use case 1", "Use case 2"],
      "not_suitable_for": ["Unsuitable use case 1", "Unsuitable use case 2"],
      "price_range": "$X - $Y per unit"
    }}
    '''

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides structured information about wood species."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}  # Ensure response is in JSON format
        )

        # Extract response content
        data = response.choices[0].message.content.strip('`')

        # Convert JSON string to Python dictionary
        return json.loads(data)

    except Exception as e:
        print("❌ Error fetching data from OpenAI:", e)
        return {"error": "Failed to retrieve species details"}

# Main Execution
if __name__ == "__main__":
    species_name = input("🌳 Enter wood species name: ").strip()
    
    if species_name:
        species_details = get_species_details(species_name)
        print("\n🔍 Wood Species Information:\n")
        print(json.dumps(species_details, indent=4))
    else:
        print("⚠️ Please enter a valid species name.")
