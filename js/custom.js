// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
});

// Scroll Reveal
$(document).ready(function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 60 }, 600, 'easeInOutExpo');
        }
    });
});
