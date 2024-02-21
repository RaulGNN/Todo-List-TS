import ListItem from "./ListItem";

interface List {
	list: ListItem[];
	load(): void;
	save(): void;
	clearList(): void;
	addItem(item: ListItem): void;
	deleteItem(id: string): void;
}

export default class FullList implements List {
	// This is bc we are only having 1 list
	static instance: FullList = new FullList();

	private constructor(private _list: ListItem[] = []) {}

	get list(): ListItem[] {
		return this._list;
	}

	load(): void {
		const storedList: string | null = localStorage.getItem("myList");
		if (typeof storedList !== "string") return;

		const parsedList: { _id: string; _item: string; _checked: boolean }[] =
			JSON.parse(storedList);

		parsedList.forEach((item) => {
			const newListItem = new ListItem(
				item._id,
				item._item,
				item._checked
			);
			FullList.instance.addItem(newListItem);
		});
	}
	save(): void {
		localStorage.setItem("myList", JSON.stringify(this._list));
	}

	/**
	 * Clears the list of items.
	 */
	clearList(): void {
		this._list = [];
		this.save();
	}

	addItem(item: ListItem): void {
		this._list.push(item);
	}

	deleteItem(id: string): void {
		for (var i = 0; i < this._list.length; i++) {
			if (id == this._list[i].id) {
				this._list.splice(i, 1);
			}
		}
		this.save();
	}
}
