import requests
import json

class Req:
    def __init__(self, url, user, password, name):
        self.url = url
        self.user = user
        self.password = password
        self.name = name

    def reset(self, path):
        requests.get(f"{self.url}{path}")
        print("Database reseted")

    def userCreate(self, path):
        payload = {'username': self.user,'name': self.name,'password': self.password}

        response = requests.post(f"{self.url}{path}", json=payload)
        print(f"USERNAME: {self.user}, PASSWORD: {self.password}")


    def login(self, path):
        payload = {"username": self.user,"password": self.password}

        r = requests.post(f"{self.url}{path}", json = payload)
        token = json.loads(r.text)["token"]
        return token


    def postId(self, path):
        r = requests.get(f"{self.url}{path}")
        id = json.loads(r.text)[0]["id"]
        return id

    def fill(self, path):
        headers = {"authorization": "bearer " + self.login("/api/login")}
        with open("data.json") as file:
            data = json.load(file)
            for i in data:
                print(f"Sending {i}")
                r = requests.post(f"{self.url}{path}", headers=headers, json=i)

    def bpost(self, path):

        payload = {"title": "pentesting is fun","author": "STÖK","url": "https://www.stokfredrik.com/","likes": 420}

        headers = {"authorization": "bearer " + self.login("/api/login")}

        r = requests.post(f"{self.url}{path}", headers=headers, json=payload)
        print(f"Blog sent")

    def delete(self, path):

        headers = {"authorization": "bearer " + self.login("/api/login")}
        curid = self.postId("/api/blogs")
        r = requests.delete(f"{self.url}{path}/{curid}", headers=headers)
        print("Deleting post with id:",curid)
