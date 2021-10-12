class Sensor:
    def __init__(self, id, pin):
        self.id = id
        self.pin = pin
        self.value = 0

    def getValue(self):
        return self.value

    def listening(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.add_event_detect(self.pin,GPIO.RISING, callback=self.value)
        GPIO.cleanup()

"""
A GPIO modult itt majd be kell importálni csak nem tudtam, hogy azt honnan kellene
majd valahogy így kellene meghívni az API.py-ban:

from sensor import Sensor

sensor1 = Sensor(0, 5)
thread = threading.Thread(target=sensor1.listening, args=())
thread.setDaemon(True)
thread.setName(str(f"sensor-{sensor.id}"))
thread.start()

"""


    