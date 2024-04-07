from flask import Flask, request, jsonify # type: ignore
from recommendation import main as recm

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('userID')
    json_data = data.get('df')

    result = recm.recommend_next_problem(user_id, json_data)
    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)