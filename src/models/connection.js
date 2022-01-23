export default class {
	constructor(url = '', onmessage = () => { }) {
		this.url = url;
		this.onmessage = onmessage;
		this.init();
	}
	init() {
		try { this.wsConnection.close() } catch { };
		this.wsConnection = new WebSocket(this.url);

		this.wsConnection.onopen = () => {
			document.dispatchEvent(new CustomEvent("connected"));
			console.info("Соединение установлено.");
		};

		this.wsConnection.onmessage = (event) => this.onmessage(event.data);

		this.wsConnection.onclose = (event) => {
			document.dispatchEvent(new CustomEvent("disconnected"));
			if (event.wasClean) {
				console.info('Соединение закрыто чисто');
			} else {
				console.warn('Обрыв соединения'); // например, "убит" процесс сервера
			}
			setTimeout(() => this.init(), 6000);
		};

		this.wsConnection.onerror = () => {
			document.dispatchEvent(new CustomEvent("disconnected"));
		};
	}

	send(data) {
		switch (typeof (data)) {
			case 'object':
				data = JSON.stringify(data);
				break;
			case 'number':
				data = data.toString();
				break;
		}
		// readyState - true, если есть подключение
		if (!this.wsConnection.readyState) setTimeout(() => this.send(data), 500);
		else this.wsConnection.send(data);
	}
};