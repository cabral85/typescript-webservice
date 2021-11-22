import pandas as pd
import requests
import json
data = pd.read_csv("products.csv")
url = "http://localhost:7000/products"
for index, row in data.iterrows():
    headers = {
        
    }
    obj = {
        "name": row[0],
        "price": row[1],
        "quantity": row[2]
    }
    response = requests.post(url, headers, obj)