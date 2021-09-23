from flask import Flask
from flask import request
from flask_cors import CORS #comment this on deployment
import pandas as pd

app = Flask(__name__)
CORS(app) #comment this on deployment

@app.route("/milestones", methods = ['GET', 'POST'])
def upload_milestones():
    if request.method == 'GET':
        df = pd.read_excel('milestones.xlsx').to_json()
        print(df)
        return df
    
    if request.method == 'POST':
        print(request)
        content = request.json
        te = pd.DataFrame.from_dict(content).to_excel("output.xlsx", index=False)
        print(te)
        return content

