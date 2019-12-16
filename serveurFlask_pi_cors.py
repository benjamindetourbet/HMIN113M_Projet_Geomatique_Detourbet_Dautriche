#!/usr/bin/env python3
# -*- coding:utf-8 -*-

import os, json

from flask import Flask

app = Flask(__name__)
app._static_folder = os.path.abspath("./")


@app.route('/')  # route qui renvoie la page HTML
def index():
    print('/')
    if os.path.isfile("base.html"):
        print("base.html accessible")
        return app.send_static_file("base.html")
    return "base.html non accessible"


@app.route('/<fichier>')  # route qui renvoie les fichiers JavaScript
def fichier(fichier):
    print('/' + fichier)
    if os.path.isfile(fichier):
        print(fichier, "accessible")
        return app.send_static_file(fichier)
    return fichier + " non accessible"


@app.route('/pi/<theme>')  # route qui renvoie les données au format JSON
def getFilesInTheme(theme):
    print('/jsonFiles/' + theme)
    listeInfos = []
    if os.path.isdir("jsonFiles/" + theme):
        liste = os.listdir("jsonFiles/" + theme)
        for fichier in liste:
            with open("jsonFiles/"+ theme + "/" + fichier) as fd:
                Infos = list(map(str.strip, fd.readlines()))
                listeInfos.append(Infos)
    return json.dumps(listeInfos)

app.run()
