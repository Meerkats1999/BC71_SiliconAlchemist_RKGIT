import os
import sys
import numpy as np
import time

#Modules to be edited
from scripts.Dqn import Learner
from scripts.auxilliary import makemap

sys.path.insert(0, "/usr/share/sumo/tools")
sumoBinary = "/usr/bin/sumo-gui"
sumoCli = "/usr/bin/sumo"
sumoConfig = "data/bangalore.sumo.cfg"
dumpFile = "data/fcd_edgedensity.xml"
tripInfoFinal = "data/tripinfo_final.xml"
import traci

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
    sumoGuiCmd = [sumoBinary, "-c", sumoConfig, "--fcd-output", dumpFile, "--tripinfo-output", tripInfoFinal]
    sumoCliCmd = [sumoCli, "-c", sumoConfig, "--start"]
    traci.start(sumoCliCmd)
    TLIds = traci.trafficlight.getIDList()
    actionsMap = makemap(TLIds)
    detectorIDs = traci.inductionloop.getIDList()
    state_space_size = traci.inductionloop.getIDCount()*2
    action_space_size = len(actionsMap)
    agent = Learner(state_space_size, action_space_size, 1.0)
    #agent.load("./save/EdgeDensityModel.h5")
    traci.close()
    epochs = 10
    for simulation in range(epochs):
        if(simulation % 9 == 0 and simulation != 0):
            traci.start(sumoGuiCmd)
        else:
            traci.start(sumoCliCmd)
        # Get number of induction loops
        state = get_state(detectorIDs)
        state1 = get_state_edge_density()
        total_reward = 0
        simulationSteps = 0
        while simulationSteps < 1000:
            action = agent.act(state)
            lightsPhase = actionsMap[action]
            for light, index in zip(TLIds, range(len(TLIds))):
                traci.trafficlight.setPhase(light, lightsPhase[index])
            for i in range(2):
                traci.simulationStep()
            simulationSteps += 2
            next_state = get_state(detectorIDs)
            next_state1 = get_state_edge_density()
            reward = calc_reward(state, next_state)
            #reward = calc_reward_edge_density(state1, next_state1)
            total_reward += reward
            #agent.remember(state1, action, reward, next_state1)
            state = next_state
            state1 = next_state1
        traci.close()

if __name__ == '__main__':
    main()