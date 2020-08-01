import numpy as np
import keras
from keras.models import Sequential
from keras.layers import Dense
from collections import deque
import random
from keras.optimizers import Adam
import h5py


class Learner:
    def __init__(self, state_space_size, action_space_size, exploration):
        self.state_size = state_space_size
        self.action_size = action_space_size
        self.learning_rate = 0.001
        self.firstHidden = 604
        self.secondHidden = 1166
        self.regressor = self._build_model()
        self.memory = deque(maxlen=2000)
        self.batch_size = 200
        self.gamma = 0.95

    def _build_model(self):
        regressor = Sequential()
        regressor.add(Dense(output_dim=self.firstHidden, input_dim=self.state_size, activation='relu'))
        regressor.add(Dense(output_dim=self.secondHidden, activation='relu'))
        regressor.add(Dense(output_dim=self.action_size, activation='linear'))
        regressor.compile(optimizer=Adam(lr=self.learning_rate), loss='mse')
        return regressor

    def act(self, state):
        return action

    def remember(self, state, action, reward, next_state):
        return True

    def replay(self):
        return True

    def load(self, name):
        return True

    def save(self, name):
        return True