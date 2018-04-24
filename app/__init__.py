from flask import Flask
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config.from_object(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = 'R@nc!0m '
app.config['UPLOAD_FOLDER']='./app/static/uploads'
from app import views
