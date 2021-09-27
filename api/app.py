from flask import Flask
from flask import request
from flask_cors import CORS #comment this on deployment
import pandas as pd
import os
import platform
import subprocess

app = Flask(__name__)
CORS(app) #comment this on deployment



@app.route("/milestones", methods = ['GET', 'POST'])

def download_selected_milestones():        
    if request.method == 'POST':
        selected_milestones = request.json
        pd.DataFrame.from_dict(selected_milestones).to_excel("my_selected_milestones.xlsx", index=False)
        return selected_milestones

@app.route("/retrievemilestones", methods = ['GET', 'POST'])
def retrieve_milestones():    
    if request.method == 'POST':
        milestoneFile = request.json
        milestones = pd.read_excel(milestoneFile["filePath"]).to_json()
        return milestones

if __name__ == "__main__":
    app.run()