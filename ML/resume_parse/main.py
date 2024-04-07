import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Preprocessing function
def preprocess_text(text):
    # Tokenization
    tokens = word_tokenize(text)
    # Convert to lowercase
    tokens = [token.lower() for token in tokens]
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return tokens

# Sample labeled data
labeled_data = [
    ("Sample resume text 1", ["python", "machine learning", "data analysis"]),
    ("Sample resume text 2", ["java", "software development", "web development"]),
    # Add more labeled data here
]

# Feature extraction
X = [preprocess_text(resume_text) for resume_text, _ in labeled_data]
y = [keywords for _, keywords in labeled_data]

# Transform labels to a binary format
mlb = MultiLabelBinarizer()
y_binary = mlb.fit_transform(y)

# Train a classifier
classifier = Pipeline([
    ('tfidf', TfidfVectorizer(analyzer='word', tokenizer=lambda x: x, preprocessor=lambda x: x, token_pattern=None)),
    ('clf', OneVsRestClassifier(MultinomialNB()))
])

classifier.fit(X, y_binary)

# Keyword extraction function
def extract_keywords(resume_text):
    tokens = preprocess_text(resume_text)
    predicted_keywords = classifier.predict([tokens])[0]
    return mlb.inverse_transform(predicted_keywords.reshape(1, -1))

# Process a resume
def process_resume(resume_text):
    keywords = extract_keywords(resume_text)
    return keywords

# Sample resume for testing
sample_resume = """
John Doe
123 Main Street
Anytown, USA
john.doe@email.com
(123) 456-7890

Objective:
Seeking a position in software development where I can utilize my skills in Java programming and web development.

Education:
Bachelor of Science in Computer Science
XYZ University, Anytown, USA
Graduated: May 2020

Skills:
- Programming Languages: Java, Python, JavaScript
- Web Development: HTML, CSS, React.js
- Database Management: SQL, MongoDB
"""

# Process the sample resume
extracted_keywords = process_resume(sample_resume)
print("Extracted Keywords:", extracted_keywords)
