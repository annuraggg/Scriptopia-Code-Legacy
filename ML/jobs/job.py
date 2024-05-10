import spacy
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the English language model from spaCy
nlp = spacy.load("en_core_web_sm")

def get_language(topic):
    # Query GitHub's Topics API to get information about the topic
    url = f"https://api.github.com/search/topics?q={topic}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get('items'):
            for item in data['items']:
                repository = item.get('repository')
                if repository and repository.get('primary_language'):
                    return repository['primary_language']
    return None

def preprocess_text(text):
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
    return ' '.join(tokens)

def recommend_jobs(resume_text, job_descriptions):
    processed_resume = preprocess_text(resume_text)
    processed_job_descriptions = [preprocess_text(desc) for desc in job_descriptions]
    
    # Mapping frameworks and libraries to their respective programming languages
    language_mapping = {}
    for description in job_descriptions:
        doc = nlp(description.lower())
        for token in doc:
            language = get_language(token.text)
            if language:
                language_mapping[token.text] = language

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform([processed_resume] + processed_job_descriptions)

    # Cosine similarity
    cos_similarities = cosine_similarity(X[0], X[1:])
    recommendations = []
    for idx, sim_score in enumerate(cos_similarities[0]):
        recommendations.append((job_descriptions[idx], sim_score))

    return recommendations

# Example usage
resume_text = "I have 10 years of experience. I am skilled in Python, and Javascript and Flutter"
job_descriptions = [
    "10 Years",
    "Javascript, GoLang"
    "A. P. Shah Institute of Technology,",
]

recommendations = recommend_jobs(resume_text, job_descriptions)
for idx, (job_desc, sim_score) in enumerate(recommendations):
    print(f"Job description {idx + 1} - Similarity Score: {sim_score}")
