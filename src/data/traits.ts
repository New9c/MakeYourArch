import { faBolt, faLeaf, faWeightHanging, faWrench, faNewspaper, faComputerMouse, faKeyboard } from '@fortawesome/free-solid-svg-icons';

export const TRAIT_LIB = {
    mouse: {
        icon: faComputerMouse,
        desc: "Intuitive mouse navigation.",
        color: "#81c784"
    },
    keyboard: {
        icon: faKeyboard,
        desc: "Quick keyboard based navigation.",
        color: "#81c784"
    },

    lightweight: {
        icon: faLeaf,
        desc: "Uses minimal RAM and CPU resources.",
        color: "#81c784"
    },
    controversial: {
        icon: faNewspaper,
        desc: "There has been some drama regarding the creators",
        color: "#e57373"
    },
    bloated: {
        icon: faWeightHanging,
        desc: "Comes with everything included, but heavier on resources.",
        color: "#e57373"
    },
    customizable: {
        icon: faWrench,
        desc: "Requires editing config files to reach full potential.",
        color: "#64b5f6"
    }
};
