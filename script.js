document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо всі посилання з навігаційного меню
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Обробник подій для кліку на кожне посилання
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Відміняємо стандартну поведінку посилання
            const page = this.getAttribute('data-page'); // Отримуємо сторінку для завантаження

            // Використовуємо fetch для завантаження вмісту сторінки
            fetch(page)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('content').innerHTML = data; // Вставляємо вміст сторінки у контейнер
                })
                .catch(error => console.error('Помилка завантаження сторінки:', error));
        });
    });
});
