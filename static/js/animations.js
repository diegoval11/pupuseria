 // Mobile menu toggle
 const menuBtn = document.getElementById('menu-btn');
 const mobileMenu = document.getElementById('mobile-menu');

 menuBtn.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
 });

 // Carousel functionality
 const carousel = document.querySelector('#main-carousel > div');
 const prevBtn = document.getElementById('prev-btn');
 const nextBtn = document.getElementById('next-btn');
 let currentSlide = 0;

 function showSlide(index) {
     carousel.style.transform = `translateX(-${index * 100}%)`;
 }

 prevBtn.addEventListener('click', () => {
     currentSlide = (currentSlide - 1 + 3) % 3;
     showSlide(currentSlide);
 });

 nextBtn.addEventListener('click', () => {
     currentSlide = (currentSlide + 1) % 3;
     showSlide(currentSlide);
 });

 // Auto-rotate carousel
 setInterval(() => {
     currentSlide = (currentSlide + 1) % 3;
     showSlide(currentSlide);
 }, 5000);

 // Intersection Observer for animations
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible-section');
         }
     });
 }, {
     threshold: 0.1
 });

 document.querySelectorAll('.hidden-section').forEach((section) => {
     observer.observe(section);
 });


 function initMap() {
     if (!window.google) return; // Guard clause if Google Maps isn't loaded yet

     const location = { 
         lat: 13.982278, 
         lng: -89.559167 
     };
     
     const mapElement = document.getElementById('map');
     if (!mapElement) return;

     const map = new google.maps.Map(mapElement, {
         zoom: 15,
         center: location,
         mapTypeControl: false,
         fullscreenControl: false,
         streetViewControl: false,
         styles: [
             {
                 "featureType": "poi",
                 "elementType": "labels",
                 "stylers": [{ "visibility": "off" }]
             }
         ]
     });

     new google.maps.Marker({
         position: location,
         map: map,
         title: 'El Buen Sabor'
     });
 }

 // In case the script loads after the DOM
 if (window.google && window.google.maps) {
     initMap();
 }