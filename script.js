// script.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('folder2').addEventListener('dblclick', function(e){
        window.open('https://www.linkedin.com/in/lisandrojimenez', '_blank');

        e.preventDefault();
    });

    document.getElementById('folder4').addEventListener('dblclick',function(e){
        window.open('https://www.occord.org', '_blank');
        });

    const resumeFolder = document.getElementById('folder3');
        resumeFolder.addEventListener('dblclick', function(e){
            document.getElementById('resume-download').click();

            e.preventDefault();
        })

        const folders = document.querySelectorAll('.folder');
            //function to delete highlights
        const removeHighlight = () => {
            folders.forEach(folder => folder.classList.remove('highlighted'));
        };

        folders.forEach(folder => {
            folder.addEventListener('click', function(e){
                removeHighlight();
                //add highlight to clicked folder
                folder.classList.add('highlighted');
                //prevents clicks from being detected by doc listener
                e.stopPropagation();
            });
        });
        document.addEventListener('click', removeHighlight);
});

// Retrieve and apply saved positions from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.folder').forEach(folder => {
        const savedPosition = localStorage.getItem(folder.id);
        if (savedPosition) {
            const { left, top } = JSON.parse(savedPosition);
            folder.style.left = left;
            folder.style.top = top;
        }

        // Add event listeners for dragstart and dragend to each folder and its children
        folder.addEventListener('dragstart', dragStart);
        folder.addEventListener('dragend', dragEnd);

        folder.querySelectorAll('*').forEach(child => {
            child.addEventListener('dragstart', dragStart);
            child.addEventListener('dragend', dragEnd);
        });

        // Add click event listener to open modal
        folder.addEventListener('dblclick', openModal);
    });

    // Get the modal and close button
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // Function to open modal
    function openModal(e) {
        const folderId = e.target.closest('.folder').id;
        const modalBody = document.getElementById('modal-body');
        
        // Set content based on folder ID
        if (folderId === 'folder1') {
            modalBody.innerHTML = '<h2>About Me</h2><p>My name is Lisandro Jimenez and I am a Web Developer. My background comes from working in the fields and only ever working in blue collar jobs. I never really though about what I wanted to do and always assumed that since my family was doing okay working long hours in the fields breaking their backs then I would be okay with that too. Eventually I decided to continue to study since my parents wanted me to get a degree and make something of myself since they came here so I could have a better future than the one they had. I was really interested in technology but knew nothing about it and decided to try it out. I managed to learn backend languages and liked it. I wanted to see how websites were formed as well and decided to persue that as well. Front-end was all self thaught and managed to get into making websites and really enjoyed it. I hope I can keep evolving my skills so that I can build a better future where my parents sacrifices were not in vain.</p>';     
        }else if(folderId === 'folder5'){
            modalBody.innerHTML = '<h2>Information</h2><p>This project will involve private defenders. Building an interactive and responsive website. In progress and excited to finish it so I can post it in here with the rest!</p>'
        } else if (folderId !== 'folder1') {
            return;
        }
        
        modal.style.display = 'block';
    }
    

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Close modal when clicking the close button or outside the modal
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Function to handle dragstart event
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.closest('.folder').id);
    setTimeout(() => {
        e.target.closest('.folder').classList.add('hide');
    }, 0);
}

// Function to handle dragend event
function dragEnd(e) {
    e.target.closest('.folder').classList.remove('hide');
}

// Add event listeners for dragover and drop on the desktop container
document.querySelector('.desktop').addEventListener('dragover', dragOver);
document.querySelector('.desktop').addEventListener('drop', drop);

// Function to handle dragover event
function dragOver(e) {
    e.preventDefault();
}

// Function to handle drop event
function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    const desktopRect = document.querySelector('.desktop').getBoundingClientRect();
    const offsetX = e.clientX - desktopRect.left;
    const offsetY = e.clientY - desktopRect.top;
    draggable.style.left = `${offsetX}px`;
    draggable.style.top = `${offsetY}px`;

    // Store the position in local storage
    localStorage.setItem(id, JSON.stringify({ left: draggable.style.left, top: draggable.style.top }));
}
