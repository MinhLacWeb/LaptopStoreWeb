import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class LocalStoreService {
    private LOCAL_STORAGE_KEY = "fjfieudhrtiredfg"
    private ls = window.localStorage;
    private debugMode = true;

    constructor() { }

    public setLocalItem(key: string, value: string) {
        if (this.debugMode) {
            this.ls.setItem(key, value);
            return;
        }
        this.ls.setItem(this.set(this.LOCAL_STORAGE_KEY, key), this.set(this.LOCAL_STORAGE_KEY, value));
        return true;
    }

    public getLocalItem(key: string) {
        if (this.debugMode) {
            const value = this.ls.getItem(key);
            return value;
        }


        const decryptedValue = this.ls.getItem(this.set(this.LOCAL_STORAGE_KEY, key));
        if (decryptedValue === null) {
            return '';
        } else {
            return (this.get(this.LOCAL_STORAGE_KEY, decryptedValue));
        }
    }

    public removeLocalItem(key: string) {
        if (this.debugMode) {
            this.ls.removeItem(key);
        }
        this.ls.removeItem(this.set(this.LOCAL_STORAGE_KEY, key));
    }

    public clearLocal() {
        this.ls.clear();
    }

    public encryptPassword(value: string, encrypt: boolean) {
        if (encrypt) {
            return this.set(this.LOCAL_STORAGE_KEY, value);
        } else {
            return value;
        }
    }

    public decryptPassword(value: string) {
        return this.get(this.LOCAL_STORAGE_KEY, value);
    }

    private set(keys: string, value: string) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();

    }

    private get(keys: string, value: string) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);

    }
}
