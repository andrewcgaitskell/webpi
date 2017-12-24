from flask import Flask
app = Flask(__name__)

#@app.route("/")
#def hello():
#    return "Hello World!"

@app.route("/hi/<name>")
def say_hi(name):
    return 'Hello, %s!' % (name)

@app.route('/')
def index():
   link1 = '<p><a href="https://www.w3schools.com/html/">Visit our HTML tutorial</a></p>'
   redtree = '<p><a href="http://192.168.1.11/pattern/red">Make Tree Red</a></p>'
   return '<html><body><h1>Hello World</h1>' + redtree + '</body></html>'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
