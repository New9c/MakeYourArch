---
sidebar_position: 1
---

```sh
# Get colemak layout for my keyboard, you may not wanna do this
loadkeys colemak

# Internet Wifi (if needed)
iwctl
device list # Get <device-name>
station <device-name> get-networks # Get <wifi-name> aka SSID
station <device-name> connect <wifi-name>
exit

# Check if you got internet
ping fb.com
# If it goes "64 bytes received..." leave with ^C
# If this does not work connect to wifi or plug in ethernet
pacman -Sy

pacman -Syu archinstall

# Run archinstall
archinstall
