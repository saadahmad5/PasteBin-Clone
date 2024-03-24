from flask import Flask, make_response, request
from flask_cors import CORS
import redis
import json
import uuid

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://localhost:3001', 'http://172.171.162.197:3000'])

REDIS_ENDPOINT = "saad-cna-prj2-rc.redis.cache.windows.net"
REDIS_PORT = 6379
REDIS_PASSWORD = 'EeQ3UvSRmXOTFQnyhaBuOZuJlaoDCfNshAzCaOFr0Sk='

redis_client = redis.Redis(host=REDIS_ENDPOINT, port=REDIS_PORT, decode_responses=True, password=REDIS_PASSWORD)


@app.route('/')
def default_page():
    response = make_response(json.dumps({"Info": "All services are running as expected"}), 200)
    response.headers['Content-Type'] = 'application/json'
    return response


@app.route('/get_paste/<guid>')
def get_paste(guid):
    try:
        if redis_client.exists(guid):
            value = redis_client.get(guid)
            response = make_response(value, 200)
            response.headers['Content-Type'] = 'application/json'
            return response
        else:
            response = make_response(json.dumps({"Error": f"No key found with key: {guid}"}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response

    except redis.exceptions.ConnectionError as e:
        return f"Redis error: {e}"


@app.route('/save_paste', methods=['POST'])
def save_paste():
    try:
        data = request.json
        json_data = json.dumps(data)
        guid = str(uuid.uuid4())
        print(guid, json_data)
        redis_client.set(guid, json_data)
        response = make_response(guid, 200)
        response.headers['Content-Type'] = 'text/plain'
        return response

    except redis.exceptions.ConnectionError as e:
        return f"Redis error: {e}"


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
