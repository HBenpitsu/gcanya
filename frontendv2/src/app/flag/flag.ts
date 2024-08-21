import { vault } from "../vault";

export class Flag {
    flag_name: string;
    value: boolean;
    constructor(flag_name: string) {
        this.flag_name = 'Flag/'+flag_name;
        vault.setDefault(this.flag_name, 'false');
        this.value = vault.get(this.flag_name) === 'true';
        vault.addUpdateListener(this.flag_name, async (value) => {
            this.value = value === 'true';
        });
    }

    addFlagChangedListener(callback: (value: boolean) => Promise<void>) {
        vault.addUpdateListener(this.flag_name, async (value) => {
            await callback(value === 'true');
        });
    }

    turnOn() {
        this.value = true;
        vault.set(this.flag_name, 'true');
    }

    turnOff() {
        this.value = false;
        vault.set(this.flag_name, 'false');
    }

    isOn() {
        return this.value;
    }
}