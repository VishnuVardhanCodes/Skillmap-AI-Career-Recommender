import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
from templates import CAREER_TEMPLATES

load_dotenv()

app = Flask(__name__)
CORS(app)

# Groq Client setup (fallback to None if key not found)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def get_ai_response(career_name, duration_weeks=12):
    if not client:
        return None
    
    prompt = f"""
    Generate a detailed career roadmap for: {career_name}
    Planned Duration: {duration_weeks} weeks.
    
    Return ONLY a valid JSON object with the following structure:
    {{
        "title": "String",
        "description": "String",
        "skills": [{{ "name": "String", "level": Number 0-100 }}],
        "timeline": [{{ 
            "period": "String (e.g. Week 1-2)", 
            "title": "String", 
            "description": "String",
            "sub_tasks": ["String", "String", "String"] 
        }}],
        "projects": [{{ "name": "String", "description": "String", "difficulty": "String", "time": "String" }}],
        "tools": [{{ "category": "String", "name": "String" }}],
        "difficulty": "Beginner/Intermediate/Advanced",
        "duration": "{duration_weeks} Weeks",
        "salary": {{ "range": "String", "avg": Number }},
        "resources": [
            {{ "name": "W3Schools", "link": "https://www.w3schools.com", "type": "Documentation" }},
            {{ "name": "String", "link": "String", "type": "String" }},
            {{ "name": "String", "link": "String", "type": "String" }}
        ]
    }}
    Ensure exactly 3 resources are provided.
    Ensure sub_tasks provide specific actionable steps for that timeline period.
    IMPORTANT: Provide short, standardized technology names (e.g., 'React', 'Python', 'Docker' instead of 'The React Framework') for better logotype matching.
    """
    
    try:
        completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        result = json.loads(completion.choices[0].message.content)
        
        # Absolute Guarantee of 3 Resources
        if "resources" not in result or not isinstance(result["resources"], list):
            result["resources"] = []
        
        if len(result["resources"]) < 3:
            defaults = [
                {"name": "W3Schools", "link": "https://www.w3schools.com", "type": "Documentation"},
                {"name": "Official Documentation", "link": "https://docs.microsoft.com", "type": "Official Docs"},
                {"name": "Roadmap.sh", "link": "https://roadmap.sh", "type": "Reference"}
            ]
            for item in defaults:
                if len(result["resources"]) >= 3: break
                # Don't add if already there
                if not any(r["name"] == item["name"] for r in result["resources"]):
                    result["resources"].append(item)
        
        # Limit to strictly 3
        result["resources"] = result["resources"][:3]
        return result
    except Exception as e:
        print(f"AI Generation failed: {e}")
        return None

@app.route('/api/generate-career', methods=['POST'])
def generate_career():
    data = request.json
    career_name = data.get('career_name', '').strip()
    duration = data.get('duration', 12)
    
    if not career_name:
        return jsonify({"error": "No career name provided"}), 400
    
    # Try AI first
    ai_result = get_ai_response(career_name, duration)
    if ai_result:
        return jsonify(ai_result)
    
    # Fallback to templates
    # Simple fuzzy search: check if input is in template keys
    for key in CAREER_TEMPLATES:
        if key.lower() in career_name.lower() or career_name.lower() in key.lower():
            return jsonify(CAREER_TEMPLATES[key])
            
    # If no template found, return a generic one based on Frontend template as base
    generic = CAREER_TEMPLATES["Frontend Developer"].copy()
    generic["title"] = career_name
    generic["description"] = f"A professional career path to becoming a {career_name}."
    return jsonify(generic)

@app.route('/api/compare', methods=['POST'])
def compare_careers():
    data = request.json
    career1_name = data.get('career1')
    career2_name = data.get('career2')
    
    # In a real app, we'd fetch or generate both.
    # For now, we'll try to find templates or generate minimal data.
    def get_minimal(name):
        for key in CAREER_TEMPLATES:
            if key.lower() in name.lower(): return CAREER_TEMPLATES[key]
        return CAREER_TEMPLATES["Frontend Developer"]

    return jsonify({
        "career1": get_minimal(career1_name),
        "career2": get_minimal(career2_name)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
