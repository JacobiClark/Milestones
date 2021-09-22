from flask import Flask
from flask_cors import CORS #comment this on deployment
import pandas as pd

app = Flask(__name__)
CORS(app) #comment this on deployment

@app.route("/milestones")
def hello_world():
    df = pd.read_excel ('milestones.xlsx').to_json()
    return df