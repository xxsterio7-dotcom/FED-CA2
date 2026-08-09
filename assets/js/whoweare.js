function scrollToTop(){
    window.scrollTo({ top:0, behavior:"smooth" });
}


const revealTargets = document.querySelectorAll(".scroll-animate");

if(revealTargets.length){

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold:.15 });

    revealTargets.forEach(target => revealObserver.observe(target));

}

document.querySelectorAll(".team-card__photo img").forEach(img => {

    img.addEventListener("error", () => {
        img.style.display = "none";
    });

});
