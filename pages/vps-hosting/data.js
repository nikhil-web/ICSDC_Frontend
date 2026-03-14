export const TESTIMONIALS = [
    { name: 'A. Miller', title: 'Lead DevOps Engineer', company: 'Tech Company', quote: 'The difference after moving our high-transaction database was immediate. Query speeds dropped by 40% thanks to the NVMe I/O. The performance is genuinely dedicated.', rating: 5 },
    { name: 'S. Chen', title: 'Software Architect', company: 'Software Company', quote: 'Finally, a VPS that truly respects root access. We needed a specific kernel module for our staging environment, and ICSDC let us install it in minutes. Complete freedom.', rating: 5 },
    { name: 'R. Singh', title: 'CTO', company: 'FinTech Startup', quote: 'We can\'t afford silent failures. The KVM isolation means our resources are always there, and the monitoring alerts are spot-on. Solid infrastructure, period.', rating: 5 },
    { name: 'E. Lopez', title: 'E-commerce Director', company: 'E-commerce Company', quote: 'We outgrew our old host overnight. With ICSDC, the one-click RAM and CPU scaling meant zero downtime during our peak traffic surge. Seamless growth is a reality here.', rating: 5 }
];

export const FAQ = [
    { question: 'Is my CPU/RAM truly dedicated, or is it burstable?', answer: 'Your resources are truly guaranteed and dedicated via ICSDC KVM virtualization. There is no resource over-selling, ensuring your assigned CPU, RAM, and storage IOPS are consistently available to your environment at all times.' },
    { question: 'Can I install a custom OS or kernel?', answer: 'Yes. You are given full root access, allowing you complete freedom to install any compatible Linux distribution or Windows OS version, and to compile or modify custom kernel modules as your application demands.' },
    { question: 'How fast is the VPS provisioning process?', answer: 'Provisioning is instant and automated. Once your order is processed, your VPS environment will be available and ready for SSH access within minutes, allowing you to deploy your applications immediately.' },
    { question: 'What is the process for scaling up resources?', answer: 'Scaling is on-demand and vertical. You can instantly add CPU cores, RAM, or storage via your central control panel with minimal to zero downtime, eliminating the need for complex server migration.' },
    { question: 'Do you offer management services?', answer: 'ICSDC provides unmanaged VPS hosting, giving you maximum control and cost efficiency. We manage the hardware and network, while you manage the OS, software, and application stack using your full root access. Managed plans are also available on request.' }
];

export const CONFIG = {
    gridId: 'vps-testi-grid',
    dotsId: 'vps-testi-dots',
    prevId: 'vps-testi-prev',
    nextId: 'vps-testi-next',
    faqId: 'vps-faq-accordions',
    faqPrefix: 'vps'
};

export const RIPPLE_SELECTOR = '.vps-cta-btn-primary';
