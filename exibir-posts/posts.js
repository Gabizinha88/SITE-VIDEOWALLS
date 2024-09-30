document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        console.log('Posts carregados:', posts); // Log para verificar os posts carregados
        if (posts.length === 0) {
            carousel.innerHTML = '<p>Nenhum Post Disponível.</p>';
            return;
        }

        posts.forEach((post, index) => {
            const slideContainer = document.createElement('div');
            slideContainer.classList.add('slide-container');
            if (index === 0) slideContainer.classList.add('active');

            const slide = document.createElement('div');
            slide.classList.add('slide');

            const content = document.createElement('div');
            content.classList.add('carousel-content');

            const title = document.createElement('h3');
            title.textContent = post.title;

            const image = document.createElement('div');
            image.classList.add('carousel-image');
            image.style.backgroundImage = `url(${post.image})`;

            const text = document.createElement('p');
            text.textContent = post.content;

            content.appendChild(title);
            content.appendChild(text);
            slide.appendChild(image);
            slide.appendChild(content);
            slideContainer.appendChild(slide);
            carousel.appendChild(slideContainer);
        });

        createIndicators(posts.length);
        console.log('Slides carregados:', document.querySelectorAll('.slide-container')); // Log para verificar os slides carregados
    }

    function createIndicators(count) {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.classList.add('indicators');

        for (let i = 0; i < count; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        }

        document.body.appendChild(indicatorsContainer);
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    setInterval(function(){
        location.reload();
      }, 80000); // 10000 milissegundos = 10 segundos
    

    function next() {
        const slides = document.querySelectorAll('.slide-container');
        console.log('Current Index:', currentIndex); // Log para verificar o índice atual
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
        updateIndicators();
        console.log('Next Index:', currentIndex); // Log para verificar o próximo índice
    }

    loadPosts();
    setInterval(next, 10000);
});
