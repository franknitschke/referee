# Referee software for powerlifting competitions

##  ‼️Before use

**The software is developed for use in a secure private network only (for security reasons). It is not recommended to use it on a public server!
Please change all default passwords and tokens immediately after installation.**

# Installation

1. Install Node.js >= 18.xx
2. Clone git repo
3. `cd yourFolder/server`
4. `npm i`

## Start

1. `cd referee/server`
2. `npm start`
3. `http://localhost:3030`



# Installation on RaspberryPi

Tested with Raspberry Pi OS 32-bit (Debian Bullseye) on a Pi 4.

### 1. Update Raspberry Pi
   
```
sudo apt-get update && sudo apt-get upgrade -y
```

### 2. Install Node.js

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### 3. Clone Repo

```
git clone https://github.com/franknitschke/referee.git
```

### 4. Installing PM2 for running app in background

```
sudo npm install pm2 -g
```

### 5. Installing node modules

```
cd referee/server
```
```
npm i
```

### 6. Running app in background

```
sudo pm2 startup
```
```
cd referee/server
```
```
sudo pm2 start npm --name "referee" -- start
```
```
sudo pm2 save
```

### 7. Load Chrome after Pi startet and show the display

7.1 Create a script file for loading Chrome with a delay of 30 sec. to make sure, that the server is allready running

```
cd
```
```
nano autostartchrome.sh
```

7.2 Add the following text

```
#!/bin/bash
sleep 30
chromium-browser --start-fullscreen --disable-infobars --app=http://localhost:3030/display
```

7.3 Save and exit.

7.4 Make the file executable

```
chmod +x autostartchrome.sh
```

7.5 Add the script to the Pi autostart

```
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

7.6 Add the following text to the end of the file

```
@/home/pi/autostartchrome.sh
```

7.7 Save and exit

### 8. Reboot the Pi


# Default credentials

For /settings

User: admin
Pass: admin

‼️**Please change the passwords and referee tokens**‼️
