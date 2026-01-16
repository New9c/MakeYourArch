export const WM_DATA = [
    {
        id: 'gnome',
        name: 'GNOME',
        image: '/img/WM/gnome.png',
        title: "Gnome: Default for a Reason",
        desc: "The default window manager",
        forces: { dm: 'gdm' },
        traits: ['mouse', 'bloated'],
        hue: 210,
        site: 'https://www.gnome.org',
        pkg: 'gnome',
    },
    {
        id: 'kde',
        name: 'KDE Plasma',
        image: '/img/WM/plasma.png',
        desc: "Looking like Windows",
        traits: ['mouse', 'bloated'],
        hue: 190,
        pkg: 'kde',
    },
    {
        id: 'niri',
        name: 'Niri',
        image: '/img/WM/niri.png',
        pkg: 'niri',
        title: "Niri: They See Me Scrolling",
        desc: "The most well known scrolling window manager, where moving through applications feel more like scrolling your feed",
        traits: ['keyboard'],
        hue: 20,
        github: 'https://github.com/YaLTeR/niri',
    },
    {
        id: 'hyprland',
        name: 'Hyprland',
        image: '/img/WM/hyprland.png',
        traits: ['keyboard', 'controversial'],
        pkg: 'hyprland',
        title: "Hyprland: Sweet Sweet Eye Candy",
        desc: "As the most used tiling window manager, Hyprland is the most flashy of them all.",
        hue: 290,
    }
];

export const DM_DATA = [
    { id: 'sddm', name: 'SDDM', pkg: 'sddm', docs: '/docs/sddm-guide' },
    { id: 'gdm', name: 'GDM', pkg: 'gdm', docs: '/docs/gnome-setup' }
];

export const TERM_DATA = [
    { id: 'alacritty', name: 'Alacritty', pkg: 'alacritty', docs: '/docs/terminal/Alacritty' },
    { id: 'kitty', name: 'Kitty', pkg: 'kitty', docs: '/docs/terminal/Kitty' },
    { id: 'konsole', name: 'Konsole', pkg: 'konsole', docs: '/docs/terminal/konsole' }
];
