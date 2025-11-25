// نشغّل كل حاجة بعد تحميل الـ DOM
document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     NAVBAR TOGGLE (موبايل)
  ========================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links"); // مش .nav

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* =========================
     HERO SLIDER (لو موجود)
  ========================= */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots .dot");

  if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    const SLIDE_INTERVAL = 7000;

    function goToSlide(index) {
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
      currentSlide = index;
    }

    let sliderTimer = setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }, SLIDE_INTERVAL);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.slide);
        goToSlide(index);
        clearInterval(sliderTimer);
        sliderTimer = setInterval(() => {
          const next = (currentSlide + 1) % slides.length;
          goToSlide(next);
        }, SLIDE_INTERVAL);
      });
    });

    // أول سلايد
    goToSlide(0);
  }

  /* =========================
     BLOG PAGINATION (لو في مدونة)
  ========================= */
  const grid = document.querySelector(".blog-grid");

  if (grid) {
    const postsPerPage = 8;
    const cards = Array.from(grid.querySelectorAll(".blog-card"));
    const pageButtons = document.querySelectorAll(".page-link");

    const totalPages = Math.ceil(cards.length / postsPerPage);

    function showPage(page) {
      grid.innerHTML = "";

      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;

      cards.slice(start, end).forEach((card) => grid.appendChild(card));

      pageButtons.forEach((btn) => {
        btn.classList.remove("active");
        if (parseInt(btn.dataset.page) === page) {
          btn.classList.add("active");
        }
      });
    }

    if (cards.length > 0) {
      showPage(1);
    }

    pageButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = parseInt(btn.dataset.page);
        showPage(page);
      });
    });
  }

  /* =========================
     FAQ ACCORDION (لو في أسئلة)
  ========================= */
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const header = item.querySelector(".faq-header");
      const icon = item.querySelector(".faq-toggle-icon");

      if (!header) return;

      header.addEventListener("click", () => {
        // قفل الباقي
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherIcon = other.querySelector(".faq-toggle-icon");
            if (otherIcon) otherIcon.textContent = "˅";
          }
        });

        // فتح / قفل الحالي
        const isOpen = item.classList.toggle("is-open");
        if (icon) icon.textContent = isOpen ? "˄" : "˅";
      });
    });
  }
});
