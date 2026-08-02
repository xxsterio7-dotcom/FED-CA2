

const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const dropdown = link.nextElementSibling;

        document.querySelectorAll(".navbar__dropdown").forEach(menu => {
            if(menu !== dropdown){
                menu.classList.remove("show");
            }
        });

        dropdown.classList.toggle("show");
    });
});

document.addEventListener("click", (e) => {
    if(!e.target.closest(".navbar__item")){
        document.querySelectorAll(".navbar__dropdown").forEach(menu => {
            menu.classList.remove("show");
        });
    }
});


const backToTop = document.getElementById("backToTop");

if(backToTop){

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}


const footer = document.querySelector(".footer");

if(footer){

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){
                footer.classList.add("footer--show");
            }

        });

    }, {

        threshold:.2

    });

    observer.observe(footer);

}

const logo = document.querySelector(".footer__logo");

if(logo){

    logo.addEventListener("mouseenter", () => {
        logo.style.transform = "rotate(-5deg) scale(1.05)";
    });

    logo.addEventListener("mouseleave", () => {
        logo.style.transform = "rotate(0deg) scale(1)";
    });

}


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("newsletterForm");
    const confirmMsg = document.getElementById("formConfirm");

    if(!form) return;

    const requiredFields = ["firstName", "lastName", "email"];

    function isValidEmail(value){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function clearErrors(){
        requiredFields.forEach(id => {
            document.getElementById(id).classList.remove("invalid");
        });
    }

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        clearErrors();

        let hasError = false;

        requiredFields.forEach(id => {

            const field = document.getElementById(id);

            if(!field.value.trim()){
                field.classList.add("invalid");
                hasError = true;
            }

        });

        const emailField = document.getElementById("email");

        if(emailField.value.trim() && !isValidEmail(emailField.value.trim())){
            emailField.classList.add("invalid");
            hasError = true;
        }

        if(hasError){
            confirmMsg.textContent = "Please fill in first name, last name and a valid email.";
            confirmMsg.classList.add("error");
            return;
        }

        confirmMsg.classList.remove("error");

        const firstName = document.getElementById("firstName").value.trim();

        confirmMsg.textContent = `Thanks, ${firstName}! You're on the list.`;

        form.reset();

    });

});

const year = document.getElementById("currentYear");

if(year){
    year.textContent = new Date().getFullYear();
}
