/* eslint-disable */

const inline = 1;

function contentIsUpdating() {
    alert("Nội dung đang được cập nhật");
};

document.addEventListener('DOMContentLoaded', function () {

    // hide/show sub menu in menu item
    const menuItems = document.querySelectorAll('.menu_item');
    menuItems.forEach(menuItem => {
        let isHoveringSubMenuItem = false;
        let isHoveringTimeOuter = null;

        if (screen.availWidth >= 768) { // handle open on tablet and desktop
            menuItem.addEventListener('mouseover', () => {
                menuItem.querySelector('.sub_menu').classList.remove('hidden');
            });

            menuItem.addEventListener('mouseleave', () => {
                isHoveringTimeOuter = setTimeout(() => {
                    if (!isHoveringSubMenuItem) {
                        menuItem.querySelector('.sub_menu').classList.add('hidden');
                    }
                }, 150);
            });

            menuItem.querySelector('.sub_menu').addEventListener('mouseover', () => {
                clearTimeout(isHoveringTimeOuter);
                isHoveringSubMenuItem = true;
                menuItem.querySelector('.sub_menu').classList.remove('hidden');
            });

            menuItem.querySelector('.sub_menu').addEventListener('mouseout', () => {
                isHoveringSubMenuItem = false;
                menuItem.querySelector('.sub_menu').classList.add('hidden');
            });
        }
        else { // handle open on mobile
            menuItem.addEventListener('click', () => {
                menuItem.querySelector('.sub_menu').classList.toggle('hidden');
            });
        }
    });

    if (screen.availWidth < 768) {
        document.getElementById('close_header_menu').addEventListener('click', () => {
            document.getElementById('header_menu_background').classList.add('hidden');
            document.querySelector('.header_menu').classList.add('hidden');
        });

        document.getElementById('header_menu_background').addEventListener('click', () => {
            document.getElementById('header_menu_background').classList.add('hidden');
            document.querySelector('.header_menu').classList.add('hidden');
        });

        document.getElementById('open_header_menu').addEventListener('click', () => {
            document.getElementById('header_menu_background').classList.remove('hidden');
            document.querySelector('.header_menu').classList.remove('hidden');
        });
    }


    // script for show, hiden faq_item
    const faq_items = document.querySelectorAll('.faq_item');

    faq_items.forEach(e => {
        const faq_ans = e.querySelector('.faq_ans');
        const faq_show_ans = e.querySelector('.show_ans');
        const faq_hide_ans = e.querySelector('.hide_ans');

        faq_show_ans.addEventListener('click', () => {
            faq_ans.classList.remove('hidden');
            faq_show_ans.classList.add('hidden');
            faq_hide_ans.classList.remove('hidden');

            e.classList.add('bg-[#524FD5]');
            e.classList.add('text-white');

            console.log(e.classList);
        });

        faq_hide_ans.addEventListener('click', () => {
            faq_ans.classList.add('hidden');
            faq_show_ans.classList.remove('hidden');
            faq_hide_ans.classList.add('hidden');

            e.classList.remove('bg-[#524FD5]');
            e.classList.remove('text-white');
        });
    });

    // script form
    const leaveFormBtn = document.querySelector('#leaveInfoForm button');
    console.log(leaveFormBtn);
    leaveFormBtn.addEventListener('click', () => {

    });


    // Back to top button script
    // Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});
