from flask import Flask
from flask import request
from flask_cors import CORS #comment this on deployment
import pandas as pd

app = Flask(__name__)
CORS(app) #comment this on deployment

@app.route("/milestones", methods = ['GET', 'POST'])
def upload_milestones():
    if request.method == 'GET':
        milestones = pd.read_excel('milestones.xlsx').to_json()
        return milestones
    
    if request.method == 'POST':
        content = request.json
        pd.DataFrame.from_dict(content).to_excel("my_selected_milestones.xlsx", index=False)
        return content

