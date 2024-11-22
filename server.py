from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# OpenAI API Key
openai.api_key = 'your-api-key'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_message,
            max_tokens=100,
        )
        bot_response = response.choices[0].text.strip()
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"response": "Sorry, there was an error!"}), 500

if __name__ == '__main__':
    app.run(debug=True)
