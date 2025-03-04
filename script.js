document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  });
  // Add this to your existing script.js file

// Countdown timer functionality
function startCountdown() {
    // Set the initial time (22 hours, 27 minutes, 33 seconds)
    let hours = 22;
    let minutes = 27;
    let seconds = 33;
    
    const countdownElement = document.getElementById('countdown-timer');
    
    // Update the countdown every second
    const timer = setInterval(() => {
      seconds--;
  
      if (seconds < 0) {
        seconds = 59;
        minutes--;
  
        if (minutes < 0) {
          minutes = 59;
          hours--;
  
          if (hours < 0) {
            // Reset to 24 hours when countdown reaches zero
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        }
      }
  
      // Format the time as HH:MM:SS
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
  
      countdownElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
  }
  
  // Call the countdown function after DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (from previous code)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Start the countdown timer
    startCountdown();
  });

  // Success stories data
const successStories = [
    { 
      name: 'Siddharth', 
      company: 'ELECTRIC', 
      image: 'assets/s1.webp',
      logo: 'assets/l1.webp'
    },
    { 
      name: 'Vanshu Saini', 
      company: 'Paytm', 
      image: 'assets/s2.webp',
      logo: 'assets/l2.webp'
    },
    { 
      name: 'Miyanji Farhan', 
      company: 'Google', 
      image: 'assets/s3.webp',
      logo: 'assets/l3.webp'
    },
    { 
      name: 'Akshat Chhapolia', 
      company: 'INDmoney', 
      image: 'assets/s4.webp',
      logo: 'assets/l4.webp'
    },
    { 
      name: 'MANISH KUMAR', 
      company: 'Airtel', 
      image: 'assets/s5.webp',
      logo: 'assets/l5.webp' 
    },
    { 
      name: 'Tanya Shresth', 
      company: 'LogiLadder', 
      image: 'assets/s6.webp',
      logo: 'assets/l6.webp'
    },
    { 
      name: 'Roshni Khollamkar', 
      company: 'Perfios', 
      image: 'assets/s7.webp',
      logo: 'assets/l7.svg'
    }
  ];
  
  // Function to initialize the marquee
  function initSuccessStoriesMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    
    // Clear any existing content
    if (marqueeContent) {
      marqueeContent.innerHTML = '';
    }
    
    // Create story cards
    successStories.forEach(story => {
      const storyCard = document.createElement('div');
      storyCard.className = 'flex-shrink-0 w-64 mx-4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center';
      
      storyCard.innerHTML = `
        <div class="rounded-full overflow-hidden w-24 h-24 mb-4">
          <img src="${story.image}" alt="${story.name}" class="w-full h-full object-cover">
        </div>
        <h3 class="font-medium text-lg mb-2">${story.name}</h3>
        <div class="h-8 w-24 flex items-center justify-center">
          <img src="${story.logo}" alt="${story.company}" class="max-h-full max-w-full">
        </div>
      `;
      
      marqueeContent.appendChild(storyCard);
    });
    
    // Clone the items for seamless looping
    const items = marqueeContent.querySelectorAll('div');
    items.forEach(item => {
      const clone = item.cloneNode(true);
      marqueeContent.appendChild(clone);
    });
    
    // Calculate total width of all items (original + cloned)
    const totalWidth = Array.from(marqueeContent.children)
      .reduce((width, item) => width + item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight), 0);
    
    // Set the width of the content to fit all items
    marqueeContent.style.width = `${totalWidth / 2}px`;
    
    // Start the animation
    animateMarquee(marqueeContent, totalWidth / 2);
  }
  
  // Function to animate the marquee with a seamless infinite loop
  function animateMarquee(marqueeContent, contentWidth) {
    let position = 0;
    const speed = 1; // Pixels per frame (adjust for speed)
    
    function step() {
      position -= speed;
      
      // When we've scrolled the width of the original content, reset to start
      if (Math.abs(position) >= contentWidth) {
        position = 0;
      }
      
      marqueeContent.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);
  }
  
  // Add pause/resume on hover functionality
  function addHoverControls() {
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    let animation;
    let isPaused = false;
    let currentPosition = 0;
    
    marqueeWrapper.addEventListener('mouseenter', () => {
      isPaused = true;
      // Get current transform value
      const transform = window.getComputedStyle(marqueeContent).getPropertyValue('transform');
      const matrix = new DOMMatrix(transform);
      currentPosition = matrix.m41; // Get the X translation value
      
      // Cancel the animation
      if (animation) {
        cancelAnimationFrame(animation);
        animation = null;
      }
    });
    
    marqueeWrapper.addEventListener('mouseleave', () => {
      isPaused = false;
      
      // Restart animation from current position
      function resumeAnimation() {
        currentPosition -= 1; // Same speed as before
        
        const contentWidth = marqueeContent.offsetWidth / 2;
        if (Math.abs(currentPosition) >= contentWidth) {
          currentPosition = 0;
        }
        
        marqueeContent.style.transform = `translateX(${currentPosition}px)`;
        
        if (!isPaused) {
          animation = requestAnimationFrame(resumeAnimation);
        }
      }
      
      animation = requestAnimationFrame(resumeAnimation);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the success stories marquee
    initSuccessStoriesMarquee();
    
    // Add hover controls for pause/resume
    addHoverControls();
  });


// Curriculum data
const curriculumWeeks = [
    {
      number: 1,
      title: "Mapping Business Outcomes to Product Outcomes",
      topics: [
        "Systems thinking",
        "KPI trees",
        "Design thinking"
      ]
    },
    {
      number: 2,
      title: "Product Discovery & User Research",
      topics: [
        "Impact mapping",
        "User research",
        "Customer journey maps"
      ]
    },
    {
      number: 3,
      title: "Problem Framing, Ideation & Validation",
      topics: [
        "Problem framing canvas",
        "Mindmapping",
        "Hypothesis building"
      ]
    }
  ];
  
  // Additional weeks for full curriculum
  const additionalWeeks = [
    {
      number: 4,
      title: "Product Metrics & Prioritization",
      topics: [
        "North Star Framework",
        "ICE scoring model",
        "Opportunity sizing"
      ]
    },
    {
      number: 5,
      title: "Prototyping & User Testing",
      topics: [
        "Wireframing basics",
        "Usability testing",
        "A/B testing methodology"
      ]
    },
    {
      number: 6,
      title: "Product Development & Execution",
      topics: [
        "Agile development",
        "Sprint planning",
        "Stakeholder management"
      ]
    }
  ];

  // Function to render curriculum weeks
  let showFullCurriculum = false;

  // Function to render curriculum weeks
  function renderCurriculumWeeks() {
    const curriculumGrid = document.getElementById('curriculum-grid');
    curriculumGrid.innerHTML = ''; // Clear existing content
  
    // Determine which weeks to display
    const displayedWeeks = showFullCurriculum 
      ? [...curriculumWeeks, ...additionalWeeks]
      : curriculumWeeks;
  
    // Create and append week cards
    displayedWeeks.forEach((week) => {
      const weekCard = document.createElement('div');
      weekCard.className = 'bg-white text-black rounded-lg shadow-lg overflow-hidden relative';
  
      let topicsHTML = '';
      week.topics.forEach(topic => {
        topicsHTML += `
          <li class="flex items-start">
            <span class="text-green-700 mr-2">•</span>
            <span class="text-gray-700">${topic}</span>
          </li>
        `;
      });
  
      weekCard.innerHTML = `
        <div class="p-6">
          <div class="text-gray-600 mb-2">Week ${week.number}</div>
          <h3 class="text-xl font-bold mb-4">${week.title}</h3>
          
          <ul class="space-y-2 mb-6">
            ${topicsHTML}
          </ul>
        </div>
      `;
  
      curriculumGrid.appendChild(weekCard);
    });
  
    // Add "See Full Curriculum" button at the bottom when not showing full curriculum
    const seeFullBtnContainer = document.getElementById('see-full-curriculum-btn');
    if (!showFullCurriculum) {
      seeFullBtnContainer.innerHTML = `
        <button 
          id="see-full-curriculum"
          class="text-white font-medium flex items-center gap-1 bg-green-900 py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
        >
          See Full Curriculum
          <i class="fas fa-chevron-down"></i>
        </button>
      `;
      seeFullBtnContainer.classList.remove('hidden');
    } else {
      seeFullBtnContainer.classList.add('hidden'); // Hide the button when full curriculum is shown
    }
  
    // Add event listener to "See Full Curriculum" button
    const seeFullBtn = document.getElementById('see-full-curriculum');
    if (seeFullBtn) {
      seeFullBtn.addEventListener('click', () => {
        showFullCurriculum = true;
        renderCurriculumWeeks();
        document.getElementById('hide-curriculum-btn').classList.remove('hidden');
      });
    }
  }
  
  // Function to handle curriculum interactions
  function setupCurriculumInteractions() {
    // Initialize curriculum display
    renderCurriculumWeeks();
  
    // Add event listener to "Hide Full Curriculum" button
    const hideFullBtn = document.getElementById('hide-curriculum');
    hideFullBtn.addEventListener('click', () => {
      showFullCurriculum = false;
      renderCurriculumWeeks();
      document.getElementById('hide-curriculum-btn').classList.add('hidden');
    });
  }
  
  // Add to the existing DOMContentLoaded event handler
  document.addEventListener('DOMContentLoaded', function() {
    // Previous code for mobile menu, countdown, and marquee
  
    // Setup curriculum section
    setupCurriculumInteractions();
  });
  // Job title cycling
function setupJobTitleAnimation() {
    const jobTitles = [
      "Product Manager",
      "Associate Product Manager",
      "Product Analyst",
      "Product Owner",
      "Technical Product Manager"
    ];
    
    let currentTitleIndex = 0;
    const jobTitleElement = document.getElementById('job-title-text');
    
    // Function to change the job title with animation
    function changeJobTitle() {
      // Add the animation class
      jobTitleElement.classList.add('animate-slideUp');
      
      // After animation completes, change the title
      setTimeout(() => {
        currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
        jobTitleElement.textContent = jobTitles[currentTitleIndex];
        
        // Remove the animation class to reset for next time
        setTimeout(() => {
          jobTitleElement.classList.remove('animate-slideUp');
        }, 100);
      }, 600);
    }
    
    // Set interval to change job title every 3 seconds
    setInterval(changeJobTitle, 3000);
  }
  
  // Add to the existing DOMContentLoaded event handler
  document.addEventListener('DOMContentLoaded', function() {
    // Previous code for mobile menu, countdown, marquee, curriculum
    
    // Setup job title animation
    setupJobTitleAnimation();
  });

  // Build Skills Component - Profile Cards
function setupProfileCards() {
    // Sample profiles data
    const allProfiles = [
      { id: 1, name: "Preet Shah", img: "assets/s6.webp" },
      { id: 2, name: "Sarada Prasanna Sahoo", img: "assets/s5.webp" },
      { id: 3, name: "Bhavya Chadha", img: "assets/s7.webp" },
      { id: 4, name: "Basavraj S Awatiger", img: "assets/s1.webp" },
      { id: 5, name: "Rahul Verma", img: "assets/s4.webp" },
      { id: 6, name: "Neha Sharma", img: "assets/s3.webp" },
      { id: 7, name: "Siddharth Patel", img: "assets/s2.webp" },
      { id: 8, name: "Ananya Mishra", img: "assets/s6.webp" }
    ];
  
    let currentIndex = 0;
    let isAnimating = false;
    const profileCardsContainer = document.getElementById('profile-cards-container');
    const prevButton = document.getElementById('prev-profile-btn');
    const nextButton = document.getElementById('next-profile-btn');
  
    // Get visible profiles
    function getVisibleProfiles() {
      const visibleProfiles = [];
      for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % allProfiles.length;
        visibleProfiles.push(allProfiles[index]);
      }
      return visibleProfiles;
    }
  
    // Render profile cards
    function renderProfileCards() {
      profileCardsContainer.innerHTML = '';
      
      getVisibleProfiles().forEach(profile => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-full';
        
        card.innerHTML = `
          <div class="p-4 flex-1">
            <div class="w-20 h-20 bg-blue-100 rounded-full mb-4 overflow-hidden">
              <img
                src="${profile.img}"
                alt="${profile.name}"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-bold text-black">${profile.name}</h3>
          </div>
          <div class="border-t border-gray-200 flex justify-between items-center p-4 bg-gray-50">
            <span class="text-gray-800 font-medium">View Portfolio</span>
            <i class="fas fa-chevron-right text-gray-800"></i>
          </div>
        `;
        
        profileCardsContainer.appendChild(card);
      });
    }
  
    // Next profile handler
    function nextProfile() {
      if (isAnimating) return;
      isAnimating = true;
  
      // Set transition for slide effect
      profileCardsContainer.style.transition = 'transform 0.5s ease';
      profileCardsContainer.style.transform = 'translateX(-25%)';
  
      // After animation completes
      setTimeout(() => {
        profileCardsContainer.style.transition = 'none';
        profileCardsContainer.style.transform = 'translateX(0)';
        currentIndex = (currentIndex + 1) % allProfiles.length;
        renderProfileCards();
        isAnimating = false;
      }, 500);
    }
  
    // Previous profile handler
    function prevProfile() {
      if (isAnimating) return;
      isAnimating = true;
  
      // First prepare container position
      profileCardsContainer.style.transition = 'none';
      profileCardsContainer.style.transform = 'translateX(-25%)';
  
      // Force reflow
      profileCardsContainer.offsetHeight;
  
      // Then animate
      profileCardsContainer.style.transition = 'transform 0.5s ease';
      profileCardsContainer.style.transform = 'translateX(0)';
  
      // After animation completes
      setTimeout(() => {
        currentIndex = (currentIndex - 1 + allProfiles.length) % allProfiles.length;
        renderProfileCards();
        isAnimating = false;
      }, 500);
    }
  
    // Add event listeners to buttons
    nextButton.addEventListener('click', nextProfile);
    prevButton.addEventListener('click', prevProfile);
  
    // Initial render
    renderProfileCards();
  }
  
  // Add to the existing DOMContentLoaded event handler
  document.addEventListener('DOMContentLoaded', function() {
    // Previous code for mobile menu, countdown, marquee, curriculum, job title
    
    // Setup profile cards
    setupProfileCards();
  });

// FAQ Section
function setupFAQ() {
    const faqItems = [
      {
        question: "What is the NextLeap Product Manager Fellowship?",
        answer: "The NextLeap Product Manager Fellowship is an intensive program designed to help professionals transition into product management. It combines practical training with hands-on experience and mentorship."
      },
      {
        question: "Who is eligible to apply for the NextLeap Product Manager Fellowship?",
        answer: "Professionals with at least 1-2 years of work experience in any domain are eligible to apply. We welcome applicants from engineering, design, business, and other backgrounds."
      },
      {
        question: "Are there any costs associated with the NextLeap Product Manager Fellowship?",
        answer: "Yes, there is a program fee that covers all training materials, workshops, and mentorship sessions. We offer flexible payment options and early application discounts."
      },
      {
        question: "What if I miss a live session?",
        answer: "All live sessions are recorded and made available in our learning portal. You can watch them at your convenience, though we recommend attending live for interactive learning."
      },
      {
        question: "What are the benefits of being a Fellow in the NextLeap Product Manager Fellowship program?",
        answer: "Fellows gain industry-relevant skills, build a portfolio of product work, and join a network of product professionals. Our program also includes career support and job placement assistance."
      },
      {
        question: "I'm a pre-final year student. Am I eligible to apply?",
        answer: "Pre-final year students can apply for our specialized student track. This version of the fellowship is adapted to accommodate academic schedules and build foundational product skills."
      },
      {
        question: "What is the graduation project?",
        answer: "The graduation project is a comprehensive product case study that you'll develop throughout the program. It demonstrates your product thinking and serves as a portfolio piece for job applications."
      },
      {
        question: "Can I re-submit my graduation project?",
        answer: "Yes, you can revise and re-submit your graduation project once based on mentor feedback. This allows you to refine your work and strengthen your final portfolio piece."
      }
    ];
  
    const faqList = document.getElementById('faq-list');
    let openItem = null;
  
    // Function to toggle FAQ item
    function toggleFAQItem(index) {
      const allAnswers = document.querySelectorAll('.faq-answer');
      const allIcons = document.querySelectorAll('.faq-icon');
      
      // If clicking already open item, close it
      if (openItem === index) {
        allAnswers[index].classList.add('hidden');
        allIcons[index].classList.remove('fa-chevron-up');
        allIcons[index].classList.add('fa-chevron-down');
        openItem = null;
      } else {
        // Close any open item
        if (openItem !== null) {
          allAnswers[openItem].classList.add('hidden');
          allIcons[openItem].classList.remove('fa-chevron-up');
          allIcons[openItem].classList.add('fa-chevron-down');
        }
        
        // Open the clicked item
        allAnswers[index].classList.remove('hidden');
        allIcons[index].classList.remove('fa-chevron-down');
        allIcons[index].classList.add('fa-chevron-up');
        openItem = index;
      }
    }
  
    // Render FAQ items
    faqItems.forEach((item, index) => {
      const faqItem = document.createElement('li');
      faqItem.className = 'border-b border-green-800 pb-4';
      
      faqItem.innerHTML = `
        <button
          class="w-full flex justify-between items-center text-left text-white font-medium faq-button"
          data-index="${index}"
        >
          <span class="flex items-center">
            <span class="text-xs mr-3 flex items-center">■</span>
            <span>${item.question}</span>
          </span>
          <i class="fas fa-chevron-down flex-shrink-0 transition-transform duration-200 faq-icon"></i>
        </button>
        <div class="mt-2 text-white pl-6 hidden faq-answer">
          ${item.answer}
        </div>
      `;
      
      faqList.appendChild(faqItem);
    });
    
    // Add event listeners to all FAQ buttons
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        toggleFAQItem(index);
      });
    });
  }
  
  // Add to the existing DOMContentLoaded event handler
  document.addEventListener('DOMContentLoaded', function() {
    // Previous code for mobile menu, countdown, marquee, curriculum, job title, profile cards, bottom navbar
    
    // Setup FAQ section
    setupFAQ();
  });


  // Bottom Fixed Navbar
function setupBottomFixedNavbar() {
    const bottomNavbar = document.getElementById('bottom-fixed-navbar');
    const mobileNavbar = document.getElementById('mobile-navbar');
    const desktopNavbar = document.getElementById('desktop-navbar');
    
    // Function to check if we should show mobile or desktop version
    function checkScreenSize() {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        mobileNavbar.classList.remove('hidden');
        desktopNavbar.classList.add('hidden');
      } else {
        mobileNavbar.classList.add('hidden');
        desktopNavbar.classList.remove('hidden');
      }
    }
    
    // Function to check if navbar should be visible
    function checkVisibility() {
      const heroSection = document.getElementById('hero');
      
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        if (heroBottom <= 0) {
          bottomNavbar.style.transform = 'translateY(0)';
        } else {
          bottomNavbar.style.transform = 'translateY(100%)';
        }
      } else {
        if (window.scrollY > 400) {
          bottomNavbar.style.transform = 'translateY(0)';
        } else {
          bottomNavbar.style.transform = 'translateY(100%)';
        }
      }
    }
    
    // Add event listeners
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkScreenSize);
    
    // Initial checks
    checkScreenSize();
    checkVisibility();
  }
  
  // Add to the existing DOMContentLoaded event handler
  document.addEventListener('DOMContentLoaded', function() {
    // Previous code for mobile menu, countdown, marquee, curriculum, job title, profile cards
    
    // Setup bottom fixed navbar
    setupBottomFixedNavbar();
  });