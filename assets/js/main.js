// import M from '../lib/materialize/js/materialize.js';
document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible');
    var collapsiblesInstances = M.Collapsible.init(collapsibles);
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    var dropdownsInstances = M.Dropdown.init(dropdowns, {
        onOpenStart: e => {
            var target = e;
            // Find the caret
            var caret = target.querySelector('i.material-icons');
            // change caret of the target
            if (caret) {
                if (caret.innerText === 'expand_more') caret.innerText = 'expand_less';
            }
        },
        onCloseStart: e => {
            var target = e;
            // Find the caret
            var caret = target.querySelector('i.material-icons');
            // change caret of the target
            if (caret) {
                if (caret.innerText === 'expand_less') caret.innerText = 'expand_more';
            }

        }
    });


    var carousels = document.querySelectorAll('.carousel');
    var carouselInstance = M.Carousel.init(carousels, {
        duration: 100,
        dist: -100,
        noWrap: !0,
        // numVisible: 1,
        padding: 10,
        // fullWidth: !0,
        // indicators: !0,
    });

    console.log(typeof M);

});