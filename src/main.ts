import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const inicialize = (): void => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

    /*
    *   Add Item
    */

	// EventListener for submit
	itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
		event.preventDefault(); // Page doesn´t reload
		const input = document.getElementById("newItem") as HTMLInputElement;
		const newEntryText: string = input.value.trim();
		if (!newEntryText) return;

        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) : 1
        const newItem = new ListItem(itemId.toString(), newEntryText)

        // Add newItem to the FullList
        fullList.addItem(newItem)
        template.render(fullList)
	});

	/*
	 *   Clear Items
	 */
	const clearItems = document.getElementById(
		"clearItemsButton"
	) as HTMLButtonElement;

	// EventListener -> We clear the fullList and the template
	clearItems.addEventListener("click", (): void => {
		fullList.clearList();
		template.clear();
	});

	fullList.load();
	template.render(fullList);
};

document.addEventListener("DOMContentLoaded", inicialize);
