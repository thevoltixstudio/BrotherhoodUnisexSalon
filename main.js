function applySalonDetails() {
  if (typeof salonDetails === "undefined") return;

  document.querySelectorAll("[data-salon-logo]").forEach((element) => {
    if (!salonDetails.logoImage) return;

    element.innerHTML = `<img src="${salonDetails.logoImage}" alt="${salonDetails.salonName} logo" class="brand-logo-img" onerror="this.style.display='none'; this.parentElement.textContent='B';" />`;
  });

  document.querySelectorAll("[data-salon='name']").forEach((element) => {
    element.textContent = salonDetails.salonName;
  });

  document.querySelectorAll("[data-salon='short-name']").forEach((element) => {
    element.textContent = salonDetails.shortName;
  });

  document.querySelectorAll("[data-salon='tagline']").forEach((element) => {
    element.textContent = salonDetails.tagline;
  });

  document.querySelectorAll("[data-salon='phone']").forEach((element) => {
    element.textContent = salonDetails.phoneDisplay;
  });

  document.querySelectorAll("[data-salon='address']").forEach((element) => {
    element.textContent = salonDetails.address;
  });

  document.querySelectorAll("[data-salon='hours']").forEach((element) => {
    element.textContent = salonDetails.hours;
  });

  document.querySelectorAll("[data-salon='email']").forEach((element) => {
    element.textContent = salonDetails.email;
  });

  document.querySelectorAll("[data-salon-phone-link]").forEach((element) => {
    element.href = `tel:${salonDetails.phoneLink}`;
  });

  document.querySelectorAll("[data-salon-email-link]").forEach((element) => {
    element.href = `mailto:${salonDetails.email}`;
  });

  document.querySelectorAll("[data-salon-map-link]").forEach((element) => {
    element.href = salonDetails.mapUrl;
  });

  const enquiryForm = document.querySelector("[data-enquiry-form]");
  if (enquiryForm) {
    enquiryForm.action = salonDetails.formSubmitAction;
  }
}

function setupWhatsappButton() {
  if (typeof salonDetails === "undefined" || document.getElementById("whatsappFloat")) return;

  const message = encodeURIComponent(salonDetails.whatsappMessage || "Hello, I want to enquire about your services.");
  const button = document.createElement("a");
  button.id = "whatsappFloat";
  button.href = `https://wa.me/${salonDetails.whatsappNumber}?text=${message}`;
  button.target = "_blank";
  button.rel = "noopener";
  button.className = "fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200";
  button.setAttribute("aria-label", "Chat on WhatsApp");
  button.innerHTML = `
    <svg viewBox="0 0 32 32" class="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3.2A12.73 12.73 0 0 0 5.1 22.45L3.2 29.2l6.94-1.82A12.72 12.72 0 1 0 16.04 3.2Zm0 23.26a10.5 10.5 0 0 1-5.36-1.47l-.38-.23-4.12 1.08 1.1-4.02-.25-.41a10.48 10.48 0 1 1 9.01 5.05Zm5.74-7.86c-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1.01 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.45.2 1.99.12.61-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z"/>
    </svg>
  `;

  document.body.appendChild(button);
}

function showPopup(message, type = "success") {
  const oldPopup = document.getElementById("sitePopup");
  if (oldPopup) oldPopup.remove();

  const popup = document.createElement("div");
  popup.id = "sitePopup";
  popup.className = "fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5";
  const isSuccess = type === "success";
  popup.innerHTML = `
    <div class="w-full max-w-md rounded-md bg-white p-7 text-center shadow-2xl">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
        <span class="text-2xl font-black">${isSuccess ? "OK" : "!"}</span>
      </div>
      <h2 class="mt-5 text-2xl font-black text-ink">${isSuccess ? "Enquiry Sent" : "Submission Failed"}</h2>
      <p class="mt-3 leading-7 text-muted">${message}</p>
      <button type="button" class="mt-6 rounded-md bg-ink px-6 py-3 text-sm font-black text-white hover:bg-navy" data-popup-close>Close</button>
    </div>
  `;

  document.body.appendChild(popup);
  popup.querySelector("[data-popup-close]").addEventListener("click", () => popup.remove());
  popup.addEventListener("click", (event) => {
    if (event.target === popup) popup.remove();
  });
}

function setupAjaxEnquiryForm() {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.classList.add("opacity-70");
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("FormSubmit did not accept the enquiry.");
      }

      form.reset();
      showPopup("Thank you. Your enquiry has been submitted successfully. We will contact you soon.", "success");
    } catch (error) {
      showPopup("Sorry, the enquiry could not be sent right now. Please call or WhatsApp the salon directly.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove("opacity-70");
      }
    }
  });
}

function setupMobileMenu() {
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  if (!menuButton || !navLinks) return;

  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}

function setupHomeHeroSlideshow() {
  const slideshow = document.querySelector("[data-home-hero-slideshow]");
  if (!slideshow) return;

  const fallbackImages = ["images/Photo1.jpg"];
  const images = (typeof galleryImages === "undefined" ? fallbackImages : galleryImages).filter(Boolean);
  if (!images.length) return;

  const firstSlide = document.createElement("img");
  const secondSlide = document.createElement("img");
  const slides = [firstSlide, secondSlide];

  slides.forEach((slide, index) => {
    slide.className = `hero-slide${index === 0 ? " is-active" : ""}`;
    const salonName = typeof salonDetails !== "undefined" && salonDetails.salonName ? salonDetails.salonName : "Salon";
    slide.alt = `${salonName} photo`;
    slide.loading = index === 0 ? "eager" : "lazy";
    slide.decoding = "async";
    slide.onerror = () => {
      slide.style.display = "none";
    };
    slideshow.appendChild(slide);
  });

  let activeSlide = 0;
  let imageIndex = 0;
  firstSlide.src = images[0];
  if (images.length > 1) secondSlide.src = images[1];

  if (images.length < 2) return;

  setInterval(() => {
    imageIndex = (imageIndex + 1) % images.length;
    const nextSlide = activeSlide === 0 ? 1 : 0;
    slides[nextSlide].style.display = "block";
    slides[nextSlide].src = images[imageIndex];
    slides[nextSlide].classList.add("is-active");
    slides[activeSlide].classList.remove("is-active");
    activeSlide = nextSlide;
  }, 10000);
}

applySalonDetails();
setupMobileMenu();
setupWhatsappButton();
setupAjaxEnquiryForm();
setupHomeHeroSlideshow();
