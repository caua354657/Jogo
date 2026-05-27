class EventManager {
    constructor() {
        this._listeners = {};
    }

    on(event, callback) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this._listeners[event]) return;
        this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this._listeners[event]) return;
        this._listeners[event].forEach(cb => {
            try { cb(data); } catch (e) { console.error(`EventManager error on "${event}":`, e); }
        });
    }

    once(event, callback) {
        const wrapper = (data) => { callback(data); this.off(event, wrapper); };
        this.on(event, wrapper);
    }
}
