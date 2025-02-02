# Referee software for powerlifting competitions

##  ‼️Before use

**The software is developed for use in a secure private network only (for security reasons). It is not recommended to use it on a public server!
Please change all default passwords and tokens immediately after installation.**

We recommend using the program as a Docker image. **If you run without Docker Node JS version >= 18.18.2 is required!**

**If you would run the image on a Raspberry Pi, make sure to run an OS in 64 bit. Otherwise the image didn't start.**

# Installation

1. Install Docker
2. Create folder for docker compose file and the database folder (set correct folder permissions!)
3. Run with docker compose file below (set the envs)
4. Open http://localhost:3030

# Docker Compose for Linux

```
version: "3"
services:
  referee:
    image: ghcr.io/franknitschke/referee:latest
    restart: always
    network_mode: host
    volumes:
      - ./database:/home/app/server/db/database
    environment:
      DOCKER_RUNNING: true
      SECRET: My secure Secret
      FETCH_INTERVAL: 2000
      VPORTAL_URL: bvdk
```

# Docker Compose for Windows / Mac OS

```
version: "3"
services:
  referee:
    image: ghcr.io/franknitschke/referee:latest
    restart: always
    ports:
      - 3030:3030
    volumes:
      - ./database:/home/app/server/db/database
    environment:
      DOCKER_RUNNING: true
      HOST_IP: your ip
      SECRET: My secure Secret
      FETCH_INTERVAL: 2000
      VPORTAL_URL: bvdk
```

# ENV Vars:

| ENV  | Value |
| ------------- | ------------- |
| DOCKER_RUNNING  | true / false => set true if running in docker will hide update function with git pull   |
| HOST_IP  | leave blank if running on linux (PI) - otherwise set the ip from your host (to show correct ip)  |
| FETCH_INTERVAL  | intervall to pull data from the vportal (default 2sec) => don't use any value below 2000  |
| VPORTAL_URL  | set url to pull data from: `dev` `staging` `bvdk` `oevk` => dev is default  |

## Autostart chromium on Raspberry Pi and load the referee screen
**Works with PI OS Bookworm only!**

Edit the .config/wayfire.ini file and add the following code to autostart section:

`sudo nano .config/wayfire.ini`

add text:

```
[autostart]
chromium = sleep 15;chromium-browser "http://localhost:3030/display" --kiosk --noerrdialogs --disable-infobars --no-first-run --ozone-platform=wayland --enable-features=OverlayScrollbar --start-maximized
```

Chormium will start (with a delay of 15 sec.) and show the referee screen in kiosk mode.


# Default credentials for /settings

User: admin
Pass: admin

‼️**Please change the passwords and referee tokens**‼️
