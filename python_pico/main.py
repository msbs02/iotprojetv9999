import machine
import time
import urequests

def read_sensors():
    return {"temperature": 36.5, "heart_rate": 75, "spo2": 98}

def send_data_to_server(data):
    url = "http://<IP_SERVEUR_FLASK>:5001/api/add-vitals"
    response = urequests.post(url, json=data)
    print(response.text)

while True:
    data = read_sensors()
    send_data_to_server(data)
    time.sleep(10)
