# Train Module
import time
import json
from datetime import datetime

class Train:  
    def __init__(self, id, name, speed, direction):  
        # constructor
        self.id = id
        self.name = name            # név
        self.speed = speed          # sebesség
        self.direction = direction  # irány
        self.isrun = 0              # áll a vonat: 0, megy: 1
  
    def status(self):  
        currentTime = datetime.now().strftime("%H:%M:%S")
        print(f"----- [{currentTime}] Train status ------ \nID: {self.id} \nName: {self.name} \nSpeed: {self.speed} \nDirection: {self.direction}")  
        status = {'id': self.id, 'name': self.name, 'speed': self.speed, 'direction': self.direction, 'isrun': self.isrun}
        return status

    def setSpeed(self, speed):
        self.speed = speed

    def setDirection(self, direction):
        self.direction = direction

    def setRun(self, isrun):
        self.isrun = isrun 

    def run(self):
        self.isrun = 1
        while self.isrun == 1:
            self.status()
            time.sleep(1)