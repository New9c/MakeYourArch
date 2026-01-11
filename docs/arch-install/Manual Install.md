---
sidebar_position: 2
---

Last Update: 2025/09/04

My code to install Arch C:
Visit [the offical guide](https://wiki.archlinux.org/title/Installation_guide) for more in depth troubleshooting, this is a simplified version with only the commands that I needed.
If something is `<in-brackets>` replace them with what it is refering to.
^ means Ctrl. So ^C means Ctrl+C etc.

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

# Optional: run 'timedatectl' to check if time is synced

# Verify boot mode: (it's commented as you technically don't need to run it)
# cat /sys/firmware/efi/fw_platform_size
# if this returns 64, this guide should work, else the final step (Installing GRUB) will have issues :(

# Partition disks


lsblk # Get <dev-disk>
# Here is a bit of mine:
# nvme0n1      259:0    0 476.9G  0 disk 
# ├─nvme0n1p1  259:1    0   260M  0 part 
# ├─nvme0n1p2  259:2    0    16M  0 part 
# ├─nvme0n1p3  259:3    0 412.7G  0 part 
# ├─nvme0n1p4  259:4    0  62.7G  0 part 
# ├─nvme0n1p5  259:5    0   1.1G  0 part 
# └─nvme0n1p6  259:6    0   200M  0 part 
# nvme1n1      259:7    0   1.8T  0 disk 
# ├─nvme1n1p1  259:8    0     1G  0 part 
# ├─nvme1n1p2  259:9    0   862G  0 part 
fdisk -l # This can help too

# cfdisk is a TUI, use arrow keys to move and Enter to choose
cfdisk </dev/disk>
# 'cfdisk /dev/nvme1n1' for instance, p is partition, we are gonna make that
# If they ask for a label, GPT should work
# If you have a clean SSD for this, you probably wanna pick the one without any existing partitions
# Don't pick your USB either, that shouldn't have much storage so I think you know which one it is

# NOW IN CFDISK --------------------

# Delete anything unneeded partitions

# New > 1G > Type > EFI System
# 1G is usually the right size you want

# New > <size-you-desire>G > Type > Linux root
# If you wanna use the whole SSD, size-you-desire is probably auto-written for you, filling the rest of the space
# You may see T, not G, like 1.8T standing for Terabyte

# Regret any choice you did? Use Quit to get out and do this again, DO NOT WRITE

# Write > yes
# This is the most important part, everything before can be fixed, but writing cannot be undone! Please make sure all your important data are safe with a backup, or triple check that this is the right SSD

# Quit
# END OF CFDISK --------------------

lsblk # Get /dev/root_partition (Big Size) & /dev/efi_partition (1G)
# You should see your new partitions now, if not redo the cfdisk part

# Formatting
mkfs.ext4 </dev/root_partition> # make file system - ext4
mkfs.fat -F 32 </dev/efi_partition> # make file system - FAT32
# My laptop for example:
# mkfs.ext4 /dev/nvme1n1p2
# mkfs.fat -F 32 /dev/nvme1n1p1

cfdisk </dev/disk>
# You should see vfat and ext4 as their filetype below
# Then Quit

# Mount
mount </dev/root_partition> /mnt
mount --mkdir </dev/efi_partition> /mnt/boot

# mount --mkdir </dev/efi_partition> /mnt/boot is the same as:
# mkdir /mnt/boot (making directory)
# mount </dev/efi_partition> /mnt/boot

# Installing basics
pacstrap -K /mnt base linux linux-firmware
genfstab -U /mnt >> /mnt/etc/fstab

# we are currently still in the USB, as I like to think, but after installing the basics, time to move into the actual computer!
# Chroot
arch-chroot /mnt # Change root to mnt

# Time
ln -sf /usr/share/zoneinfo/<Region/City> /etc/localtime
# timedatectl list-timezones (Get Region/City)
# ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime
hwclock --systohc

# Locales
pacman -S neovim nano # get a text editor

# nano is recommended for beginners, arrow keys to move, ^O to save(write), ^X to quit
# nano /etc/locale.gen

# Remove the # on your locale, which is probably en_US.UTF-8 UTF-8
# ^O > Enter (Save)
# ^X (Quit)

# I like using neovim tho, type :q! to exit if you accidently use it
# moving forward use nano instead of nvim if you want to use nano
nvim /etc/locale.gen
locale-gen # generate locales

# Create locale.conf
nvim /etc/locale.conf
# Add this line:
# LANG=en_US.UTF-8
# change to something else if yours is different

# Adding colemak as the keyboard layout, again you don't need to
nvim /etc/vconsole.conf
# KEYMAP=colemak

# Add hostname (computer name)
nvim /etc/hostname
# Rules (from arch wiki): it must contain from 1 to 63 characters, using only lowercase a to z, 0 to 9, and -, and must not start with -.
# have fun with it! Mine is:
# archbtw

# Set root passwd
passwd

# Make new sudo (super do-er) user
pacman -S sudo
EDITOR=nvim visudo # make those in wheel group have sudo
# Remove # from:
# %wheel ALL=(ALL) ALL

useradd -m -G wheel <your-username> # New user with 
# useradd -m -G wheel ninc
passwd <your-username> # set password
# passwd ninc

# NetworkManager
pacman -S networkmanager
systemctl enable NetworkManager
# use nmtui in the terminal to connect to wifi in the future

# Bluetooth
pacman -S bluez bluez-utils blueman
systemctl enable --now bluetooth

# We will add audio in the future
# Boot loader GRUB
pacman -S grub efibootmgr
lsblk # Get <efi-dir>, it's probably /boot if you are following the guide
grub-install --target=x86_64-efi --efi-directory=<efi-dir> --bootloader-id=<boot-id>
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ArchBTW
grub-mkconfig -o /boot/grub/grub.cfg

# Reboot! WOO
exit
reboot

# Install complete! now let's set up audio
# Login to <your-username>
sudo pacman -S pipewire pipewire-pulse pipewire-alsa wireplumber
systemctl --user enable pipewire pipewire-pulse wireplumber

```
