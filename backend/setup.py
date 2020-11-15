from mlcare_app import app
import os
import shap_fix

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

