import sys
import os.path
import uuid
import random
from flask import Flask, redirect, request, jsonify, send_file
from flask_restful import Resource, Api, reqparse
import werkzeug

sys.path.append('./DewFunctions/Generators/')
sys.path.append('./DewFunctions/UI/HighLevelBehaviorLanguage/')
sys.path.append('./DewFunctions/UI/')
sys.path.append('./DewFunctions/Translators/bash')
sys.path.append('./DewFunctions/Translators/magi')
from parsebash import GeneralParseBash
from generator import GeneralGenerator
# from generator import GeneralGenerator

app = Flask(__name__)
api = Api(app)

hlb = {}

class HandleIndex(Resource):
    def get(self):
        return redirect('https://isi.edu')
api.add_resource(HandleIndex, '/')

# Handle Behavior Suggestions On Each Key Press
class HandleBehaviorSuggestions(Resource):
    def get(self, behavior_command):
        return {'suggestionList': ['wait', 'emit', 'server', 'client', 'install_iperf', 'install_flooder', 'install_tcpdump', 'start_measure', 'start_server', 'mstarted', 'sstarted', 'when', 'mstarted', 'cstarted', 'astarted', 'astopped', 'attacker', 'start_traffic', 'start_attack', 'stop_attack', 'stop_traffic', 'cstopped', 'mstopped', 'calculate_entropy', 'stop_measure', 'COPY_TO_GITHUB']}
api.add_resource(HandleBehaviorSuggestions, '/Behavior/<string:behavior_command>')

# Handle Translator 
class HandleTranslator(Resource):
    def put(self, format, returnType):

        EXPECTED = {
            "Format":["bash", "magi", "go"],
            "ReturnType":["dew", "json"]
        }
        errors = []

        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
        scriptFile = args['file']

        if format not in EXPECTED["Format"]: errors.append(f"Not Vaild Format, should be bash, magi or go.")
        if returnType not in EXPECTED["ReturnType"]: errors.append(f"Not Vaild ReturnType, should be dew or json.")
        if(scriptFile == None): errors.append(f"Not Vaild File.")
        else:
            if(os.path.isdir("./UploadedScripts") == False):
                os.mkdir("./UploadedScripts")
            scriptFile.save("./UploadedScripts/" + scriptFile.filename)
            
            if(os.stat("./UploadedScripts/" + scriptFile.filename).st_size == 0):
                errors.append(f"File is empty.")
            else:
                f = open("./UploadedScripts/" + scriptFile.filename, "r")
                data = ""
                dewOut = ""
                if f.mode == 'r':
                    data = f.read()
                else:
                    errors.append(f"Can not read from server.")
                f.close()
            
        #file = request.files['file']
        if len(errors) <1:
            
            # for stringify json content
            # json_data = request.get_json(force=True)
            # data = json_data['InputFileContent']
            
            s = []
            c = []
            b = []
            if(format == "bash"):
                dewOut, s, c, b = GeneralParseBash.parse(data)
            if(format == "magi"):
                dewOut = "" #TODO: MAGI format
            if(format == "go"):
                dewOut = "" #TODO: GO format          

            if(os.path.isdir("./ReturnFiles") == False):
                os.mkdir("./ReturnFiles")

            if(returnType == "json"):
                return {'Scenario':s, 'Constraints':c, 'Bindings':b}
            elif(returnType == "dew"):
                with open("./ReturnFiles/" + os.path.splitext(scriptFile.filename)[0] + ".dew", "w") as file:
                    file.write(dewOut)
                return send_file("./ReturnFiles/" + os.path.splitext(scriptFile.filename)[0] + ".dew")
        else:
            # Return errors
            return {"_id":str(uuid.uuid4()),"errors":errors}
api.add_resource(HandleTranslator, '/hlb/translate/<string:format>/<string:returnType>')

# Handle Parse
class HandleParse(Resource):
    
    def put(self):
        EXPECTED = {
            "ParseType":["bash", "magi", "go"],
            "Scenario":{"min":1,"max":500},
            "Constraints":{"min":0,"max":500}
        }
        errors = []
        
        json_data = request.get_json(force=True)

        # Check for valid input fields 
        for name in json_data:
            if name in EXPECTED:
                value = json_data[name]
                if(name == "ParseType"):
                    if value not in EXPECTED[name]:
                        errors.append(f"Not Vaild Format, should be bash, magi or go.")
                else:
                    expected_min = EXPECTED[name]['min']
                    expected_max = EXPECTED[name]['max']
                    if len(value) < expected_min or len(value) > expected_max:
                        errors.append(f"Out of bounds: {name}, has size of: {len(value)}, but should be between {expected_min} and {expected_max}.")
            else:
                errors.append(f"Unexpected field: {name}.")

        # Check for missing input fields
        for name in EXPECTED:
            if name not in json_data:
                errors.append(f"Missing value: {name}.")
        
        if len(errors) <1:
            # Return parse  
            tn = json_data['ParseType']
            scenario = json_data['Scenario']
            constraints = json_data['Constraints']

            cwd = os.path.dirname(os.path.realpath(__file__))
            # print(cwd)
            if os.path.isdir(cwd + "/DewFunctions/Generators/" + tn):
                sys.path.append(cwd + "/DewFunctions/Generators/" + tn)
            else:
                print("\nERROR:\tExpecting generator type (%s) to match {generator}/{generator}.py\n\t(e.g. %s/%s.py) in %s/ directory.\n\n" %(tn, tn, tn, cwd))
                print("\n")
                exit(1)

            chosenGenerator = __import__(tn, fromlist=['Generator'])
            generator = chosenGenerator.Generator(scenario, constraints=constraints)
            scenario_parsed, constraints_parsed = generator.generate()
            print(scenario_parsed, constraints_parsed)
            response = {"_id": str(uuid.uuid4()), "parsedScenario": scenario_parsed, "parsedConstraints": constraints_parsed}
        else:
            # Return errors
            response = {"_id":str(uuid.uuid4()),"errors":errors}
        return jsonify(response)

api.add_resource(HandleParse, '/hlb/parse')

#Handle generateNS
class HandleNS(Resource):
    def put(self):

        EXPECTED = {
            "Actors":{"min":1,"max":500},
            "Scenario":{"min":1,"max":500},
            "Constraints":{"min":0,"max":500},
            "Bindings":{"min":0,"max":500}
        }
        errors = []

        json_data = request.get_json(force=True)

        # Check for valid input fields 
        for name in json_data:
            if name in EXPECTED:
                value = json_data[name]
                expected_min = EXPECTED[name]['min']
                expected_max = EXPECTED[name]['max']
                if len(value) < expected_min or len(value) > expected_max:
                    errors.append(f"Out of bounds: {name}, has size of: {len(value)}, but should be between {expected_min} and {expected_max}.")
            else:
                errors.append(f"Unexpected field: {name}.")

        # Check for missing input fields
        for name in EXPECTED:
            if name not in json_data:
                errors.append(f"Missing value: {name}.")

        if len(errors) <1:
            actors = json_data['Actors']
            scenario = json_data['Scenario']
            constraints = json_data['Constraints']
            bindings = json_data["Bindings"]
            if(os.path.isdir("./ReturnFiles") == False):
                os.mkdir("./ReturnFiles")

            with open("./ReturnFiles/returnGenerate.ns", "w") as file:
                file.write("set ns [new Simulator]\nsource tb_compat.tcl\n# Nodes\nforeach node {\n") 
                
                for actor in actors:
                    file.write("\t" + actor + "\n")
                file.write( "} {\n\tset $node [$ns node]\n\ttb-set-node-os $node Ubuntu-STD\n}\nset lan0 [$ns make-lan \"")
                for a in actors:
                    file.write("$" + a + " ")
                file.write("\" 100000.0kb 0.0ms]\n\n$ns rtproto Static\n$ns run")
            return send_file("./ReturnFiles/returnGenerate.ns")
        else:
            # Return errors
            return {"_id":str(uuid.uuid4()),"errors":errors}

api.add_resource(HandleNS, '/hlb/generateNs')

@app.errorhandler(404)
def page_not_found(e):
    return {"_id":str(uuid.uuid4()),"errors":"Not find correct api request url."}

if __name__ == '__main__':
    app.run(debug=True)
