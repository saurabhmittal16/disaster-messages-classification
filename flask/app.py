from utils import run
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello():
    return "Welcome message"


@app.route("/predict",  methods=['POST'])
def predict():
    try:
        body = request.json

        sentences = body.get('sentences', "")
        output = run(sentences)

        print(output)

        return {
            "success": True,
            "response": output
        }

    except Exception as err:
        print(err)
        return {
            "success": False
        }
