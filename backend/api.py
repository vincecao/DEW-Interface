import sys
import os.path
import random
from flask import Flask, redirect, request, jsonify, send_file
from flask_restful import Resource, Api
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
        
        json_data = request.get_json(force=True)
        data = json_data['InputFileContent']
        print(data)
        dewOut = ""
        s = []
        c = []
        b = []
        if(format == "bash"):
            dewOut, s, c, b = GeneralParseBash.parse(data)
        if(format == "magi"):
            dewOut = "" #TODO: MAGI format
        #print(dewOut)
        if(returnType == "json"):
            return {'Scenario':s, 'Constraints':c, 'Bindings':b}
        elif(returnType == "dew"):
            with open("./ReturnFiles/returnTranslator.dew", "w") as file:
                file.write(dewOut)
            return send_file("./ReturnFiles/returnTranslator.dew")

api.add_resource(HandleTranslator, '/hlb/translate/<string:format>/<string:returnType>')

# Handle Parse
class HandleParse(Resource):
    def put(self):
        json_data = request.get_json(force=True)
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
        return {'_id': random.randint(1,101), 'parsedScenario': scenario_parsed, 'parsedConstraints': constraints_parsed}
api.add_resource(HandleParse, '/hlb/parse')

#Handle generateNS
class HandleNS(Resource):
    def put(self):
        json_data = request.get_json(force=True)
        actors = json_data['Actors']
        scenario = json_data['Scenario']
        constraints = json_data['Constraints']

        with open("./ReturnFiles/returnGenerate.ns", "w") as file:
            file.write("set ns [new Simulator]\nsource tb_compat.tcl\n# Nodes\nforeach node {\n") 
            
            for actor in actors:
                file.write("\t" + actor + "\n")
            file.write( "} {\n\tset $node [$ns node]\n\ttb-set-node-os $node Ubuntu-STD\n}\nset lan0 [$ns make-lan \"")
            for a in actors:
                file.write("$" + a + " ")
            file.write("\" 100000.0kb 0.0ms]\n\n$ns rtproto Static\n$ns run")
        return send_file("./ReturnFiles/returnGenerate.ns")
api.add_resource(HandleNS, '/hlb/generateNs')

if __name__ == '__main__':
    app.run(debug=True)
