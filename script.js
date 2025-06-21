document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            id: 1,
            title: 'Introduction to Web Development',
            description: 'Build your first websites! Learn HTML for structure, CSS for styling, and JavaScript for interactivity. This course covers everything from basic syntax to responsive design.',
            duration: '12 Hours',
            level: 'Beginner',
            image: 'https://via.placeholder.com/300x180/007bff/ffffff?text=WebDev',
            fullDescription: 'A comprehensive introduction to modern web development...',
            videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL4-IKo4Z0Xm4a0Jv3FkRz3_T0G0L0_Y9t',
            modules: [
                'Module 1: HTML Fundamentals - Structuring Your Content (Tags, Attributes, Semantic HTML)',
                'Module 2: CSS Styling & Layouts - Making Your Pages Beautiful (Selectors, Box Model, Flexbox, Grid)',
                'Module 3: JavaScript Basics - Adding Interactivity (Variables, Data Types, Functions, DOM Manipulation)',
                'Module 4: Responsive Design Principles - Adapting to All Devices (Media Queries, Mobile-First Approach)',
                'Module 5: Project: Building a Personal Portfolio Website (Applying learned concepts)'
            ]
        },
        // ... other courses
    ];

    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }

    // 2. Dynamic Course Listing (Homepage)
    const courseListingDiv = document.querySelector('.course-grid');
    if (courseListingDiv) {
        let delay = 0;
        courses.forEach((course) => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.style.animationDelay = `${delay}s`;
            courseCard.style.animationFillMode = 'forwards';
            courseCard.style.animationName = 'slideInLeft';
            delay += 0.1;

            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title} Thumbnail">
                <div class="course-card-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span>${course.level}</span>
                        <span>${course.duration}</span>
                    </div>
                    <a href="course.html?id=${course.id}" class="btn-secondary">View Course</a>
                </div>
            `;
            courseListingDiv.appendChild(courseCard);
        });
    }

    // 3. Populate Course Details Page (course.html)
    const courseDetailSection = document.querySelector('.course-detail-section');
    if (courseDetailSection) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));

        const currentCourse = courses.find(course => course.id === courseId);

        if (currentCourse) {
            document.title = `EduLearn - ${currentCourse.title}`;

            courseDetailSection.innerHTML = `
                <div class="course-header">
                    <h1>${currentCourse.title}</h1>
                    <p>${currentCourse.fullDescription}</p>
                    <button class="btn-primary">Start Course</button>
                </div>

                <div class="video-container">
                    <iframe src="${currentCourse.videoUrl}" title="Course Video for ${currentCourse.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div class="course-description">
                    <h3>About This Course</h3>
                    <p>${currentCourse.fullDescription}</p>
                </div>

                <div class="course-modules">
                    <h3>Course Modules</h3>
                    <ul>
                        ${currentCourse.modules.map(module => `<li>${module} <span>❯</span></li>`).join('')}
                    </ul>
                </div>
            `;

            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) loadingMessage.style.display = 'none';
        } else {
            courseDetailSection.innerHTML = `<p style="text-align: center; font-size: 1.5em; color: #e74c3c;">Course not found! Please check the URL.</p>`;
        }
    }

    // 4. Populate Dashboard Page (dashboard.html)
    const enrolledCoursesDiv = document.querySelector('.enrolled-courses');
    if (enrolledCoursesDiv) {
        const enrolledCoursesData = [
            { id: 1, progress: 75, nextLesson: 'Module 4: Responsive Design Principles' },
            { id: 3, progress: 40, nextLesson: 'Module 4: Wireframing & Prototyping' },
            { id: 5, progress: 90, nextLesson: 'Module 6: Email Marketing & Analytics' }
        ];

        if (enrolledCoursesData.length === 0) {
            enrolledCoursesDiv.innerHTML = `<p style="text-align: center; font-size: 1.2em; color: #666;">You are not enrolled in any courses yet.</p>`;
            return;
        }

        const enrichedEnrolledCourses = enrolledCoursesData.map(enrolled => {
            const fullCourse = courses.find(course => course.id === enrolled.id);
            return fullCourse ? { ...fullCourse, ...enrolled } : null;
        }).filter(Boolean);

        enrichedEnrolledCourses.forEach(course => {
            const enrolledCard = document.createElement('div');
            enrolledCard.classList.add('enrolled-card');
            enrolledCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>Progress: ${course.progress}%</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${course.progress}%;"></div>
                </div>
                <p>Next Lesson: <strong>${course.nextLesson}</strong></p>
                <a href="course.html?id=${course.id}" class="btn-secondary">Continue Learning</a>
            `;
            enrolledCoursesDiv.appendChild(enrolledCard);
        });
    }

    // 5. Scroll-based Fade-in for sections
    const sections = document.querySelectorAll('section:not(.main-header):not(.main-footer)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        if (!section.classList.contains('hero-section') && !section.classList.contains('course-card')) {
            section.style.opacity = '0';
            observer.observe(section);
        }
    });
});
