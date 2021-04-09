#!C:\Program Files\Python38\python.exe
#!D:\python\python.exe
import os
import urllib
import cgi, cgitb
import sys

def printHeader(title):
    print("Content-type: text/html")
    print("")
    print("<html><head><h3></h3><link rel='stylesheet' type='text/css' href='style.css'><title>{}</title></head><body>".format(title))

def printFooter():
    print("</body></html>")

printHeader(" ")
f = open("models.txt", "a")
querydata = os.environ.get("QUERY_STRING")
pairs = urllib.parse.parse_qs(querydata)
if "q" in pairs.keys():
    q = pairs["q"][0]
    f.write(q)
    f.write("\n")
f.close()
printFooter()
