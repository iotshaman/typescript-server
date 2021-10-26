import { v4 } from "uuid";

export class TodoItem {

	id: string;
	description: string;
	active: boolean;
	
	constructor(description: string) {
		this.id = v4();
		this.description = description;
		this.active = true;
	}

}