import logging
import json
from flask import Flask, Response, request
from flask_cors import CORS
from train import Train
import threading

app = Flask(__name__)
CORS(app)

format = "[%(asctime)s]: %(message)s"
logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

# Vonatok
train_list = [
    Train(230, 'szemely', 0.1, 1),
    Train(410, 'zonazo', 0.7, 1),
    Train(555, 'gyorsitott', 0.5, 1)
]

@app.route("/")
def index():
    return f"<h3>Server is running....</h3>"

@app.route("/status")
def status():
    try:
        return_list = []
        for train in train_list:
            return_list.append(train.status())

        json_string = json.dumps(return_list) 
        return Response(json_string, mimetype='application/json')
    except:
        return Response('{"success":"false"}', mimetype='application/json')

@app.route("/start/<trainid>")
def start(trainid):
    try:
        train = next((x for x in train_list if x.id == int(trainid)), None)
        
        # start threading and add to thread pool
        thread = threading.Thread(target=train.run, args=())
        thread.setDaemon(True)  # Daemonize thread
        thread.setName(str(f"train-{train.id}"))
        thread.start()   # Start

        json_string = json.dumps(train.__dict__)
        return Response(json_string, mimetype='application/json') 
    except:
        return Response('{"success":"false"}', mimetype='application/json')

@app.route("/stop/<trainid>")
def stop(trainid):
    try:
        train = next((x for x in train_list if x.id == int(trainid)), None)
        train.setRun(0)
        json_string = json.dumps(train.__dict__)
        return Response(json_string, mimetype='application/json') 
    except:
        return Response('{"success":"false"}', mimetype='application/json')

# for debug
@app.route("/getthreadings")
def getthreadings():
    threadinglist = []
    for t in threading.enumerate():
        threadinglist.append(t.getName())

    jsonString = json.dumps(threadinglist)
    return Response(jsonString, mimetype='application/json') 

@app.route("/controller", methods=['POST'])
def settrain():
    try:
        # curl -X POST --header "Content-Type: application/json" --data '{"id": "410", "name": "zonazo", "speed":"0.2","direction":"1"}' http://127.0.0.1:5000/controller
        postdata = request.json
        newSpeed = postdata["speed"]
        newDirection = postdata["direction"]
        trainId = postdata["id"]
        train = next((x for x in train_list if x.id == int(trainId)), None)
        train.setSpeed(float(newSpeed))
        train.setDirection(int(newDirection))
        return 'ok\n' 
    except:
        return Response('{"success":"false"}', mimetype='application/json')