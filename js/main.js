// Main JavaScript File
$(document).ready(function() {
  
  // Load Header and Footer
  loadComponents();
  
  // Set Active Nav Link
  setActiveNavLink();
  
  // Smooth Scroll
  smoothScroll();
  
  // Animations on Scroll
  initScrollAnimations();
  
  // Form Validation and AJAX
  initFormHandlers();
  
  // Social Icons Hover Effects
  initSocialIcons();
  
  // Button Hover Effects
  initButtonEffects();
  
});

// Load Header and Footer Components
function loadComponents() {
  // Load Header
  if ($('#header-placeholder').length) {
    $('#header-placeholder').load('components/header.html', function(response, status, xhr) {
      if (status === "error") {
        console.error("Error loading header:", xhr.status, xhr.statusText);
      } else {
        setActiveNavLink();
      }
    });
  }
  
  // Load Footer
  if ($('#footer-placeholder').length) {
    $('#footer-placeholder').load('components/footer.html', function(response, status, xhr) {
      if (status === "error") {
        console.error("Error loading footer:", xhr.status, xhr.statusText);
      } else {
        initSocialIcons();
      }
    });
  }
}

// Set Active Navigation Link
function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // Handle root/index case
  if (currentPage === '' || currentPage === '/' || currentPage === 'index.html') {
    currentPage = 'index.html';
  }
  
  $('.navbar-nav .nav-link').each(function() {
    var linkHref = $(this).attr('href');
    if (linkHref === currentPage || (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === '' || linkHref === '/'))) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
}

// Smooth Scroll
function smoothScroll() {
  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 1000);
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  var elements = $('.fade-in, .slide-up');
  
  function checkVisibility() {
    elements.each(function() {
      var element = $(this);
      var elementTop = element.offset().top;
      var elementBottom = elementTop + element.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        element.addClass('visible');
      }
    });
  }
  
  $(window).on('scroll resize', checkVisibility);
  checkVisibility();
}

// Form Validation and AJAX
function initFormHandlers() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    var submitBtn = form.find('button[type="submit"]');
    var originalText = submitBtn.text();
    
    // Basic Validation
    var isValid = true;
    form.find('input[required], textarea[required]').each(function() {
      if (!$(this).val().trim()) {
        isValid = false;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });
    
    if (!isValid) {
      showFormMessage(form, 'Please fill in all required fields.', 'error');
      return;
    }
    
    // Email Validation
    var email = form.find('input[type="email"]');
    if (email.length && !isValidEmail(email.val())) {
      showFormMessage(form, 'Please enter a valid email address.', 'error');
      return;
    }
    
    // Disable Submit Button
    submitBtn.prop('disabled', true).text('Sending...');
    
    // Simulate AJAX Request (Replace with actual endpoint)
    setTimeout(function() {
      showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
      form[0].reset();
      submitBtn.prop('disabled', false).text(originalText);
    }, 1500);
  });
  
  // Remove error class on input
  $('input, textarea').on('input', function() {
    $(this).removeClass('error');
  });
}

// Email Validation
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show Form Message
function showFormMessage(form, message, type) {
  var messageDiv = form.find('.form-message');
  if (messageDiv.length === 0) {
    messageDiv = $('<div class="form-message"></div>');
    form.append(messageDiv);
  }
  messageDiv.removeClass('success error').addClass(type).text(message).fadeIn();
  
  setTimeout(function() {
    messageDiv.fadeOut();
  }, 5000);
}

// Social Icons Hover Effects
function initSocialIcons() {
  $('.social-icon').hover(
    function() {
      $(this).css('transform', 'translateY(-3px) scale(1.1)');
    },
    function() {
      $(this).css('transform', 'translateY(0) scale(1)');
    }
  );
}

// Button Hover Effects
function initButtonEffects() {
  $('.btn-primary-custom, .btn-secondary-custom, .btn-app-store, .btn-google-play').hover(
    function() {
      $(this).css('transform', 'translateY(-3px) scale(1.05)');
    },
    function() {
      $(this).css('transform', 'translateY(0) scale(1)');
    }
  );
}

// Phone Number Formatting
function formatPhoneNumber(phone) {
  if (phone && !phone.startsWith('+')) {
    return '+' + phone;
  }
  return phone;
}

// Lazy Load Images
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img.lazy').forEach(function(img) {
      imageObserver.observe(img);
    });
  }
}

// Initialize Lazy Loading
$(document).ready(function() {
  initLazyLoading();
  initThemeToggle();
});

// Dark Mode Toggle
function initThemeToggle() {
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Theme toggle click handler (button should be in footer)
  $(document).on('click', '#themeToggle', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// Update theme icon
function updateThemeIcon(theme) {
  const icon = $('#themeIcon');
  if (icon.length) {
    if (theme === 'dark') {
      icon.removeClass('fa-moon').addClass('fa-sun');
    } else {
      icon.removeClass('fa-sun').addClass('fa-moon');
    }
  }
}

