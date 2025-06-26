// script.js - Interactive Spark Portfolio Enhancements

// Toggle between login and signup
function toggleForm(type) {
    const formTypeInput = document.getElementById('form_type');
    const submitBtn = document.getElementById('submit_btn');
    if (formTypeInput && submitBtn) {
      formTypeInput.value = type;
      submitBtn.innerText = type === 'login' ? 'Login' : 'Sign Up';
    }
  }
  
  // Fade in content on scroll
  const faders = document.querySelectorAll('.card');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(card => {
    appearOnScroll.observe(card);
  });
  
  // Theme Toggle (Optional dark/light mode)
  document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
      });
    }
  });

   

  function deleteStock(ticker) {
    if (!confirm(`Are you sure you want to delete ${ticker}?`)) return;
  
    fetch(`/delete_stock/${ticker}`, {
      method: 'POST'
    })
    .then(res => {
      if (res.ok) {
        document.querySelector(`[data-ticker="${ticker}"]`).remove();
      } else {
        alert("Error deleting stock.");
      }
    });
  }

  
  
  