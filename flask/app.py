from utils import predict
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello():
    return "Welcome message"


@app.route("/check",  methods=['POST'])
def check():
    try:
        body = request.json

        sentences = body.get('sentences', "")
        output = predict(sentences)

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
