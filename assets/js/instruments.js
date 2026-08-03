const instrCards = document.querySelectorAll(".instrCard");

instrCards.forEach(function(card) { //Loops through all 4 cards
    card.addEventListener("mouseenter", function() { //Flip when hover
        card.classList.add("flipped");
    });

    card.addEventListener("mouseleave", function() { //Remove flip effect when cursor leaves
        card.classList.remove("flipped");
    });
});
