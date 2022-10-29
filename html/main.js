let buttonParams = [];
let resName = GetParentResourceName();

$("#container").hide();

const openMenu = (data = null) => {
    let html = "";
    data.forEach((item, index) => {
        if(!item.hidden) {
            let header = item.header;
            let message = item.txt || item.text;
            let isMenuHeader = item.isMenuHeader;
            let isDisabled = item.disabled;
            let icon = item.icon;
            html += getButtonRender(header, message, index, isMenuHeader, isDisabled, icon);
            if (item.params) buttonParams[index] = item.params;
        }
    });

    $("#container").show();
    $("#buttons").html(html);

    $('.button').click(function() {
        const target = $(this)
        if (!target.hasClass('title') && !target.hasClass('disabled')) {
            postData(target.attr('id'));
        }
    });
};

const getButtonRender = (header, message = null, id, isMenuHeader, isDisabled, icon) => {
    return `
        <div class="${isMenuHeader ? "title" : "button"} ${isDisabled ? "disabled" : ""}" id="${id}">
            <div class="icon"> <img src=nui://${icon} width=30px onerror="this.onerror=null; this.remove();"> <i class="${icon}" onerror="this.onerror=null; this.remove();"></i> </div>
            <div class="column">
            <div class="header"> ${header}</div>
            ${message ? `<div class="text">${message}</div>` : ""}
            </div>
        </div>
    `;
};

const closeMenu = () => {
    $("#container").hide();
    $("#buttons").html(" ");
    buttonParams = [];
};

const postData = (id) => {
    $.post(`https://${resName}/clickedButton`, JSON.stringify(parseInt(id) + 1));
    return closeMenu();
};

const cancelMenu = () => {
    $.post(`https://${resName}/closeMenu`);
    return closeMenu();
};

window.addEventListener("message", (event) => {
    const data = event.data;
    const buttons = data.data;
    const action = data.action;

    switch (action) {
        case "show_menu":
            return openMenu(buttons);
        case "hide_menu":
            return closeMenu();
        default:
            return;
    }
});

document.onkeyup = function (event) {
    const charCode = event.key;
    if (charCode == "Escape") {
        cancelMenu();
    }
};