import requests
import json
from webserver import keep_alive
from flask import Flask
import time


def countcodes():
    url = 'https://apizalando.herokuapp.com/getall'
    params = {'key': 'value'}
    r = requests.get(url=url, params=params)
    countNoCodes = 0
    response = r.json()
    for i in response:
        if response[i] == "":
            countNoCodes += 1
    return countNoCodes


def getCodes():
    try:
        url = 'https://apizalando.herokuapp.com/api'
        params = {'key': 'value'}
        r = requests.get(url=url, params=params)
        if(r.status_code != 200):
            print("failed")

        print(r)
    except:
        print("e")


on = True


keep_alive()

while True:
    time.sleep(86400)
    while countcodes() > 0:
        print("getting code")
        getCodes()
