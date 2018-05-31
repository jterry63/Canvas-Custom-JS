function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 60) return;
    setTimeout(function () {
        onElementRendered(selector, cb, _attempts);
    }, 250);
};

$(document).ready(function () {
    if (ENV.current_user_roles != null && (ENV.current_user_roles.indexOf("admin") >= 1 || ENV.current_user_roles.indexOf("teacher") >= 1)) {
        $('#menu').append('<a id="global_nav_catalog" href="https://hallco.catalog.instructure.com" class="ic-app-header__menu-list-link" target="_blank"><div class="menu-item-icon-container" aria-hidden="true"><i class="icon-rubric"></i></div><div class="menu-item__text">Catalog</div></a>');
    }

    if (document.URL.endsWith('settings') && (ENV.current_user_roles.indexOf("admin") === -1 || ENV.current_user_roles.indexOf("root_admin") === -1)) {
        $('.icon-copy-course').parent().remove();
    }

    onElementRendered('.menu-item__text:contains(Gauge)', function (el) {
        let hallco_guage_admins = ["170000004596595", "170000004596797", "67", "63", "68", "48287"];
        if (hallco_guage_admins.indexOf(ENV.current_user_id) <= -1) {
            $('.menu-item__text:contains(Gauge)').parent().parent().remove();
        }

    });
});




