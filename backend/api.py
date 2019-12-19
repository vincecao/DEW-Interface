import sys
import os.path
from flask import Flask, redirect, request, jsonify
from flask_restful import Resource, Api
sys.path.append('./Dew_Functions/Generators/')
sys.path.append('./Dew_Functions/UI/HighLevelBehaviorLanguage/')
sys.path.append('./Dew_Functions/UI/')
from generator import GeneralGenerator

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


# Handle Behavior Suggestions On Each Key Press
class HandleGenerators(Resource):
    def get(self, blh_id):
        # return ((blh_id in hlb) ? hlb[blh_id] : {'errsmg': 'no id found'})
        return hlb[blh_id] if blh_id in hlb.keys() else {'errsmg': 'no id found'}
    def put(self, blh_id):
        json_data = request.get_json(force=True)
        tn = json_data['generatorType']
        sn = json_data['scenario']
        cw = json_data['constraint']

        constraints = cw#[x[0] for x in cw]
        scenario = sn#[x[0] for x in sn]

        cwd = os.path.dirname(os.path.realpath(__file__))
        print(cwd)
        parentDirectory = os.path.abspath(os.path.join(cwd, os.pardir))
        if os.path.isdir(cwd + "/Dew_Functions/Generators/" + tn):
            sys.path.append(cwd + "/Dew_Functions/Generators/" + tn)
        else:
            print("\nERROR:\tExpecting generator type (%s) to match {generator}/{generator}.py\n\t(e.g. %s/%s.py) in %s/ directory.\n\n" %(tn, tn, tn, cwd))
            print("\n")
            exit(1)

        chosenGenerator = __import__(tn, fromlist=['Generator'])
        generator = chosenGenerator.Generator(scenario, constraints=constraints)
        # gen = generator.parse()
        scenario_parsed, constraints_parsed = generator.parse()
        print(scenario_parsed, constraints_parsed)
        hlb[blh_id] = {'id': blh_id, 'Scenario': scenario_parsed, 'Constraint': constraints_parsed}
        #gen
        return hlb[blh_id]
api.add_resource(HandleGenerators, '/Generator/<string:blh_id>')


if __name__ == '__main__':
    app.run(debug=True)
