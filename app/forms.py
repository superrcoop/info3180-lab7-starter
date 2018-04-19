from wtforms import StringField, PasswordField, HiddenField, BooleanField, IntegerField
from wtforms.validators import Required, Length, Email, EqualTo, DataRequired
from flask_wtf import FlaskForm, RecaptchaField
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = set(['txt','pdf','png', 'jpg', 'jpeg', 'gif'])

class upload_Form(FlaskForm):
    description = StringField('Description', validators=[Required('Please provide a description')])
    upload = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])
