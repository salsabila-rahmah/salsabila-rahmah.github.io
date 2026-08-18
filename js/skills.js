$(document).ready(function () {

    var $skillsGrid = $('.skills_grid').isotope({
        itemSelector: '.all',
        layoutMode: 'fitRows'
    });

    var $skillsItems = $('.skills_grid .all');
    var $moreButton = $('#skillsMoreBtn');

    var maxRows = 5;
    var columns = 4;
    var maxVisible = maxRows * columns;

    var currentFilter = '*';
    var expanded = false;


    function updateSkills() {

        // If a specific category is selected,
        // show everything and hide the button.
        if (currentFilter !== '*') {

            expanded = false;

            $skillsGrid.isotope({
                filter: currentFilter
            });

            $moreButton.hide();

            return;
        }


        // "All" category
        $moreButton.show();

        var visibleItems = $skillsItems.filter(function () {
            return $(this).is(':visible');
        });

        // Determine which items belong to the All view
        var filteredItems = $skillsItems;

        if (expanded) {

            $skillsGrid.isotope({
                filter: '*'
            });

            $moreButton.text('See Less');

        } else {

            // Hide everything after the first 20 items
            filteredItems.each(function (index) {

                if (index < maxVisible) {
                    $(this).removeClass('skill-hidden');
                } else {
                    $(this).addClass('skill-hidden');
                }

            });

            $skillsGrid.isotope({
                filter: function () {
                    return !$(this).hasClass('skill-hidden');
                }
            });

            $moreButton.text('See More');
        }
    }


    // Filter buttons
    $('.skills_filters_menu li').on('click', function () {

        $('.skills_filters_menu li').removeClass('active');
        $(this).addClass('active');

        currentFilter = $(this).attr('data-filter');

        expanded = false;

        // Remove hidden state when switching categories
        $skillsItems.removeClass('skill-hidden');

        updateSkills();
    });


    // See More / See Less
    $moreButton.on('click', function () {

        expanded = !expanded;

        if (expanded) {

            $skillsItems.removeClass('skill-hidden');

            $skillsGrid.isotope({
                filter: '*'
            });

            $moreButton.text('See Less');

        } else {

            $skillsItems.each(function (index) {

                if (index < maxVisible) {
                    $(this).removeClass('skill-hidden');
                } else {
                    $(this).addClass('skill-hidden');
                }

            });

            $skillsGrid.isotope({
                filter: function () {
                    return !$(this).hasClass('skill-hidden');
                }
            });

            $moreButton.text('See More');
        }

    });


    // Initial state
    $skillsItems.each(function (index) {

        if (index < maxVisible) {
            $(this).removeClass('skill-hidden');
        } else {
            $(this).addClass('skill-hidden');
        }

    });

    $skillsGrid.isotope({
        filter: function () {
            return !$(this).hasClass('skill-hidden');
        }
    });

});