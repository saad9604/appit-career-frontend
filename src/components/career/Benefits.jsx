"use client";
import React, { useRef, useEffect } from 'react';

const Benefits = () => {
  // Refs for animation
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Benefits data array
  const benefitsData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" fill="none" className="w-full h-full">
          <g>
            <rect y="0.5" width="40" height="40" rx="20" fill="white"/>
            <mask id="mask0_893_4536" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="11" y="11" width="18" height="19">
              <path d="M20 28.5C24.4184 28.5 28 24.9184 28 20.5C28 16.0816 24.4184 12.5 20 12.5C15.5816 12.5 12 16.0816 12 20.5C12 24.9184 15.5816 28.5 20 28.5Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M20.0029 15.7V20.504L23.3945 23.896" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </mask>
            <g mask="url(#mask0_893_4536)">
              <path d="M10.4004 10.8999H29.6004V30.0999H10.4004V10.8999Z" fill="black"/>
            </g>
          </g>
        </svg>
      ),
      title: "Flexible Work Culture",
      description: "Hybrid work models, flexible hours, and a focus on work-life balance to help you do your best work—on your terms."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 40" fill="none" className="w-full h-full">
          <g>
            <rect x="0.5" width="40" height="40" rx="20" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M20.05 10H19.9498C19.0833 10 18.3613 10 17.7888 10.0771C17.1835 10.1581 16.637 10.3373 16.1984 10.7759C15.7589 11.2154 15.5796 11.7619 15.4987 12.3663C15.4437 12.7778 15.4274 13.76 15.4235 14.6024C13.4746 14.667 12.3035 14.8945 11.491 15.708C10.3613 16.8366 10.3613 18.6545 10.3613 22.2892C10.3613 25.9239 10.3613 27.7417 11.491 28.8704C12.6206 29.999 14.4375 30 18.0722 30H21.9276C25.5623 30 27.3801 30 28.5088 28.8704C29.6375 27.7407 29.6384 25.9239 29.6384 22.2892C29.6384 18.6545 29.6384 16.8366 28.5088 15.708C27.6963 14.8945 26.5252 14.667 24.5763 14.6034C24.5724 13.76 24.557 12.7778 24.5011 12.3672C24.4201 11.7619 24.2408 11.2154 23.8013 10.7769C23.3628 10.3373 22.8163 10.1581 22.211 10.0771C21.6384 10 20.9155 10 20.05 10ZM23.1305 14.5802C23.1257 13.7639 23.1122 12.8858 23.0688 12.559C23.0081 12.1147 22.9049 11.9239 22.7796 11.7986C22.6543 11.6733 22.4635 11.5701 22.0182 11.5094C21.5536 11.4477 20.929 11.4458 19.9999 11.4458C19.0707 11.4458 18.4461 11.4477 17.9806 11.5104C17.5363 11.5701 17.3454 11.6733 17.2201 11.7995C17.0948 11.9258 16.9917 12.1147 16.931 12.559C16.8876 12.8867 16.8731 13.7639 16.8693 14.5802C17.2471 14.5783 17.6481 14.5777 18.0722 14.5783H21.9276C22.353 14.5783 22.7539 14.579 23.1305 14.5802ZM19.9999 17.7108C20.1916 17.7108 20.3755 17.787 20.511 17.9226C20.6466 18.0581 20.7228 18.242 20.7228 18.4337V18.4434C21.7724 18.7075 22.6505 19.5354 22.6505 20.6824C22.6505 20.8741 22.5743 21.058 22.4388 21.1936C22.3032 21.3291 22.1193 21.4053 21.9276 21.4053C21.7359 21.4053 21.552 21.3291 21.4164 21.1936C21.2809 21.058 21.2047 20.8741 21.2047 20.6824C21.2047 20.3123 20.7941 19.7995 19.9999 19.7995C19.2057 19.7995 18.7951 20.3123 18.7951 20.6824C18.7951 21.0525 19.2057 21.5663 19.9999 21.5663C21.3348 21.5663 22.6505 22.4916 22.6505 23.8959C22.6505 25.0429 21.7724 25.8699 20.7228 26.1349V26.1446C20.7228 26.3363 20.6466 26.5202 20.511 26.6557C20.3755 26.7913 20.1916 26.8675 19.9999 26.8675C19.8082 26.8675 19.6243 26.7913 19.4887 26.6557C19.3532 26.5202 19.277 26.3363 19.277 26.1446V26.1349C18.2274 25.8708 17.3493 25.0429 17.3493 23.8959C17.3493 23.7042 17.4254 23.5203 17.561 23.3847C17.6966 23.2492 17.8804 23.173 18.0722 23.173C18.2639 23.173 18.4478 23.2492 18.5833 23.3847C18.7189 23.5203 18.7951 23.7042 18.7951 23.8959C18.7951 24.266 19.2057 24.7788 19.9999 24.7788C20.7941 24.7788 21.2047 24.266 21.2047 23.8959C21.2047 23.5258 20.7941 23.012 19.9999 23.012C18.6649 23.012 17.3493 22.0867 17.3493 20.6824C17.3493 19.5354 18.2274 18.7075 19.277 18.4434V18.4337C19.277 18.242 19.3532 18.0581 19.4887 17.9226C19.6243 17.787 19.8082 17.7108 19.9999 17.7108Z" fill="black"/>
          </g>
        </svg>
      ),
      title: "Competitive Compensation",
      description: "Attractive salary packages with performance-based incentives and bonuses."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" fill="none" className="w-full h-full">
          <g>
            <rect y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M23.8867 11.4375C23.8867 11.1889 23.9854 10.9504 24.1613 10.7746C24.3371 10.5988 24.5755 10.5 24.8242 10.5H27.9492C28.1978 10.5 28.4363 10.5988 28.6121 10.7746C28.7879 10.9504 28.8867 11.1889 28.8867 11.4375V14.5625C28.8867 14.8111 28.7879 15.0496 28.6121 15.2254C28.4363 15.4012 28.1978 15.5 27.9492 15.5C27.7005 15.5 27.4621 15.4012 27.2863 15.2254C27.1104 15.0496 27.0117 14.8111 27.0117 14.5625V13.7L21.4242 19.2875C21.2484 19.4631 21.0101 19.5617 20.7617 19.5617C20.5132 19.5617 20.2749 19.4631 20.0992 19.2875L17.0117 16.2L11.7367 21.475C11.6508 21.5671 11.5473 21.641 11.4323 21.6922C11.3173 21.7435 11.1932 21.771 11.0673 21.7732C10.9414 21.7755 10.8164 21.7523 10.6997 21.7052C10.5829 21.658 10.4769 21.5878 10.3879 21.4988C10.2988 21.4098 10.2287 21.3037 10.1815 21.187C10.1344 21.0703 10.1112 20.9452 10.1134 20.8193C10.1156 20.6935 10.1432 20.5693 10.1944 20.4543C10.2457 20.3393 10.3196 20.2358 10.4117 20.15L16.3492 14.2125C16.5249 14.0369 16.7632 13.9383 17.0117 13.9383C17.2601 13.9383 17.4984 14.0369 17.6742 14.2125L20.7617 17.3L25.6867 12.375H24.8242C24.5755 12.375 24.3371 12.2762 24.1613 12.1004C23.9854 11.9246 23.8867 11.6861 23.8867 11.4375ZM11.0742 25.5C11.3228 25.5 11.5613 25.5988 11.7371 25.7746C11.9129 25.9504 12.0117 26.1889 12.0117 26.4375V29.5625C12.0117 29.8111 11.9129 30.0496 11.7371 30.2254C11.5613 30.4012 11.3228 30.5 11.0742 30.5C10.8255 30.5 10.5871 30.4012 10.4113 30.2254C10.2354 30.0496 10.1367 29.8111 10.1367 29.5625V26.4375C10.1367 26.1889 10.2354 25.9504 10.4113 25.7746C10.5871 25.5988 10.8255 25.5 11.0742 25.5ZM17.0117 22.6875C17.0117 22.4389 16.9129 22.2004 16.7371 22.0246C16.5613 21.8488 16.3228 21.75 16.0742 21.75C15.8255 21.75 15.5871 21.8488 15.4113 22.0246C15.2354 22.2004 15.1367 22.4389 15.1367 22.6875V29.5625C15.1367 29.8111 15.2354 30.0496 15.4113 30.2254C15.5871 30.4012 15.8255 30.5 16.0742 30.5C16.3228 30.5 16.5613 30.4012 16.7371 30.2254C16.9129 30.0496 17.0117 29.8111 17.0117 29.5625V22.6875ZM21.0742 24.25C21.3228 24.25 21.5613 24.3488 21.7371 24.5246C21.9129 24.7004 22.0117 24.9389 22.0117 25.1875V29.5625C22.0117 29.8111 21.9129 30.0496 21.7371 30.2254C21.5613 30.4012 21.3228 30.5 21.0742 30.5C20.8255 30.5 20.5871 30.4012 20.4113 30.2254C20.2354 30.0496 20.1367 29.8111 20.1367 29.5625V25.1875C20.1367 24.9389 20.2354 24.7004 20.4113 24.5246C20.5871 24.3488 20.8255 24.25 21.0742 24.25ZM27.0117 20.1875C27.0117 19.9389 26.9129 19.7004 26.7371 19.5246C26.5613 19.3488 26.3228 19.25 26.0742 19.25C25.8255 19.25 25.5871 19.3488 25.4113 19.5246C25.2354 19.7004 25.1367 19.9389 25.1367 20.1875V29.5625C25.1367 29.8111 25.2354 30.0496 25.4113 30.2254C25.5871 30.4012 25.8255 30.5 26.0742 30.5C26.3228 30.5 26.5613 30.4012 26.7371 30.2254C26.9129 30.0496 27.0117 29.8111 27.0117 29.5625V20.1875Z" fill="black"/>
          </g>
        </svg>
      ),
      title: "Growth Opportunities",
      description: "Clear career paths, leadership training, and chances to work on impactful, global projects."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" fill="none" className="w-full h-full">
          <g>
            <rect y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M19.5004 10.5C19.0629 10.5 18.6298 10.5862 18.2256 10.7536C17.8214 10.921 17.4542 11.1664 17.1448 11.4757C16.8355 11.7851 16.5901 12.1523 16.4227 12.5565C16.2553 12.9607 16.1691 13.3939 16.1691 13.8313C16.1691 14.2688 16.2553 14.702 16.4227 15.1062C16.5901 15.5103 16.8355 15.8776 17.1448 16.1869C17.4542 16.4963 17.8214 16.7417 18.2256 16.9091C18.6298 17.0765 19.0629 17.1627 19.5004 17.1627C20.3839 17.1627 21.2313 16.8117 21.856 16.1869C22.4808 15.5622 22.8318 14.7149 22.8318 13.8313C22.8318 12.9478 22.4808 12.1005 21.856 11.4757C21.2313 10.851 20.3839 10.5 19.5004 10.5ZM27.0034 12.164C26.3401 12.164 25.704 12.4275 25.2349 12.8965C24.7659 13.3656 24.5024 14.0017 24.5024 14.665C24.5024 15.3283 24.7659 15.9644 25.2349 16.4335C25.704 16.9025 26.3401 17.166 27.0034 17.166C27.6667 17.166 28.3029 16.9025 28.7719 16.4335C29.2409 15.9644 29.5044 15.3283 29.5044 14.665C29.5044 14.0017 29.2409 13.3656 28.7719 12.8965C28.3029 12.4275 27.6667 12.164 27.0034 12.164ZM11.9974 12.164C11.3341 12.164 10.698 12.4275 10.229 12.8965C9.75993 13.3656 9.49643 14.0017 9.49643 14.665C9.49643 15.3283 9.75993 15.9644 10.229 16.4335C10.698 16.9025 11.3341 17.166 11.9974 17.166C12.6607 17.166 13.2969 16.9025 13.7659 16.4335C14.2349 15.9644 14.4984 15.3283 14.4984 14.665C14.4984 14.0017 14.2349 13.3656 13.7659 12.8965C13.2969 12.4275 12.6607 12.164 11.9974 12.164ZM14.4984 20.489C14.5015 20.0488 14.6785 19.6277 14.9909 19.3175C15.3032 19.0074 15.7256 18.8333 16.1658 18.8333H22.8351C23.2773 18.8333 23.7014 19.009 24.0141 19.3217C24.3268 19.6344 24.5024 20.0585 24.5024 20.5007V25.5027C24.5029 26.0274 24.4207 26.549 24.259 27.0483C23.8898 28.1799 23.1293 29.1428 22.114 29.7642C21.0987 30.3855 19.8952 30.6246 18.7195 30.4384C17.5438 30.2522 16.473 29.653 15.6994 28.7484C14.9257 27.8438 14.4999 26.693 14.4984 25.5027V20.489ZM12.8311 20.5007C12.8311 19.8921 12.9928 19.3235 13.2779 18.8333H9.49643C9.05423 18.8333 8.63014 19.009 8.31745 19.3217C8.00477 19.6344 7.8291 20.0585 7.8291 20.5007V24.669C7.82887 25.3514 7.99621 26.0235 8.31642 26.6262C8.63662 27.2288 9.0999 27.7437 9.66557 28.1254C10.2312 28.5072 10.882 28.7443 11.5607 28.8158C12.2394 28.8873 12.9252 28.791 13.5581 28.5355C13.0792 27.5957 12.83 26.5558 12.8311 25.501V20.5007ZM26.1698 20.5007V25.5027C26.1698 26.5948 25.908 27.6252 25.4428 28.5355C26.0756 28.791 26.7615 28.8873 27.4402 28.8158C28.1189 28.7443 28.7696 28.5072 29.3353 28.1254C29.9009 27.7437 30.3642 27.2288 30.6844 26.6262C31.0046 26.0235 31.172 25.3514 31.1717 24.669V20.5007C31.1717 20.0585 30.9961 19.6344 30.6834 19.3217C30.3707 19.009 29.9466 18.8333 29.5044 18.8333H25.7229C26.0064 19.3235 26.1698 19.8921 26.1698 20.5007Z" fill="black"/>
          </g>
        </svg>
      ),
      title: "Team Building & Celebrations",
      description: "Regular team outings, festive events, and employee recognition programs to keep the culture vibrant and engaging."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" fill="none" className="w-full h-full">
          <g>
            <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M29.529 13.7702C28.9034 13.2347 28.1604 12.854 27.3603 12.659C26.5602 12.464 25.7254 12.4601 24.9235 12.6477C23.3114 13.0007 21.9024 13.9727 20.9999 15.3544C20.1023 13.9772 18.7016 13.0057 17.0972 12.6477C16.2989 12.4559 15.4672 12.4508 14.6666 12.6328C13.866 12.8147 13.1182 13.1788 12.4812 13.6968C10.8236 15.1445 9.91091 18.3548 10.9495 21.607C11.067 21.9665 11.2069 22.3162 11.3692 22.6561C11.4111 22.7351 11.4496 22.8155 11.4846 22.8974C14.1807 28.3947 20.4124 31.2902 20.6851 31.4265C20.7865 31.4756 20.8978 31.5008 21.0104 31.5C21.123 31.5008 21.2342 31.4756 21.3356 31.4265C21.5979 31.3111 27.8925 28.4366 30.5677 22.8764L30.6516 22.698C30.8173 22.3414 30.9607 21.9742 31.0817 21.5965C32.0679 18.4492 31.1656 15.239 29.529 13.7702ZM29.2038 22.0896C29.0569 22.419 28.8891 22.7372 28.7003 23.0443H25.2277C25.0549 23.0434 24.8851 22.9998 24.7331 22.9174C24.5812 22.8351 24.452 22.7165 24.357 22.5722L23.2554 20.9356L20.9159 25.6145C20.8421 25.7627 20.7341 25.8913 20.601 25.9897C20.4679 26.0882 20.3134 26.1538 20.1501 26.1811H19.9823C19.8434 26.1805 19.7061 26.1524 19.5783 26.0983C19.4504 26.0443 19.3346 25.9655 19.2374 25.8663L16.3943 23.0338H13.3415C13.1484 22.6939 12.9736 22.3442 12.8169 21.9847C12.6545 21.6469 12.5212 21.2959 12.4183 20.9356H16.835C16.973 20.9348 17.1099 20.9612 17.2377 21.0134C17.3655 21.0656 17.4818 21.1426 17.5798 21.2398L19.678 23.338L22.1749 18.3443C22.2578 18.179 22.3831 18.0385 22.5378 17.9372C22.6926 17.8358 22.8714 17.7772 23.0561 17.7673C23.2385 17.7563 23.4205 17.7931 23.5843 17.874C23.7481 17.955 23.8878 18.0773 23.9898 18.2289L25.7733 20.9146H29.6549C29.5402 21.3202 29.3899 21.7119 29.2038 22.0896Z" fill="black"/>
          </g>
        </svg>
      ),
      title: "Health & Wellness",
      description: "Comprehensive health insurance plans, wellness programs, and mental health support."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" fill="none" className="w-full h-full">
          <g>
            <rect y="0.5" width="40" height="40" rx="20" fill="white"/>
            <path d="M17.8104 15.029C18.249 13.7454 20.0225 13.7066 20.5426 14.9124L20.5866 15.0298L21.1785 16.7607C21.3142 17.1577 21.5334 17.521 21.8213 17.8261C22.1093 18.1311 22.4594 18.3709 22.8479 18.5292L23.0071 18.5886L24.7381 19.1797C26.0216 19.6184 26.0605 21.3919 24.8554 21.9119L24.7381 21.9559L23.0071 22.5479C22.6099 22.6834 22.2465 22.9026 21.9413 23.1906C21.6361 23.4786 21.3963 23.8287 21.2379 24.2172L21.1785 24.3757L20.5873 26.1074C20.1487 27.391 18.3752 27.4299 17.8559 26.2248L17.8104 26.1074L17.2192 24.3764C17.0836 23.9793 16.8645 23.6159 16.5765 23.3107C16.2885 23.0055 15.9384 22.7656 15.5498 22.6073L15.3914 22.5479L13.6604 21.9567C12.3761 21.5181 12.3372 19.7445 13.543 19.2252L13.6604 19.1797L15.3914 18.5886C15.7884 18.4529 16.1516 18.2337 16.4567 17.9457C16.7618 17.6577 17.0015 17.3077 17.1598 16.9192L17.2192 16.7607L17.8104 15.029ZM25.0666 12.5C25.2039 12.5 25.3383 12.5385 25.4548 12.6111C25.5712 12.6837 25.6649 12.7875 25.7253 12.9107L25.7605 12.9966L26.0172 13.7491L26.7705 14.0058C26.908 14.0525 27.0286 14.139 27.1169 14.2543C27.2052 14.3696 27.2573 14.5086 27.2665 14.6535C27.2758 14.7984 27.2418 14.9429 27.1689 15.0685C27.096 15.1941 26.9875 15.2952 26.8571 15.3591L26.7705 15.3943L26.018 15.651L25.7612 16.4043C25.7144 16.5418 25.6279 16.6622 25.5125 16.7505C25.3972 16.8387 25.2583 16.8907 25.1133 16.8999C24.9684 16.9091 24.824 16.8751 24.6984 16.8021C24.5729 16.7291 24.4718 16.6206 24.408 16.4901L24.3728 16.4043L24.1161 15.6517L23.3628 15.395C23.2253 15.3483 23.1047 15.2618 23.0164 15.1465C22.9281 15.0312 22.876 14.8923 22.8668 14.7473C22.8575 14.6024 22.8915 14.458 22.9644 14.3324C23.0372 14.2068 23.1458 14.1056 23.2762 14.0418L23.3628 14.0066L24.1153 13.7498L24.372 12.9966C24.4215 12.8516 24.5151 12.7258 24.6396 12.6368C24.7642 12.5477 24.9135 12.4999 25.0666 12.5Z" fill="black"/>
          </g>
        </svg>
      ),
      title: "Cutting-Edge Projects",
      description: "Be part of AI, cloud, and enterprise-grade software innovations that challenge and grow your expertise."
    }
  ];

  // Add smooth scroll animation that resets when section is scrolled in/out of view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize the cards ref array
    cardsRef.current = cardsRef.current.slice(0, benefitsData.length);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section enters viewport
          if (entry.isIntersecting) {
            // Animate heading
            if (headingRef.current) {
              // First set transition properties for smoother animation
              headingRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
              headingRef.current.style.opacity = '0';
              headingRef.current.style.transform = 'translateY(30px)';
              
              setTimeout(() => {
                if (headingRef.current) {
                  headingRef.current.style.opacity = '1';
                  headingRef.current.style.transform = 'translateY(0)';
                }
              }, 200);
            }
            
            // Animate description
            if (descriptionRef.current) {
              // First set transition properties for smoother animation
              descriptionRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
              descriptionRef.current.style.opacity = '0';
              descriptionRef.current.style.transform = 'translateY(30px)';
              
              setTimeout(() => {
                if (descriptionRef.current) {
                  descriptionRef.current.style.opacity = '1';
                  descriptionRef.current.style.transform = 'translateY(0)';
                }
              }, 500);
            }
            
            // Animate cards with staggered delay
            cardsRef.current.forEach((card, index) => {
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                  if (card) {
                    // First set transition properties for smoother animation
                    card.style.transition = 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                  }
                }, 1000 + index * 250); // Much longer staggered delay
              }
            });
          } else {
            // Reset animations when scrolled out of view
            if (headingRef.current) {
              // Reset with no transition for immediate effect
              headingRef.current.style.transition = 'none';
              headingRef.current.style.opacity = '0';
              headingRef.current.style.transform = 'translateY(30px)';
            }
            
            if (descriptionRef.current) {
              // Reset with no transition for immediate effect
              descriptionRef.current.style.transition = 'none';
              descriptionRef.current.style.opacity = '0';
              descriptionRef.current.style.transform = 'translateY(30px)';
            }
            
            cardsRef.current.forEach((card) => {
              if (card) {
                // Reset with no transition for immediate effect
                card.style.transition = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
              }
            });
          }
        });
      },
      { threshold: 0.05 } // Trigger when just 5% of the section is visible
    );
    
    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [benefitsData.length]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#F6F6F6] py-10 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Heading and description with animations */}
        <div className="flex flex-col items-center gap-1 xs:gap-2 sm:gap-4 w-full">
          <h2 
            ref={headingRef}
            className="text-[24px] xs:text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold leading-[120%] font-['Jost'] text-center transition-all duration-1500 ease-in-out"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <span className="text-[#EC1C26]">Benefits</span> at APPIT Software
          </h2>
          <p 
            ref={descriptionRef}
            className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[21px] font-normal leading-[120%] font-['Jost'] text-[#252525] text-center max-w-[280px] xs:max-w-[450px] sm:max-w-[650px] md:max-w-[930px] mx-auto transition-all duration-1500 ease-in-out"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            At APPIT, we believe great work begins with a great workplace. That's why we offer a range of benefits designed to support your personal well-being, professional growth, and overall success.
          </p>
        </div>

        {/* Benefits cards grid with animations */}
        <div className="w-full flex flex-wrap justify-center gap-y-2 xs:gap-y-3 sm:gap-y-4 gap-x-4 xs:gap-x-5 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="w-full xs:w-[95%] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-28px)] min-h-[140px] xs:min-h-[150px] sm:min-h-[160px] md:min-h-[177px] flex flex-col justify-center items-start gap-2 xs:gap-3 sm:gap-4 p-3 xs:p-4 sm:p-5 md:p-6 rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-[#003A70]"
              style={{ 
                background: 'linear-gradient(80deg, #00264D -12.08%, #005299 111.68%)',
                opacity: 0,
                transform: 'translateY(50px)'
              }}
            >
              <div className="flex items-center gap-3 xs:gap-4 md:gap-6 w-full pl-1 xs:pl-2 sm:pl-3">
                <div className="w-[28px] h-[28px] xs:w-[32px] xs:h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset] flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-white text-[17px] xs:text-[18px] sm:text-[19px] md:text-[21px] font-semibold leading-[120%] font-['Jost']">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-white text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] font-semibold leading-[120%] font-['Jost'] pl-1 xs:pl-2 sm:pl-3 pr-2 sm:pr-3 md:pr-6 w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] md:max-w-[329px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;