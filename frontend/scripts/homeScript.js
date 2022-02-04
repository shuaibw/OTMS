$('#bookButton').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate(
        {
            scrollTop: $('#searchTutors').offset().top - 80,
        },
        800
    );
});
$('#moreDetails1').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate(
        {
            scrollTop: $('#ourProcess').offset().top - 80,
        },
        800
    );
});
$('#reviews').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate(
        {
            scrollTop: $('#happyStudents').offset().top - 50,
        },
        800
    );
});
