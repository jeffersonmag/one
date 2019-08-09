import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  get(key) {
    const res = window.sessionStorage.getItem(key);
    if (this.isJson(res)) {
      return JSON.parse(res);
    } else {
      return res;
    }
  }

  remove(key) {
    return window.sessionStorage.removeItem(key);
  }

  set(key, val) {
    if (this.isJson(val)) {
      val = JSON.stringify(val);
    }
    return window.sessionStorage.setItem(key, val);
  }

  clean() {
    window.sessionStorage.clear();
  }

  isJson(item) {
    item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }
}
