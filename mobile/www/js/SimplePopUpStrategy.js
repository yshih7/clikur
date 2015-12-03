import {ValidationViewStrategy} from "aurelia-validation";

export class SimplePopUpStrategy extends ValidationViewStrategy
{
    constructor() {
        super();
    }

    prepareElement(validationProperty, element)
    {
        if (element.tagName === "INPUT" && element.getAttribute("type").match(/^(?:text|password|search)$/))
        {
            let existing = element.parentNode.querySelector(`#warn-${element.id}`);
            if (existing)
            {
                existing.textContent = "";
                existing.className = "warnPopUp inactive";
            }
            else
            {
                let warn = document.createElement("div");
                warn.className = "warnPopUp inactive";
                warn.id = `warn-${element.id}`;
                element.parentNode.insertBefore(warn, element);
            }
        }
    }
    
    updateElement(validationProperty, element)
    {
        let warn = element.parentNode.querySelector(`#warn-${element.id}`);
        
        if (!warn)  {
            return;
        }
        
        if ((validationProperty.isDirty || element.value) && !validationProperty.isValid)
        {
            warn.textContent = element.getAttribute("placeholder") + " " + validationProperty.message;
            warn.className = "warnPopUp active";
            element.setAttribute("data-valid", "false");
        }
        else
        {
            element.setAttribute("data-valid", "true");
            warn.className = "warnPopUp inactive";
        }
    }
}
