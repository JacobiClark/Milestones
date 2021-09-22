from flask import Flask
import pandas as pd

app = Flask(__name__)

df = pd.read_excel ('milestones.xlsx')
print (df)

@app.route("/")
def hello_world():
    x="<p>Hello, World!</p>"
    return x