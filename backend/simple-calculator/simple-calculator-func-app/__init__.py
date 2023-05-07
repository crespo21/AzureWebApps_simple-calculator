import os
import logging
import azure.functions as func
from flask import Flask, request, render_template  # Add render_template here

app = Flask(__name__)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    # Retrieve input values from the form
    num1 = float(request.form.get('num1'))
    num2 = float(request.form.get('num2'))
    operation = request.form.get('operation')

    # Perform the desired operation based on user input
    if operation == 'add':
        result = num1 + num2
    elif operation == 'subtract':
        result = num1 - num2
    elif operation == 'multiply':
        result = num1 * num2
    elif operation == 'divide':
        result = num1 / num2
    else:
        result = 'Invalid operation'

    # Render the result using the index.html template
    return render_template('index.html', result=result)

#The block of code will only be executed if the environment variable RUN_LOCAL is set to 'true'.
#bash: export RUN_LOCAL=true
#powershell: $env:RUN_LOCAL = "true"
if __name__ == '__main__':
    if os.environ.get('RUN_LOCAL', 'false').lower() == 'true':
        app.run(debug=True)


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Call the Flask app within the Azure Function
    with app.test_request_context(req.url, method=req.method, headers=req.headers, data=req.get_body()):
        response = app.full_dispatch_request()
        return func.HttpResponse(
            response.get_data(),
            status_code=response.status_code,
            headers=dict(response.headers)
        )