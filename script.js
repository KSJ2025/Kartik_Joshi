/* =========================================================
   YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

menuBtn.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("open");

        const icon =
            menuBtn.querySelector("i");

        if (
            navLinks.classList.contains("open")
        ) {

            icon.className =
                "fa-solid fa-xmark";

        } else {

            icon.className =
                "fa-solid fa-bars";

        }

    }
);


/* Close mobile menu after clicking */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove("open");

                menuBtn
                    .querySelector("i")
                    .className =
                    "fa-solid fa-bars";

            }
        );

    });


/* =========================================================
   THEME
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight
                ? "light"
                : "dark"
        );

        themeBtn.innerHTML =
            isLight
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

    }
);


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const projects =
    document.querySelectorAll(
        ".project"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );


            const filter =
                button.dataset.filter;


            projects.forEach(
                project => {

                    const category =
                        project.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        project.style.display =
                            "block";

                        project.style.animation =
                            "projectIn .45s ease both";

                    } else {

                        project.style.display =
                            "none";

                    }

                }
            );

        }
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element =>
        revealObserver.observe(element)
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navItems.forEach(
                            link =>
                                link.classList.remove(
                                    "active"
                                )
                        );


                        const active =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );


                        if (active) {

                            active.classList.add(
                                "active"
                            );

                        }

                    }

                }
            );

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(
    section =>
        navObserver.observe(section)
);


/* =========================================================
   SCROLL TOP
========================================================= */

const scrollTop =
    document.getElementById(
        "scrollTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            scrollTop.classList.add(
                "show"
            );

        } else {

            scrollTop.classList.remove(
                "show"
            );

        }

    }
);


scrollTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   MOUSE PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 10;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 10;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   CONTACT FORM - EMAIL SUBMISSION
   AJAX submission: stays on this page and shows a popup.
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const contactSubmit =
    document.getElementById("contactSubmit");

const contactStatus =
    document.getElementById("contactStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            const originalButton =
                contactSubmit.innerHTML;


            contactSubmit.disabled = true;

            contactSubmit.innerHTML =
                '<span>Sending...</span>' +
                '<i class="fa-solid fa-spinner fa-spin"></i>';


            contactStatus.textContent =
                "Sending your message...";

            contactStatus.className =
                "contact-status";


            try {

                const formData =
                    new FormData(contactForm);

                const data =
                    Object.fromEntries(
                        formData.entries()
                    );


                // Allow you to reply directly to the visitor.
                data._replyto =
                    data.email;


                const response =
                    await fetch(
                        "https://formsubmit.co/ajax/kartikjoshi2025@gmail.com",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                // FormSubmit may return different success payloads
                // depending on the response format.
                // A successful HTTP response means the submission
                // was accepted without redirecting the visitor.

                if (!response.ok) {

                    let errorMessage =
                        "Unable to submit form";


                    try {

                        const errorResult =
                            await response.json();

                        errorMessage =
                            errorResult.message ||
                            errorMessage;

                    } catch (_) {}


                    throw new Error(
                        errorMessage
                    );

                }


                contactStatus.textContent =
                    "Thank you! Your message has been submitted successfully.";

                contactStatus.className =
                    "contact-status success";


                // Friendly popup — the visitor stays on the portfolio.

                alert(
                    "Thank you! Your message has been submitted successfully.\n\nI will get back to you soon."
                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                contactStatus.textContent =
                    "Message could not be sent. Please try again or email kartikjoshi2025@gmail.com directly.";

                contactStatus.className =
                    "contact-status error";


                alert(
                    "Sorry, the message could not be submitted. Please try again."
                );


            } finally {

                contactSubmit.disabled =
                    false;

                contactSubmit.innerHTML =
                    originalButton;

            }

        }
    );

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            navLinks.classList.remove(
                "open"
            );

            menuBtn
                .querySelector("i")
                .className =
                "fa-solid fa-bars";

        }

    }
);