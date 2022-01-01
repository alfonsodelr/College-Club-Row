#!/bin/sh
export FLASK_APP=./index.py
flask run -h 0.0.0.0
curl http://localhost:5000/incomes