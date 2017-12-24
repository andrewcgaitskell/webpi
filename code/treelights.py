from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route('/treeon')
def turn_treeon():
   return 'turntreeon'

@app.route('/treeoff')
def turn_treeoff():
   return 'turntreeoff'

if __name__ == '__main__':
   app.run(debug = True)
