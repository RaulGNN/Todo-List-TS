import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    // Singleton pattern
    static instance: ListTemplate = new ListTemplate(); 


    ul: HTMLUListElement
    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(element =>{

            // Create the <li> element
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"
            
            // Create the <input> 
            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = element.id
            check.checked = element.checked

            li.append(check)  // Append the <input> inside the <li>
            
            // EventListener for when the element in the list has changed so we altern the property
            check.addEventListener('change', () => {
                element.checked = !element.checked
                fullList.save()
            })
            
            // Create the <label>
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = element.id
            label.textContent = element.item

            li.append(label) // Append the <label> inside the <li>

            // Create the <button>
            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button"
            button.textContent = "X"

            li.append(button) // Append the <button> inside the <li>

            // EventListener button
            button.addEventListener('click', () => {
                fullList.deleteItem(element.id)
                this.render(fullList)
            })

            // Lastly, we append the <li> element we´ve created to the <ul>
            this.ul.append(li)
        })
    }
}