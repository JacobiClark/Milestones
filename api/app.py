from flask import Flask
from flask import request
from flask_cors import CORS #comment this on deployment
import pandas as pd

app = Flask(__name__)
CORS(app) #comment this on deployment

@app.route("/milestones", methods = ['GET', 'POST'])
def upload_milestones():
    if request.method == 'GET':
        df = pd.read_excel ('milestones.xlsx').to_json()
        return df
    if request.method == 'POST':
        content = request.json
        print(content)
        return content

