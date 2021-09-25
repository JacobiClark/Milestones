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
def upload_milestones():
    if request.method == 'GET':
        if platform.system() == "Windows":
            subprocess.Popen(r'explorer /select,' + str('C:/Users/'))
        elif platform.system() == "Darwin":
            subprocess.Popen(["open", 'C:/Users/'])
        else:
            subprocess.Popen(["xdg-open", 'C:/Users/'])
        milestones = pd.read_excel('milestones.xlsx').to_json()
        return milestones
    
    if request.method == 'POST':
        selected_milestones = request.json
        pd.DataFrame.from_dict(selected_milestones).to_excel("my_selected_milestones.xlsx", index=False)
        return selected_milestones

if __name__ == "__main__":
    app.run()

