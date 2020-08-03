# Traffic Control using Artificial Intelligence - SpeedWagon

### Installation
Instructions for installaion are given in accordance to Linux Mint 20 and Python 3.6.5.</br>

SUMO Installation: </br>
```console
$ sudo add-apt-repository ppa:sumo/stable
$ sudo apt-get update
$ sudo apt-get install sumo sumo-tools sumo-doc
```

Add SUMO to path variables </br>

Virtual Environment and Dependencies: </br>
```console
$ python -m virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

### Execution
Using reduced Queue Lengths as a reward: </br>
```console
$ python3 AdjustmentDensity.py
```

Using Mean Speed as a reward: </br>
```console
$ python3 AdjustmentSpeed.py
```
