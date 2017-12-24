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
   return '<html><body><h1>Hello World</h1>' + link1 + '</body></html>'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
