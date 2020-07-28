import {postData} from "../services/requests";

const drop = () => {
    // dragstart *
    // dragenter - объект над  dropArea
    // dragover - объект зависает над  dropArea
    // dragleave - оюъект за пределами dropArea
    // drag *
    // drop - объект отрпавлен в dropArea
    // dragend *
    // dragexit *

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false)
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "transparent";
        } else if(item.closest('.hidden-xs')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false)
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false)
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;


            const formData = new FormData();
            formData.append('file', input.files[0]);
            console.log(formData.getAll('file'));

            let api;
            input.closest('.popup-design') || input.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData('assets/server.php', formData)
                .then(res => console.log(res))
                .catch((e) => console.log(e))
        });
    });

    // fileInputs.forEach(input => {
    //     if (input.closest('.calc_form')) {
    //         input.addEventListener('input', function() {
    //             console.log(input)
    //         });
    //     }
    // });
};

export default drop;