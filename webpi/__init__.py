from flask import render_template

@webpi.route('/hello/')
@webpi.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

class Temp:
    def __init__(self):
        ''' Constructor for this class. '''
        # Create some member animals
        self.members = ['Tiger', 'Elephant', 'Wild Cat']
