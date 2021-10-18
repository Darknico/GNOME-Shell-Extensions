/*--------------------------------------*/
/*  Poweroff Button on Topbar           */
/*  ==================================  */
/*  GNOME Shell Extensions              */
/*  Darknico - http://www.darknico.com  */
/*--------------------------------------*/

const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;

let icon = null;
let button = null;

function init() {

}

function enable() {

    icon = new St.Icon({
        icon_name: 'system-shutdown',
        style_class: 'system-status-icon'
    });

    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    button.set_child(icon);
    button.connect('button-press-event', _poweroff);

    Main.panel._rightBox.insert_child_at_index(button, -1);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
    if (icon) {
        icon.destroy()
        icon = null;
    }
    if (button) {
        button.destroy();
        button = null;
    }
}


function _poweroff() {
    try {
        Util.trySpawnCommandLine('gnome-session-quit --power-off');
    } catch (err) {
        Main.notify("Error " + err);
    }
}

