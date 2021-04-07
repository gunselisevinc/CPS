#!C:\Program Files\Python38\python.exe

import cgi
import os
import urllib

def printHeader(title):
    print("Content-type: text/html")
    print("")
    print("<html><head><h3></h3><link rel='stylesheet' type='text/css' href='css/style.css'><title>{}</title></head><body>".format(title))

def printFooter():
    print("</header></body></html>")

a = []
printHeader("Result")
print("<header><div class='contact'><div class='logo'><img src='logo.jpg'></div><ul><li><a href='index.html'>Home</a></li><li><a href='indexModelling.html'>Modelling</a></li><li><a href='indexPrediction.html'>Prediction</a></li><li><a href='indexAbout.html'>About</a></li><li><a href='indexContact.html'>Contact</a></li></ul></div>")
querydata = os.environ.get("QUERY_STRING")
pairs = urllib.parse.parse_qs(querydata)
if "q" in pairs.keys():
    q = pairs["q"][0]
    a.append(q)
print("<h1>sgs{}</h1>".format(a[0]))
printFooter()
