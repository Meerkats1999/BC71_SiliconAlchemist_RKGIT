import os
import sys
import numpy as np
import time
import traci

#Scripts to be created
from scripts.Dqn import Learner

sys.path.insert(0, "/usr/share/sumo/tools")
sumoBinary = "/usr/bin/sumo-gui"
sumoCli = "/usr/bin/sumo"
sumoConfig = "data/bangalore.sumo.cfg"
dumpFile = "data/fcd_edgedensity.xml"
tripInfoFinal = "data/tripinfo_final.xml"



def get_state(detectorIDs):
    state = []
    for detector in detectorIDs:
        speed = traci.inductionloop.getLastStepMeanSpeed(detector)
        state.append(speed)
    for detector in detectorIDs:
        veh_num = traci.inductionloop.getLastStepVehicleNumber(detector)
        state.append(veh_num)
    state = np.array(state)
    state = state.reshape((1, state.shape[0]))
    return state

def get_state_edge_density():
    state = []
    edge_list=["143553082#0","143551389#0","348320661#1","-143553082#0","-143551389#0","-348320661#1"]
    for e in edge_list:
        veh_num = traci.edge.getLastStepVehicleNumber(e)
        state.append(veh_num)
    return state


def calc_reward(state, next_state):
    rew = 0
    lstate = list(state)[0]
    lnext_state = list(next_state)[0]
    for ind, (det_old, det_new) in enumerate(zip(lstate, lnext_state)):
        if ind < len(lstate)/2:
            rew += 1000*(det_new - det_old)
        else:
            rew += 1000*(det_old - det_new)

    return rew


def calc_reward_edge_density(state, next_state):
    rew=0
    for i in range(0,5):
        rew+=(np.var(np.array(state))-np.var(np.array(next_state)))
    return rew


def main():
    # Control code here
    

if __name__ == '__main__':
    main()
