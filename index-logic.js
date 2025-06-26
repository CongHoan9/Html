function loadPage(fileName) {
    $('#mobileMenu').hide(200);
    $('#Content').load(fileName);
    $(`#categoryFilter input[type=radio]`).each(function () {
        const val = $(this).val();
        const pageMap = {
            'Main': 'Main.html',
            'Menu': 'Menu.html',
            'Story': 'Story.html',
            'Contact': 'Contact.html',
        };
        if (pageMap[val] === fileName) {
            this.checked = true;
        }
    });
}

$(document).ready(function () {
    loadPage('Main.html');
});

function toggleMenu() {
    $('#mobileMenu').slideToggle(200);
}